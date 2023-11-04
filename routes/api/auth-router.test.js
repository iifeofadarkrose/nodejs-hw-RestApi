import mongoose from "mongoose";
import request from "supertest";
import app from "../../app.js";
import User from "../../models/User.js";

const { TEST_DB_HOST, PORT = 3000 } = process.env;

describe("test auth route", () => {
  let server = null;

  beforeAll(async () => {
    await mongoose.connect(TEST_DB_HOST);
    server = app.listen(PORT);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  test("signup with correct data", async () => {
    const signupData = {
      username: "Test",
      email: "test@test.com",
      password: "test123456",
    };

    const { statusCode, body } = await request(app).post("/api/auth/signup").send(signupData);
    expect(statusCode).toBe(201);
    expect(body.username).toBe(signupData.username);
    expect(body.email).toBe(signupData.email);

    const user = await User.findOne({ email: signupData.email });
    expect(user.username).toBe(signupData.username);
  });

  test("signin with correct data", async () => {
    const signupData = {
      username: "Test",
      email: "test@test.com",
      password: "test123456",
    };

    const signup = await request(app).post("/api/auth/signup").send(signupData);

    const signinData = { email: "test@test.com", password: "test123456" };

    const { statusCode, body } = await request(app) .post("/api/auth/signin").send(signinData);
    expect(statusCode).toBe(200);

    const user = await User.findOne({ email: signinData.email });
    expect(user.token).toBeDefined();
    expect(user.email).toBeDefined();
    expect(typeof user.email).toBe("string");
  });
});
