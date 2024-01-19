import * as request from "supertest";
import { pool } from "../../server";
import { UserFixture } from "../fixtures/user.fixture";
import app from "../../app";

describe("When calling auth endpoints", () => {
  const user = UserFixture.valid.billy;
  afterAll((done) => {
    // Closing the DB connection allows Jest to exit successfully.

    pool.end();
    done();
  });

  it("POST /signup should respond with 200 status code, user object and browser cookie - when given valid data ", (done) => {
    request
      .agent(app)
      .post("/api/v1/auth/signup")
      .send(user)
      .set("Accept", "application/json")
      .expect((res) => {
        res.body.id;
        res.body.username = user.username;
      })
      .expect(201, done);
  });

  it("POST /signup should throw validation error - when given invalid data ", (done) => {
    request
      .agent(app)
      .post("/api/v1/auth/signup")
      .send(UserFixture.error.incorrectEmail)
      .set("Accept", "application/json")
      .expect((res) => {
        res.body.status = "error";
        res.body.message;
      })
      .expect(400, done);
  });

  it("POST /login should respond with 200 status code, user object and browser cookie - when given valid data ", (done) => {
    request
      .agent(app)
      .post("/api/v1/auth/login")
      .send(user)
      .set("Accept", "application/json")
      .expect((res) => {
        res.body.id;
        res.body.username = user.username;
        res.header["Set-Cookie"];
      })
      .expect(200, done);
  });

  it("POST /logout should respond with 200 status code, empty object and browser cookie ", (done) => {
    request
      .agent(app)
      .post("/api/v1/auth/login")
      .send(user)
      .set("Accept", "application/json")
      .expect((res) => {
        res.body = {};
      })
      .expect(200, done);
  });

  it("GET /getUserInfo should respond with current user info", (done) => {
    request
      .agent(app)
      .post("/api/v1/auth/login")
      .send(user)
      .set("Accept", "application/json")
      .expect((res) => {
        res.body.id;
        res.body.username = user.username;
        res.body.email = user.email;
        res.body.ip;
      })
      .expect(200, done);
  });
});
