import { QueryResult } from "pg";
import { UserApiResponse } from "../../interfaces/user.interfaces";
import { User, UserProp } from "../models/user.model";

export class UserMapper {
  static toApiResponse(user: User): UserApiResponse;

  static toApiResponse(user: UserProp): UserApiResponse;

  static toApiResponse(user: any): any {
    return {
      id: user.id || user.getId(),
      email: user.email || user.getEmail(),
      username: user.username || user.getUsername(),
      ip: user.ip || user.getIp(),
    };
  }

  static toDomain(user: Partial<User>): User;

  static toDomain(user: QueryResult<User>): User;

  static toDomain(user: any): any {
    return new User({
      id: user.id || user.getId(),
      email: user.email || user.getEmail(),
      username: user.username || user.getUsername(),
      ip: user.ip || user.getIp(),
      password: user.password || user.getPassword(),
    });
  }
}
