import express from "express";
import {
  handleFilterPrompt,
  handleDirectPrompt,
} from "../handlers/ai.handlers";
import { authGuard } from "../middleware/auth-guard.middleware";

const router = express.Router();

router
  .post("/filtered-prompt", authGuard, handleFilterPrompt)
  .post("/prompt", authGuard, handleDirectPrompt);

export default router;
