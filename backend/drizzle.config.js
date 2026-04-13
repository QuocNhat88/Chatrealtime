import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  // Đường dẫn để Drizzle tìm các file schema (nó sẽ quét tự động)
  schema: "./src/modules/**/*.schema.js",
  out: "./drizzle", // Thư mục chứa lịch sử thay đổi DB (migrations)
  dialect: "postgresql", // Loại DB
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
