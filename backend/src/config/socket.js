import { Server } from "socket.io";

// Biến lưu trữ instance của socket
let io;

export const initSocket = (server) => {
  // Khởi tạo Socket.io gắn vào HTTP server
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", // Tạm thời fix cứng port mặc định của Vite (Frontend)
      methods: ["GET", "POST"],
    },
  });

  // Lắng nghe các sự kiện kết nối
  io.on("connection", (socket) => {
    console.log(`🟢 Một user vừa kết nối (Socket ID: ${socket.id})`);

    // Lắng nghe sự kiện ngắt kết nối
    socket.on("disconnect", () => {
      console.log(`🔴 User đã ngắt kết nối (Socket ID: ${socket.id})`);
    });
  });

  return io;
};

// Hàm này dùng để gọi io ở các file khác (ví dụ: message.controller.js)
export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io chưa được khởi tạo!");
  }
  return io;
};
