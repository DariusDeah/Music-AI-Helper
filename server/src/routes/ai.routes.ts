import express from "express";
import {
  handleFilterPrompt,
  handleDirectPrompt,
} from "../handlers/ai.handlers";

const router = express.Router();

router
  .post("/filtered-prompt", handleFilterPrompt)
  .post("/prompt", handleDirectPrompt);

export default router;
