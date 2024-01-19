import { UserProp } from "./auth/user";

declare global {
  namespace Express {
    interface Request {
      user?: UserProp;
    }
  }
}
