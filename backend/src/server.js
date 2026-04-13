import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http"; // Import module http của Node.js
import { checkDbConnection } from "./config/db.js";
import { initSocket } from "./config/socket.js";
import authRoutes from "./modules/auth/auth.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Cho phép Frontend gọi API
app.use(express.json()); // Parse body JSON

// Khởi tạo HTTP server từ Express app
const httpServer = createServer(app);

// Khởi tạo Socket.io với HTTP server
initSocket(httpServer);

// Gọi hàm test database
checkDbConnection();

// Một route cơ bản để test API
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("API của Chat App đang hoạt động ngon lành!");
});

// LƯU Ý: Dùng httpServer.listen thay vì app.listen nhé
httpServer.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});
