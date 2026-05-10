import { Router } from "express";
import { db } from "@workspace/db";
import { menuCategoriesTable, menuItemsTable } from "@workspace/db/schema";
import { eq, asc } from "drizzle-orm";

const router = Router();

router.get("/menu", async (req, res) => {
  try {
    const categories = await db
      .select()
      .from(menuCategoriesTable)
      .where(eq(menuCategoriesTable.isVisible, true))
      .orderBy(asc(menuCategoriesTable.sortOrder));

    const items = await db
      .select()
      .from(menuItemsTable)
      .where(eq(menuItemsTable.isAvailable, true))
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

export default router;
