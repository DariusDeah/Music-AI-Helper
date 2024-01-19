import { Pool } from "pg";
import { RepositoryBase } from "../../interfaces/repository-base.interface";
import { UserQueryFields } from "../../interfaces/user/user.interfaces";
import { AuthService } from "../../libs/auth.libs";
import { UserMapper } from "../mappers/user.maper";
import { User, UserProp } from "../models/user.model";

export class UserRepository
  implements RepositoryBase<User, UserProp, UserQueryFields>
{
  constructor(
    private readonly pool: Pool,
    private readonly mapper: UserMapper,
    private readonly authService: AuthService
  ) {}

  async insert(user: UserProp): Promise<User> {
    const query = `
    INSERT INTO users (id,email, password, username,ip) 
    VALUES ($1,$2,$3,$4,$5)
    RETURNING id,email,password,username,ip
    `;

    const client = await this.pool.connect();
    const createdUser = await client.query<User>(query, [
      user.id,
      user.email,
      this.authService.hashPassword(user.password),
      user.username,
      user.ip,
    ]);
    if (!createdUser) {
      throw new Error("can't create user");
    }

    return this.mapper.toDomain(createdUser.rows[0]);
  }

  async findAll(): Promise<User[]> {
    const client = await this.pool.connect();
    const users = await client.query("SELECT * FROM users");

    if (!users.rows.length) {
      throw new Error("user not found!");
    }

    return users.rows.map((user) => this.mapper.toDomain(user));
  }

  async findOneByQuery(queryFields: Partial<UserQueryFields>): Promise<User> {
    let query = "SELECT * FROM users WHERE ";
    Object.keys(queryFields).forEach((queryField: string) => {
      query += `${queryField} = '${
        queryFields[queryField as keyof UserQueryFields]
      }'`;
    });
    console.log(query);
    const client = await this.pool.connect();
    const user = await client.query(query);

    if (!user.rows.length) {
      throw new Error("user not found!");
    }
    return this.mapper.toDomain(user.rows[0]);
  }

  findByAllQuery(queryFields: Partial<UserQueryFields>): Promise<User[]> {
    throw new Error("Method not implemented.");
  }

  delete(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
