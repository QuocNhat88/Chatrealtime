import { pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";
import { users } from "../users/user.schema.js";
import { conversations } from "./conversation.schema.js";

export const participants = pgTable("participants", {
  id: uuid("id").defaultRandom().primaryKey(),
  conversationId: uuid("conversation_id")
    .references(() => conversations.id)
    .notNull(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  role: varchar("role", { length: 50 }).default("member").notNull(), // "admin" (trưởng nhóm) hoặc "member"
  joinedAt: timestamp("joined_at").defaultNow().notNull(),
});
