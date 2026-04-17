import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.route.js";
import userRoutes from "./modules/users/user.route.js";
import friendRoutes from "./modules/friends/friend.route.js";
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/friends", friendRoutes);
export default app;
