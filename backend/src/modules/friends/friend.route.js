import { Router } from "express";
import { sendFriendRequestController } from "./friend.controller.js";

const router = Router();

router.post("/request", sendFriendRequestController);

export default router;
