import * as friendService from "./friend.service.js";

export const sendFriendRequestController = async (req, res) => {
  try {
    const senderId = req.body.senderId; // Người bấm nút gửi
    const receiverId = req.body.receiverId; // Người nhận (Lấy từ danh sách tìm kiếm)

    if (!senderId || !receiverId) {
      return res.status(400).json({
        success: false,
        message: "Thiếu thông tin người gửi hoặc người nhận",
      });
    }

    if (senderId === receiverId) {
      return res.status(400).json({
        success: false,
        message: "Không thể tự kết bạn với chính mình",
      });
    }

    const request = await friendService.sendFriendRequest(senderId, receiverId);

    return res.status(201).json({
      success: true,
      message: "Gửi lời mời kết bạn thành công",
      data: request,
    });
  } catch (error) {
    console.error("❌ Lỗi ở sendFriendRequestController:", error);
    return res.status(500).json({
      success: false,
      // Hiển thị trực tiếp lỗi từ Service (như lỗi đã là bạn bè)
      message: error.message || "Lỗi server khi gửi lời mời",
    });
  }
};
