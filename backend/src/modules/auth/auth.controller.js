import * as authService from "./auth.service.js";

export const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Validate cơ bản
    if (!fullName || !email || !password) {
      return res.status(400).json({ error: "Vui lòng điền đủ thông tin!" });
    }

    const user = await authService.registerUser(fullName, email, password);
    res.status(201).json({ message: "Đăng ký thành công!", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Vui lòng nhập email và mật khẩu!" });
    }

    const data = await authService.loginUser(email, password);
    res.status(200).json({ message: "Đăng nhập thành công!", ...data });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
