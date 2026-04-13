import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import dotenv from "dotenv";

// Load biến môi trường từ file .env
dotenv.config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("❌ Chưa cấu hình DATABASE_URL trong file .env");
  process.exit(1);
}

// Khởi tạo client kết nối tới PostgreSQL của Supabase
const client = postgres(connectionString, { prepare: false });

// Tích hợp Drizzle ORM
export const db = drizzle(client);

// Hàm nhỏ để test kết nối
export const checkDbConnection = async () => {
  try {
    // Chạy một query đơn giản để check
    await client`SELECT 1`;
    console.log("✅ Kết nối Database (Supabase) thành công!");
  } catch (error) {
    console.error("❌ Kết nối Database thất bại:", error);
  }
};
