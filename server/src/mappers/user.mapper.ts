import { QueryResult } from "pg";
import { UserApiResponse } from "../../interfaces/user/user.interfaces";
import { User, UserProp } from "../models/user.model";

export class UserMapper {
  toApiResponse(user: User): UserApiResponse;

  toApiResponse(user: UserProp): UserApiResponse;

  toApiResponse(user: any): any {
    return {
      id: user.id || user.getId(),
      email: user.email || user.getEmail(),
      username: user.username || user.getUsername(),
      ip: user.ip || user.getIp(),
    };
  }

  toDomain(user: Partial<User>): User;

  toDomain(user: QueryResult<User>): User;

  toDomain(user: any): any {
    return new User({
      id: user.id || user.getId(),
      email: user.email || user.getEmail(),
      username: user.username || user.getUsername(),
      ip: user.ip || user.getIp(),
      password: user.password || user.getPassword(),
    });
  }
}
