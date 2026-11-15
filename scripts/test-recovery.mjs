import assert from "node:assert/strict";
import { spawn, execFile } from "node:child_process";
import { promisify } from "node:util";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { randomBytes, createHmac } from "node:crypto";
import { createServer } from "node:net";
import path from "node:path";

const run = promisify(execFile);
const root = path.resolve(import.meta.dirname, "..");
const tmp = await mkdtemp("/private/tmp/hochstapler-test-");
const cluster = path.join(tmp, "postgres");
const freePort = () => new Promise((resolve, reject) => {
  const server = createServer();
  server.on("error", reject);
  server.listen(0, "127.0.0.1", () => {
    const port = server.address().port;
    server.close(() => resolve(port));
  });
});
const dbPort = await freePort();
const appPort = await freePort();
const databaseUrl = `postgresql://recovery@127.0.0.1:${dbPort}/postgres`;
const base = `http://127.0.0.1:${appPort}`;
const env = {
  ...process.env, DATABASE_URL: databaseUrl, PORT: String(appPort),
  NODE_ENV: "production", HOST: "127.0.0.1", LOG_LEVEL: "silent",
  SESSION_SECRET: randomBytes(32).toString("hex"),
  ADMIN_PASSWORD: randomBytes(20).toString("hex"),
  UPLOAD_DIR: path.join(tmp, "uploads"),
  SMTP_HOST: "", SMTP_USER: "", SMTP_PASS: "", SMTP_FROM: "", CONTACT_TO: "",
};
let backend;
let pgStarted = false;
let backendLog = "";
const checkpoints = [];
function passed(label) { checkpoints.push(label); console.log("PASS " + label); }
const command = (name, args, options = {}) => run(name, args, { cwd: root, env, maxBuffer: 8 * 1024 * 1024, ...options });
async function startBackend() {
  backendLog = "";
  backend = spawn(process.execPath, ["artifacts/api-server/dist/index.mjs"], { cwd: root, env, stdio: ["ignore", "pipe", "pipe"] });
  backend.stdout.on("data", data => { backendLog += data; });
  backend.stderr.on("data", data => { backendLog += data; });
  for (let attempt = 0; attempt < 100; attempt++) {
    if (backend.exitCode !== null) throw new Error("Backend exited: " + backendLog);
    try { const response = await fetch(base + "/api/readyz"); if (response.ok) return; } catch {}
    await new Promise(resolve => setTimeout(resolve, 150));
  }
  throw new Error("Backend not ready: " + backendLog);
}
async function stopBackend() {
  if (backend && backend.exitCode === null) {
    const exited = new Promise(resolve => backend.once("exit", resolve));
    backend.kill("SIGTERM");
    await exited;
  }
}
let token;
const headers = () => ({ "Content-Type": "application/json", ...(token ? { Authorization: "Bearer " + token } : {}) });
async function api(url, method = "GET", body) {
  const response = await fetch(base + url, { method, headers: headers(), ...(body === undefined ? {} : { body: JSON.stringify(body) }) });
  const result = await response.json();
  return { response, result };
}
try {
  await command("initdb", ["-D", cluster, "-A", "trust", "-U", "recovery", "--no-locale", "-E", "UTF8"]);
  await command("pg_ctl", ["-D", cluster, "-l", path.join(tmp, "postgres.log"), "-o", `-h 127.0.0.1 -p ${dbPort} -k ${tmp}`, "-w", "start"]);
  pgStarted = true;
  await command("pnpm", ["run", "db:migrate"]);
  await command("pnpm", ["run", "db:seed"]);
  await command("pnpm", ["run", "db:migrate"]);
  await command("pnpm", ["run", "db:seed"]);
  await startBackend();
  let { response, result: menu } = await api("/api/menu");
  assert.equal(response.status, 200);
  assert.equal(menu.length, 14);
  assert.equal(menu.reduce((sum, cat) => sum + cat.items.length, 0), 135);
  passed("Migration und Seed zweimal: 14 Kategorien, 135 Einträge, keine Duplikate");
  for (const route of ["/", "/speisekarte", "/admin", "/admin/dashboard", "/reservierung", "/specials", "/menu"]) {
    const r = await fetch(base + route, { headers: { Accept: "text/html" } });
    assert.equal(r.status, 200);
    assert.match(await r.text(), /<div id="root"><\/div>/);
  }
  assert.equal((await fetch(base + "/logo.png")).status, 200);
  const missingApi = await fetch(base + "/api/missing");
  assert.equal(missingApi.status, 404);
  assert.match(missingApi.headers.get("content-type"), /json/);
  assert.equal((await fetch(base + "/assets/missing.js")).status, 404);
  passed("Website, direkte Unterseiten, lokales Logo und getrennte API-404");
  assert.equal((await api("/api/admin/menu")).response.status, 401);
  assert.equal((await api("/api/admin/login", "POST", { password: "wrong" })).response.status, 401);
  const login = await api("/api/admin/login", "POST", { password: env.ADMIN_PASSWORD });
  assert.equal(login.response.status, 200);
  token = login.result.token;
  assert.equal((await api("/api/admin/menu")).response.status, 200);
  const authToken = token;
  const head = Buffer.from(JSON.stringify({ alg: "HS256" })).toString("base64url");
  const payload = Buffer.from(JSON.stringify({ role: "visitor", exp: Math.floor(Date.now() / 1000) + 60 })).toString("base64url");
  const unsigned = head + "." + payload;
  token = unsigned + "." + createHmac("sha256", env.SESSION_SECRET).update(unsigned).digest("base64url");
  assert.equal((await api("/api/admin/menu")).response.status, 401);
  token = authToken;
  passed("Adminanmeldung, fehlendes Passwort und fremde Rolle geprüft");
  const category = await api("/api/admin/categories", "POST", { name: "Lokaler Test", slug: "recovery-test", type: "food", sortOrder: 100 });
  assert.equal(category.response.status, 200);
  const categoryId = category.result.id;
  const item = await api("/api/admin/items", "POST", { categoryId, name: "Testgericht", price: "1,00 EUR" });
  assert.equal(item.response.status, 200);
  const itemId = item.result.id;
  assert.equal((await api("/api/admin/items/" + itemId, "PUT", { price: "2,00 EUR" })).result.price, "2,00 EUR");
  await api("/api/admin/items/" + itemId, "PUT", { isAvailable: false });
  assert.equal((await api("/api/menu")).result.find(cat => cat.id === categoryId).items.length, 0);
  await api("/api/admin/categories/" + categoryId, "PUT", { isVisible: false });
  assert.equal((await api("/api/menu")).result.some(cat => cat.id === categoryId), false);
  await api("/api/admin/items/" + itemId, "DELETE");
  await api("/api/admin/categories/" + categoryId, "DELETE");
  const special = await api("/api/admin/specials", "POST", { title: "Lokales Testangebot", price: "3,00 EUR", type: "food" });
  assert.equal(special.response.status, 200);
  assert.equal((await api("/api/specials")).result.length, 1);
  await api("/api/admin/specials/" + special.result.id, "PUT", { isVisible: false });
  assert.equal((await api("/api/specials")).result.length, 0);
  await api("/api/admin/specials/" + special.result.id, "DELETE");
  passed("Gerichte, Kategorien und Specials: erstellen, ändern, ausblenden, löschen");
  const image = await readFile(path.join(root, "artifacts/hochstapler-burger/public/logo.png"));
  const metadata = { name: "logo.png", size: image.length, contentType: "image/png" };
  token = undefined;
  assert.equal((await api("/api/storage/uploads/request-url", "POST", metadata)).response.status, 401);
  token = authToken;
  assert.equal((await api("/api/storage/uploads/request-url", "POST", { ...metadata, contentType: "image/svg+xml" })).response.status, 400);
  assert.equal((await api("/api/storage/uploads/request-url", "POST", { ...metadata, size: 6 * 1024 * 1024 })).response.status, 400);
  const request = await api("/api/storage/uploads/request-url", "POST", metadata);
  assert.equal(request.response.status, 200);
  const upload = request.result;
  const uploadRequest = (body, authorization = token) => fetch(base + upload.uploadURL, { method: "PUT", headers: { Authorization: "Bearer " + authorization, "Content-Type": "image/png" }, body });
  assert.equal((await uploadRequest(image, "invalid")).status, 401);
  assert.equal((await uploadRequest(Buffer.from("not an image"))).status, 400);
  assert.equal((await uploadRequest(image)).status, 201);
  assert.equal((await uploadRequest(image)).status, 409);
  const imageUrl = "/api/storage" + upload.objectPath;
  assert.deepEqual(Buffer.from(await (await fetch(base + imageUrl)).arrayBuffer()), image);
  await stopBackend();
  await startBackend();
  assert.deepEqual(Buffer.from(await (await fetch(base + imageUrl)).arrayBuffer()), image);
  passed("Bildschutz, Größenlimit, Bildprüfung und Erhalt nach Neustart");
  assert.equal((await api("/api/contact", "POST", {})).response.status, 400);
  assert.equal((await api("/api/contact", "POST", { name: "Lokaler Test", email: "test@example.invalid", subject: "Test", message: "Nur ein lokaler Test." })).response.status, 503);
  passed("Kontaktformular: Eingabeprüfung und ehrlicher Fehler ohne Mailzugang; keine E-Mail gesendet");
  const dump = path.join(tmp, "recovery.dump");
  await command("pg_dump", ["-Fc", databaseUrl, "-f", dump]);
  await command("createdb", ["-h", "127.0.0.1", "-p", String(dbPort), "-U", "recovery", "restore_test"]);
  const restoreUrl = databaseUrl.replace(/\/postgres$/, "/restore_test");
  await command("pg_restore", ["--exit-on-error", "--dbname", restoreUrl, dump]);
  const restored = await command("psql", [restoreUrl, "-Atc", "SELECT (SELECT count(*) FROM menu_categories), (SELECT count(*) FROM menu_items);"]);
  assert.equal(restored.stdout.trim(), "14|135");
  passed("Datenbankexport und Rücksicherung in getrennte Testdatenbank");
  for (let i = 0; i < 10; i++) await api("/api/admin/login", "POST", { password: "wrong" });
  assert.equal((await api("/api/admin/login", "POST", { password: "wrong" })).response.status, 429);
  passed("Begrenzung wiederholter Anmeldeversuche");
  console.log(JSON.stringify({ checks: checkpoints.length, url: base, database: "isolated temporary cluster", emailSent: false }));
  if (process.argv.includes("--preview")) {
    console.log("PREVIEW_READY " + base);
    await new Promise(resolve => {
      process.once("SIGTERM", resolve);
      process.once("SIGINT", resolve);
    });
  }
} finally {
  await stopBackend();
  if (pgStarted) await command("pg_ctl", ["-D", cluster, "-m", "fast", "-w", "stop"]);
  await rm(tmp, { recursive: true, force: true });
}

