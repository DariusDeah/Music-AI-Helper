import * as request from "supertest";
import { pool } from "../../server";
import { UserFixture } from "../fixtures/user.fixture";
import app from "../../app";
import { UserRepository } from "../../src/repository/user.repository";
import { UserMapper } from "../../src/mappers/user.mapper";
import { AuthService } from "../../libs/auth.libs";
import { signJWT } from "../../libs/jwt.libs";
import { v4 as uuid } from "uuid";

describe("When calling chat endpoints", () => {
  const user = UserFixture.valid.billy;
  const userRepository = new UserRepository(
    pool,
    new UserMapper(),
    new AuthService()
  );

  afterAll((done) => {
    // Closing the DB connection allows Jest to exit successfully.
    pool.end();
    done();
  });

  it("GET /chats returns users chat history ", async () => {
    const createdUser = await userRepository.insert({
      ...user,
      id: uuid(),
      ip: ":fakeip",
    });
    const jwt = signJWT(createdUser);

    request
      .agent(app)
      .get("/chats")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${jwt}`)
      .expect((res) => {
        console.log(res);
        res.body;
      })
      .expect(200);
  });
});
