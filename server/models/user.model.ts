import { z } from "zod";

export interface UserProp {
  id: string;
  password: string;
  username: string;
  email: string;
  ip: string;
}

export class User {
  private readonly id: string;
  private password: string;
  private username: string;
  private email: string;
  private readonly ip: string;

  constructor(data: UserProp) {
    this.validate(data);
    this.id = data.id;
    this.email = data.email;
    this.username = data.username;
    this.password = data.password;
    this.ip = data.ip;
  }

  getId() {
    return this.id;
  }

  getPassword() {
    return this.password;
  }

  getEmail() {
    return this.email;
  }

  getIp() {
    return this.ip;
  }

  getUsername() {
    return this.username;
  }

  getProperties() {
    return {
      id: this.id,
      email: this.email,
      ip: this.ip,
      password: this.password,
      username: this.username,
    };
  }

  private validate(data: any) {
    const user = z.object({
      id: z.string(),
      password: z.string().min(8),
      username: z.string(),
      email: z.string().email(),
      ip: z.string().ip(),
    });
    return user.parse(data);
  }
}
