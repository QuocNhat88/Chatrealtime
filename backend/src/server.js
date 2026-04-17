import dotenv from "dotenv";
import { createServer } from "http";
import app from "./app.js";
import { checkDbConnection } from "./config/db.js";
import { initSocket } from "./config/socket.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const httpServer = createServer(app);

initSocket(httpServer);
checkDbConnection();

httpServer.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});
