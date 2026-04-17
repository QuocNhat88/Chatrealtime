import { db } from "../../config/db.js";
import { users } from "./user.schema.js";
import { ilike, or } from "drizzle-orm";

// Hàm tìm kiếm người dùng
export const searchUsers = async (keyword) => {
  // Thực hiện query tìm kiếm
  const searchResults = await db
    .select({
      id: users.id,
      fullName: users.fullName,
      email: users.email,
      avatarUrl: users.avatarUrl,
    })
    .from(users)
    .where(
      or(
        ilike(users.email, `%${keyword}%`),
        ilike(users.fullName, `%${keyword}%`),
      ),
    )
    .limit(10); // Chỉ lấy tối đa 10 kết quả để tránh nghẽn mạng

  return searchResults;
};
