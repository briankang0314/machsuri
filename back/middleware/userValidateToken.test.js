const request = require("supertest");
const express = require("express");

const app = express();

describe("User Validate Token Middleware", () => {
  let token;

  beforeAll(async () => {
    // Login a user and obtain a valid token for testing
    const response = await request(app).post("/users/register").send({
      email: "janedoe@example.com",
      password: "securePassword456",
      name: "Jane Doe",
      phoneNumber: "010123456789",
      cityId: 1,
    });
    console.log(response.status);
    console.log(response.body);
    token = response.body.token;
  });

  afterAll(async () => {
    // Clean up any test data if necessary
  });

  it("should return 400 if no token is provided", async () => {
    const response = await request(app).get("/users");

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("TOKEN_UNDEFINED");
  });

  it("should return 401 if an invalid token is provided", async () => {
    const response = await request(app)
      .get("/users")
      .set("Authorization", "Bearer invalid_token");

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("INVALID_TOKEN");
  });

  it("should return 404 if user is not found", async () => {
    // Modify the token to have an invalid user ID
    const invalidToken = token.replace(/\.\w+\./, ".invalid_user_id.");

    const response = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${invalidToken}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("USER_NOT_FOUND");
  });

  // Add more test cases for different scenarios
});
