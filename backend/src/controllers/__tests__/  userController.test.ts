import request from "supertest";
import User from "../../models/userModel";
import mongoose from "mongoose";
import { createExpressApp, establishMongoConnection } from "../../config";

const API_PREFIX = "/accounts";

const app = createExpressApp();

describe("User Controller", () => {
  beforeAll(async () => {
    await establishMongoConnection();
  });

  afterAll(async () => {
    // close database connection or any other cleanup operation
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  test("Should register a new user", async () => {
    await request(app)
      .post(`${API_PREFIX}/register`)
      .send({
        name: "Test User",
        email: "test@example.com",
        password: "myPassword",
        role: "user",
      })
      .expect(201);
  });
  test("Should login existing user", async () => {
    await request(app)
      .post(`${API_PREFIX}/login`)
      .send({
        email: "test@example.com",
        password: "myPassword",
      })
      .expect(200);
  });

  test("Should not login nonexistent user", async () => {
    await request(app)
      .post(`${API_PREFIX}/login`)
      .send({
        email: "nonexistent@example.com",
        password: "myPassword",
      })
      .expect(401);
  });
});
