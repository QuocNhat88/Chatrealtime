import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";

export const conversations = pgTable("conversations", {
  id: uuid("id").defaultRandom().primaryKey(),
  isGroup: boolean("is_group").default(false).notNull(), // true nếu là nhóm, false nếu là chat 1-1
  name: varchar("name", { length: 255 }), // Tên nhóm (có thể null nếu là chat 1-1)
  avatarUrl: varchar("avatar_url", { length: 500 }), // Ảnh đại diện nhóm
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
