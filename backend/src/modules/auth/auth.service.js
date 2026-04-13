import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";
import { db } from "../../config/db.js";
import { users } from "../users/user.schema.js";

// --- HÀM ĐĂNG KÝ ---
export const registerUser = async (fullName, email, password) => {
  // 1. Kiểm tra email đã tồn tại chưa
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email));
  if (existingUser.length > 0) {
    throw new Error("Email đã được sử dụng!");
  }

  // 2. Mã hóa mật khẩu
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // 3. Lưu vào Database
  const newUser = await db
    .insert(users)
    .values({
      fullName,
      email,
      password: hashedPassword,
    })
    .returning({ id: users.id, fullName: users.fullName, email: users.email }); // Chỉ trả về thông tin an toàn (không trả password)

  return newUser[0];
};

// --- HÀM ĐĂNG NHẬP ---
export const loginUser = async (email, password) => {
  // 1. Tìm user theo email
  const user = await db.select().from(users).where(eq(users.email, email));
  if (user.length === 0) {
    throw new Error("Email hoặc mật khẩu không đúng!");
  }

  // 2. So sánh mật khẩu
  const isMatch = await bcrypt.compare(password, user[0].password);
  if (!isMatch) {
    throw new Error("Email hoặc mật khẩu không đúng!");
  }

  // 3. Tạo JWT Token
  const token = jwt.sign(
    { id: user[0].id, email: user[0].email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }, // Token sống 7 ngày
  );

  return {
    user: {
      id: user[0].id,
      fullName: user[0].fullName,
      email: user[0].email,
      avatarUrl: user[0].avatarUrl,
    },
    token,
  };
};
