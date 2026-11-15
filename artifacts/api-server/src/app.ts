import express, { type Express } from "express";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";
import path from "node:path";
import { existsSync } from "node:fs";
import { pool } from "@workspace/db";

const app: Express = express();
app.disable("x-powered-by");
app.set("trust proxy", 1);
app.use((_req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  next();
});

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(express.json({ limit: "32kb" }));
app.use(express.urlencoded({ extended: false, limit: "32kb" }));

app.get("/api/readyz", async (_req, res) => {
  try {
    await pool.query("SELECT 1", []);
    res.json({ status: "ok" });
  } catch {
    res.status(503).json({ status: "unavailable" });
  }
});

app.use("/api", router);
app.use("/api", (_req, res) => { res.status(404).json({ error: "Not found" }); });

const staticDir = path.resolve(process.cwd(), "artifacts/hochstapler-burger/dist/public");
if (process.env.NODE_ENV === "production" && !existsSync(path.join(staticDir, "index.html"))) {
  throw new Error("Website build missing. Run pnpm run build:render before starting.");
}
if (existsSync(path.join(staticDir, "index.html"))) {
  app.use(express.static(staticDir, { dotfiles: "deny", index: false }));
  app.get("/{*page}", (req, res, next) => {
    if (path.extname(req.path) || !req.accepts("html")) return next();
    res.setHeader("Cache-Control", "no-cache");
    res.sendFile(path.join(staticDir, "index.html"));
  });
}

app.use((err: { status?: number }, req: express.Request, res: express.Response, _next: express.NextFunction) => {
  const status = err.status && err.status >= 400 && err.status < 600 ? err.status : 500;
  req.log.error({ status }, "Request failed");
  res.status(status).json({ error: status === 413 ? "Datei oder Anfrage ist zu groß." : "Anfrage konnte nicht verarbeitet werden." });
});

export default app;
