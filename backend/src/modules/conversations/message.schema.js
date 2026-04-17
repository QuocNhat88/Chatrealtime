import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "../users/user.schema.js";
import { conversations } from "./conversation.schema.js";

export const messages = pgTable("messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  conversationId: uuid("conversation_id")
    .references(() => conversations.id)
    .notNull(),
  senderId: uuid("sender_id")
    .references(() => users.id)
    .notNull(), // Ai là người gửi
  content: text("content").notNull(), // Nội dung tin nhắn
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
