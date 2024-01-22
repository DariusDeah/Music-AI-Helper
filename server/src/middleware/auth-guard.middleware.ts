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
    if (!req.headers.cookie && !req.headers.authorization) {
      throw new UnAuthenticatedError();
    }

    const authValue =
      cookie.parse(req.headers.cookie || "")["token"] ||
      req.headers.authorization!.split(" ")[1];

    const decoded = verifyJWT(authValue) as JwtPayload;
    console.log(decoded);
    req.user = {
      id: decoded.sub,
      email: decoded.data.email,
      username: decoded.data.username,
      ip: decoded.data.ip,
      password: decoded.data.password,
    } as UserProp;
    console.log(req.user);
    next();
  } catch (error) {
    console.log(error);
    ApiResponseFormatter.error(res, error as Error);
  }
}
