import { Router } from "express";
import { db } from "@workspace/db";
import { specialsTable } from "@workspace/db/schema";
import { eq, asc } from "drizzle-orm";
import { requireAdmin } from "../middlewares/adminAuth.js";

const router = Router();

router.get("/specials", async (req, res) => {
  try {
    const items = await db
      .select()
      .from(specialsTable)
      .where(eq(specialsTable.isVisible, true))
      .orderBy(asc(specialsTable.sortOrder));
    res.json(items);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to load specials" });
  }
});

router.get("/admin/specials", requireAdmin, async (req, res) => {
  try {
    const items = await db
      .select()
      .from(specialsTable)
      .orderBy(asc(specialsTable.sortOrder));
    res.json(items);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to load specials" });
  }
});

router.post("/admin/specials", requireAdmin, async (req, res) => {
  try {
    const body = req.body as typeof specialsTable.$inferInsert;
    const [item] = await db.insert(specialsTable).values(body).returning();
    res.json(item);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to create special" });
  }
});

router.put("/admin/specials/:id", requireAdmin, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const updates = req.body as Partial<typeof specialsTable.$inferInsert>;
    const [item] = await db
      .update(specialsTable)
      .set(updates)
      .where(eq(specialsTable.id, id))
      .returning();
    res.json(item);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to update special" });
  }
});

router.delete("/admin/specials/:id", requireAdmin, async (req, res) => {
  try {
    const id = Number(req.params.id);
    await db.delete(specialsTable).where(eq(specialsTable.id, id));
    res.json({ ok: true });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to delete special" });
  }
});

export default router;
