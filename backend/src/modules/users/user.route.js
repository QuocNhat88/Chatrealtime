import { Router } from "express";
import { searchUsersController } from "./user.controller.js";

const router = Router();

// Định nghĩa API: GET /api/users/search
router.get("/search", searchUsersController);

export default router;
