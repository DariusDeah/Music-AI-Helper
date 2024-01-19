/// <reference types="../../global" />
import { NextFunction, Request, Response } from "express";
import cookie from "cookie";
import { JwtPayload } from "jsonwebtoken";
import { verifyJWT } from "../../libs/jwt.libs";
import { UserProp } from "../models/user.model";
import { UnAuthenticatedError } from "../utils/errors.utils";
import { ApiResponseFormatter } from "../utils/api-response-formatter.utils";

export function authGuard(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.headers.cookie) {
      throw new UnAuthenticatedError();
    }
    const tokenCookie = cookie.parse(req.headers.cookie || "")["token"];

    const decoded = verifyJWT(tokenCookie) as JwtPayload;

    req.user = {
      id: decoded.sub,
      email: decoded.data.email,
      username: decoded.data.username,
      ip: decoded.data.ip,
      password: decoded.data.password,
    } as UserProp;

    next();
  } catch (error) {
    console.log(error);

    ApiResponseFormatter.error(res, error as Error);
  }
}
