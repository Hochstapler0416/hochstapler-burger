import { pgTable, text, serial, boolean, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const specialsTable = pgTable("specials", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  subtitle: text("subtitle").notNull().default(""),
  description: text("description").notNull().default(""),
  price: text("price").notNull().default(""),
  imageUrl: text("image_url").notNull().default(""),
  type: text("type").notNull().default("food"),
  isVisible: boolean("is_visible").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const insertSpecialSchema = createInsertSchema(specialsTable).omit({ id: true });

export type Special = typeof specialsTable.$inferSelect;
export type InsertSpecial = z.infer<typeof insertSpecialSchema>;
