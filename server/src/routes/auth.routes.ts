import express from "express";
import {
  getUserInfoHandler,
  loginHandler,
  logoutHandler,
  signupHandler,
} from "../handlers/auth.handlers";
import { authGuard } from "../middleware/auth-guard.middleware";

const router = express.Router();

router
  .post("/login", loginHandler)
  .post("/signup", signupHandler)
  .post("/logout", authGuard, logoutHandler)
  .get("/getUserInfo", authGuard, getUserInfoHandler);

export default router;
