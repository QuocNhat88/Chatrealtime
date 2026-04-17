import { db } from "../../config/db.js";
import { friends } from "./friend.schema.js";
import { eq, and, or } from "drizzle-orm";

export const sendFriendRequest = async (senderId, receiverId) => {
  // 1. Kiểm tra xem 2 người này đã có liên kết bạn bè nào chưa (đang chờ, hoặc đã là bạn)
  const existingRequest = await db
    .select()
    .from(friends)
    .where(
      or(
        and(eq(friends.senderId, senderId), eq(friends.receiverId, receiverId)),
        and(eq(friends.senderId, receiverId), eq(friends.receiverId, senderId)),
      ),
    );

  // Nếu đã tồn tại liên kết thì không cho gửi nữa
  if (existingRequest.length > 0) {
    throw new Error("Hai người đã là bạn bè hoặc đã gửi lời mời trước đó!");
  }

  // 2. Nếu chưa có, tạo một lời mời kết bạn mới (mặc định status là 'pending')
  const newRequest = await db
    .insert(friends)
    .values({
      senderId: senderId,
      receiverId: receiverId,
      status: "pending",
    })
    .returning(); // Yêu cầu trả về dữ liệu vừa thêm

  // Drizzle trả về mảng
  return newRequest[0];
};
