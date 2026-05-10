import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const menuCategoriesTable = pgTable("menu_categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  type: text("type").notNull().default("food"),
  sortOrder: integer("sort_order").notNull().default(0),
  isVisible: boolean("is_visible").notNull().default(true),
});

export const menuItemsTable = pgTable("menu_items", {
  id: serial("id").primaryKey(),
  categoryId: integer("category_id")
    .notNull()
    .references(() => menuCategoriesTable.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description").notNull().default(""),
  price: text("price").notNull().default(""),
  priceNote: text("price_note").notNull().default(""),
  badge: text("badge").notNull().default(""),
  isAvailable: boolean("is_available").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const insertMenuCategorySchema = createInsertSchema(menuCategoriesTable).omit({ id: true });
export const insertMenuItemSchema = createInsertSchema(menuItemsTable).omit({ id: true });

export type MenuCategory = typeof menuCategoriesTable.$inferSelect;
export type InsertMenuCategory = z.infer<typeof insertMenuCategorySchema>;
export type MenuItem = typeof menuItemsTable.$inferSelect;
export type InsertMenuItem = z.infer<typeof insertMenuItemSchema>;
