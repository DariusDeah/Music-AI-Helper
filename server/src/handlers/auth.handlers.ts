import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import { JwtPayload } from "jsonwebtoken";
import cookie from "cookie";
import { UserRepository } from "../repository/user.repository";
import { ApiResponseFormatter } from "../utils/api-response-formatter.utils";
import { UserMapper } from "../mappers/user.maper";
import { AuthService } from "../../libs/auth.libs";
import { signJWT, verifyJWT } from "../../libs/jwt.libs";
import { pool } from "../../server";
import { UserProp } from "../models/user.model";
import { InvalidCredsError } from "../utils/errors.utils";
import { LoginRequest } from "../../interfaces/user/user.interfaces";

const authService = new AuthService();
const userMapper = new UserMapper();

export async function loginHandler(req: Request, res: Response) {
  const userReq: LoginRequest = {
    email: req.body.email,
    password: req.body.password,
  };

  try {
    const foundUser = await new UserRepository(
      pool,
      new UserMapper(),
      new AuthService()
    ).findOneByQuery({
      email: userReq.email,
    });

    const match = await authService.isPasswordMatch(
      userReq.password,
      foundUser.getPassword()
    );

    if (!match) {
      throw new InvalidCredsError();
    }

    //convert user to api response object to whitelist fields
    const responseUser = userMapper.toApiResponse(foundUser);

    //create jwt
    const jwt = signJWT(responseUser);

    //set cookie
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", jwt, {
        httpOnly: true,
        maxAge: 60 * 60 * 24, // 1 hour
      })
    );

    //return user
    ApiResponseFormatter.success(res, responseUser);
  } catch (error) {
    console.log(error);
    ApiResponseFormatter.error(res, error as Error);
  }
}

export async function signupHandler(req: Request, res: Response) {
  const user: UserProp = {
    email: req.body.email,
    id: uuid(),
    ip: req.ip || "",
    password: req.body.password,
    username: req.body.username,
  };

  try {
    //save user
    const createdUser = await new UserRepository(
      pool,
      new UserMapper(),
      new AuthService()
    ).insert(user);

    //convert user to api response object to whitelist fields
    const responseUser = userMapper.toApiResponse(createdUser);

    //create jwt
    const jwt = signJWT(responseUser);

    //set cookie
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", jwt, {
        httpOnly: true,
        maxAge: 60 * 60 * 24, // 1 hour
      })
    );

    //return user
    ApiResponseFormatter.created(res, responseUser);
  } catch (error) {
    console.log(error);
    ApiResponseFormatter.error(res, error as Error);
  }
}

export async function logoutHandler(req: Request, res: Response) {
  try {
    res.setHeader("Set-Cookie", "token=");
    ApiResponseFormatter.success(res);
  } catch (error) {
    console.log(error);
    ApiResponseFormatter.error(res, error as Error);
  }
}

export async function getUserInfoHandler(req: Request, res: Response) {
  try {
    const tokenCookie = cookie.parse(req.headers.cookie || "")["token"];

    const decoded = verifyJWT(tokenCookie) as JwtPayload;

    const user = await new UserRepository(
      pool,
      new UserMapper(),
      new AuthService()
    ).findOneByQuery({ id: decoded.sub });

    ApiResponseFormatter.success(res, userMapper.toApiResponse(user));
  } catch (error) {
    console.log(error);
    ApiResponseFormatter.error(res, error as Error);
  }
}
