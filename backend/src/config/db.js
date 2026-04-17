import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("❌ Chưa cấu hình DATABASE_URL trong file .env");
  process.exit(1);
}

const client = postgres(connectionString, {
  prepare: false, // Bắt buộc cho Supabase connection pooler
  ssl: "require", // Bắt buộc mã hóa SSL khi kết nối tới nền tảng Cloud như Supabase
  max: 10, // Giới hạn pool size, tránh mở quá nhiều kết nối rác làm nghẽn Supabase
  idle_timeout: 20, // Đóng kết nối nếu rảnh rỗi quá 20s (tránh bị Supabase reset đột ngột)
});

export const db = drizzle(client);

export const checkDbConnection = async () => {
  try {
    await client`SELECT 1`;
    console.log("✅ Kết nối Database (Supabase) thành công!");
  } catch (error) {
    console.error("❌ Kết nối Database thất bại:", error);
  }
};
