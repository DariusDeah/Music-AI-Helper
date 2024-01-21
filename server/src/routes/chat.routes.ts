import express from "express";
import { getUserChats } from "../handlers/chat.handlers";
import { authGuard } from "../middleware/auth-guard.middleware";

const router = express.Router();

router.get("", authGuard, getUserChats);

export default router;
