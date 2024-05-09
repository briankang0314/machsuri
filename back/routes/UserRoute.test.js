const request = require("supertest");
const express = require("express");

const app = express();

describe("User Routes", () => {
  let token;

  beforeAll(async () => {
    // Login a user and obtain a valid token for testing protected routes
    const response = await request(app)
      .post("/users/login")
      .send({ email: "test@example.com", password: "password" });
    token = response.body.token;
  });

  afterAll(async () => {
    // Clean up any test data if necessary
  });

  describe("GET /users", () => {
    it("should return all users", async () => {
      const response = await request(app)
        .get("/users")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });

    it("should return 401 if no token is provided", async () => {
      const response = await request(app).get("/users");

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("TOKEN_UNDEFINED");
    });

    // Add more test cases for different scenarios
  });

  describe("GET /users/profile/:userId", () => {
    it("should return the user profile", async () => {
      const userId = 1;
      const response = await request(app)
        .get(`/users/profile/${userId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(userId);
    });

    it("should return 404 if user is not found", async () => {
      const userId = 999;
      const response = await request(app)
        .get(`/users/profile/${userId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("USER_NOT_FOUND");
    });

    // Add more test cases for different scenarios
  });

  // Add tests for other routes
});
