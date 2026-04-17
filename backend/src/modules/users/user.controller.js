import * as userService from "./user.service.js";

export const searchUsersController = async (req, res) => {
  try {
    // 1. Lấy từ khóa tìm kiếm từ Frontend gửi lên
    const keyword = req.query.keyword;

    // Nếu không có từ khóa, trả về mảng rỗng luôn cho nhẹ server
    if (!keyword || keyword.trim() === "") {
      return res.status(200).json({
        success: true,
        data: [],
      });
    }

    // 2. Gọi "Đầu bếp" (Service) để lấy dữ liệu
    const users = await userService.searchUsers(keyword.trim());

    // 3. Trả kết quả về cho Frontend
    return res.status(200).json({
      success: true,
      message: "Tìm kiếm thành công",
      data: users,
    });
  } catch (error) {
    console.error("❌ Lỗi ở searchUsersController:", error);
    return res.status(500).json({
      success: false,
      message: "Lỗi server khi tìm kiếm người dùng",
    });
  }
};
