import { pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";
import { users } from "../users/user.schema.js";

export const friends = pgTable("friends", {
  id: uuid("id").defaultRandom().primaryKey(),
  senderId: uuid("sender_id")
    .references(() => users.id)
    .notNull(), // Người gửi lời mời
  receiverId: uuid("receiver_id")
    .references(() => users.id)
    .notNull(), // Người nhận
  status: varchar("status", { length: 20 }).default("pending").notNull(), // Trạng thái: pending, accepted, blocked
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
