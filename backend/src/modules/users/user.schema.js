import { pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";

// Khai báo bảng 'users'
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(), // Sẽ lưu chuỗi password đã mã hóa (hash)
  fullName: varchar("full_name", { length: 255 }).notNull(),
  avatarUrl: varchar("avatar_url", { length: 500 }), // Link ảnh đại diện (có thể trống)
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
