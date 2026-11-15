import { Router } from "express";
import { db } from "@workspace/db";
import { menuCategoriesTable, menuItemsTable } from "@workspace/db/schema";
import { eq, asc } from "drizzle-orm";
import { SignJWT } from "jose";
import { createHash, timingSafeEqual } from "node:crypto";
import { adminSecret } from "../lib/adminSecret.js";
import { rateLimit } from "../middlewares/rateLimit.js";
import { requireAdmin } from "../middlewares/adminAuth.js";

const router = Router();
const secret = adminSecret;

/* ── Auth ─────────────────────────────────────────────── */

router.post("/admin/login", rateLimit(10, 15 * 60 * 1000), async (req, res) => {
  const password = req.body?.password;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    res.status(503).json({ error: "ADMIN_PASSWORD not configured" });
    return;
  }
  if (typeof password !== "string" || password.length > 256 ||
      !timingSafeEqual(createHash("sha256").update(password).digest(), createHash("sha256").update(adminPassword).digest())) {
    res.status(401).json({ error: "Falsches Passwort" });
    return;
  }

  const token = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);

  res.json({ token });
});

/* ── All menu (admin view, includes hidden) ───────────── */

router.get("/admin/menu", requireAdmin, async (req, res) => {
  try {
    const categories = await db
      .select()
      .from(menuCategoriesTable)
      .orderBy(asc(menuCategoriesTable.sortOrder));

    const items = await db
      .select()
      .from(menuItemsTable)
      .orderBy(asc(menuItemsTable.sortOrder));

    const result = categories.map((cat) => ({
      ...cat,
      items: items.filter((item) => item.categoryId === cat.id),
    }));

    res.json(result);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to load menu" });
  }
});

/* ── Categories ───────────────────────────────────────── */

router.post("/admin/categories", requireAdmin, async (req, res) => {
  try {
    const { name, slug, type, sortOrder } = req.body as {
      name: string; slug: string; type: string; sortOrder?: number;
    };
    const [cat] = await db
      .insert(menuCategoriesTable)
      .values({ name, slug, type: type ?? "food", sortOrder: sortOrder ?? 0 })
      .returning();
    res.json(cat);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to create category" });
  }
});

router.put("/admin/categories/:id", requireAdmin, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const updates = req.body as Partial<typeof menuCategoriesTable.$inferInsert>;
    const [cat] = await db
      .update(menuCategoriesTable)
      .set(updates)
      .where(eq(menuCategoriesTable.id, id))
      .returning();
    res.json(cat);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to update category" });
  }
});

router.delete("/admin/categories/:id", requireAdmin, async (req, res) => {
  try {
    const id = Number(req.params.id);
    await db.delete(menuCategoriesTable).where(eq(menuCategoriesTable.id, id));
    res.json({ ok: true });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to delete category" });
  }
});

/* ── Items ────────────────────────────────────────────── */

router.post("/admin/items", requireAdmin, async (req, res) => {
  try {
    const body = req.body as typeof menuItemsTable.$inferInsert;
    const [item] = await db.insert(menuItemsTable).values(body).returning();
    res.json(item);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to create item" });
  }
});

router.put("/admin/items/:id", requireAdmin, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const updates = req.body as Partial<typeof menuItemsTable.$inferInsert>;
    const [item] = await db
      .update(menuItemsTable)
      .set(updates)
      .where(eq(menuItemsTable.id, id))
      .returning();
    res.json(item);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to update item" });
  }
});

router.delete("/admin/items/:id", requireAdmin, async (req, res) => {
  try {
    const id = Number(req.params.id);
    await db.delete(menuItemsTable).where(eq(menuItemsTable.id, id));
    res.json({ ok: true });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to delete item" });
  }
});

export default router;
