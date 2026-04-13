import express from "express";
import { register, login } from "./auth.controller.js";

const router = express.Router();

// Định nghĩa các API endpoints
router.post("/register", register);
router.post("/login", login);

export default router;
