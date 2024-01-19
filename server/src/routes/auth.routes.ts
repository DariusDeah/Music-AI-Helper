import express from "express";
import {
  getUserInfoHandler,
  loginHandler,
  logoutHandler,
  signupHandler,
} from "../handlers/auth.handlers";

const router = express.Router();

router
  .post("/login", loginHandler)
  .post("/signup", signupHandler)
  .post("/logout", logoutHandler)
  .get("/getUserInfo", getUserInfoHandler);

export default router;
