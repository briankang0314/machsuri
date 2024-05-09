const UserController = require("../controllers/UserController");
const UserService = require("../services/UserService");

jest.mock("../services/UserService");

describe("UserController", () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      body: {},
      params: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("register", () => {
    it("should register a user and return the user object", async () => {
      const userData = {
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
        phoneNumber: "1234567890",
        cityId: 1,
      };
      const newUser = { id: 1, ...userData };

      req.body = userData;
      UserService.registerUser.mockResolvedValue(newUser);

      await UserController.register(req, res);

      expect(UserService.registerUser).toHaveBeenCalledWith(
        userData.name,
        userData.email,
        userData.password,
        userData.phoneNumber,
        userData.cityId
      );
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(newUser);
    });

    it("should handle errors and return an error response", async () => {
      const error = new Error("Registration failed");
      error.statusCode = 400;

      req.body = {
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
        phoneNumber: "1234567890",
        cityId: 1,
      };
      UserService.registerUser.mockRejectedValue(error);

      await UserController.register(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Registration failed" });
    });
  });

  describe("login", () => {
    it("should authenticate a user and return the user object and token", async () => {
      const loginData = {
        email: "john@example.com",
        password: "password123",
      };
      const user = { id: 1, name: "John Doe", email: loginData.email };
      const token = "generated-token";

      req.body = loginData;
      UserService.authenticateUser.mockResolvedValue({ user, token });

      await UserController.login(req, res);

      expect(UserService.authenticateUser).toHaveBeenCalledWith(
        loginData.email,
        loginData.password
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ user, token });
    });

    it("should handle authentication errors and return an error response", async () => {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;

      req.body = {
        email: "john@example.com",
        password: "wrongpassword",
      };
      UserService.authenticateUser.mockRejectedValue(error);

      await UserController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: "Invalid credentials" });
    });
  });

  describe("getAllUsers", () => {
    it("should retrieve all users and return them", async () => {
      const users = [
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Smith" },
      ];

      UserService.getAllUsers.mockResolvedValue(users);

      await UserController.getAllUsers(req, res);

      expect(UserService.getAllUsers).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(users);
    });

    it("should handle errors and return an error response", async () => {
      const error = new Error("Failed to fetch users");
      error.statusCode = 500;

      UserService.getAllUsers.mockRejectedValue(error);

      await UserController.getAllUsers(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Failed to fetch users",
      });
    });
  });

  describe("getProfile", () => {
    it("should retrieve a user profile and return it", async () => {
      const userId = 1;
      const user = { id: userId, name: "John Doe" };

      req.params.userId = userId;
      UserService.getUserProfile.mockResolvedValue(user);

      await UserController.getProfile(req, res);

      expect(UserService.getUserProfile).toHaveBeenCalledWith(userId);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(user);
    });

    it("should handle user not found and return a 404 error", async () => {
      const userId = 1;

      req.params.userId = userId;
      UserService.getUserProfile.mockResolvedValue(null);

      await UserController.getProfile(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
    });

    it("should handle errors and return an error response", async () => {
      const error = new Error("Failed to fetch profile");
      error.statusCode = 500;

      req.params.userId = 1;
      UserService.getUserProfile.mockRejectedValue(error);

      await UserController.getProfile(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Failed to fetch profile",
      });
    });
  });

  describe("updateProfile", () => {
    it("should update a user profile and return the updated user", async () => {
      const userId = 1;
      const profileData = { name: "Updated Name" };
      const updatedUser = { id: userId, ...profileData };

      req.params.userId = userId;
      req.body = profileData;
      UserService.updateUserProfile.mockResolvedValue(updatedUser);

      await UserController.updateProfile(req, res);

      expect(UserService.updateUserProfile).toHaveBeenCalledWith(
        userId,
        profileData
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(updatedUser);
    });

    it("should handle errors and return an error response", async () => {
      const error = new Error("Failed to update profile");
      error.statusCode = 500;

      req.params.userId = 1;
      req.body = { name: "Updated Name" };
      UserService.updateUserProfile.mockRejectedValue(error);

      await UserController.updateProfile(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Failed to update profile",
      });
    });
  });

  describe("updateLocation", () => {
    it("should update a user's location and return the updated user", async () => {
      const userId = 1;
      const cityId = 2;
      const updatedUser = { id: userId, cityId };

      req.params.userId = userId;
      req.body.cityId = cityId;
      UserService.updateUserLocation.mockResolvedValue(updatedUser);

      await UserController.updateLocation(req, res);

      expect(UserService.updateUserLocation).toHaveBeenCalledWith(
        userId,
        cityId
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(updatedUser);
    });

    it("should handle errors and return an error response", async () => {
      const error = new Error("Failed to update location");
      error.statusCode = 500;

      req.params.userId = 1;
      req.body.cityId = 2;
      UserService.updateUserLocation.mockRejectedValue(error);

      await UserController.updateLocation(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Failed to update location",
      });
    });
  });

  describe("updatePreferences", () => {
    it("should update a user's preferences and return the updated preferences", async () => {
      const userId = 1;
      const minorCategoryIds = [1, 2, 3];
      const updatedPreferences = [
        { id: 1, userId, minorCategoryId: 1 },
        { id: 2, userId, minorCategoryId: 2 },
        { id: 3, userId, minorCategoryId: 3 },
      ];

      req.params.userId = userId;
      req.body.minorCategoryIds = minorCategoryIds;
      UserService.updateUserPreferences.mockResolvedValue(updatedPreferences);

      await UserController.updatePreferences(req, res);

      expect(UserService.updateUserPreferences).toHaveBeenCalledWith(
        userId,
        minorCategoryIds
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(updatedPreferences);
    });

    it("should handle errors and return an error response", async () => {
      const error = new Error("Failed to update preferences");
      error.statusCode = 500;

      req.params.userId = 1;
      req.body.minorCategoryIds = [1, 2, 3];
      UserService.updateUserPreferences.mockRejectedValue(error);

      await UserController.updatePreferences(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Failed to update preferences",
      });
    });
  });

  describe("softDeleteUser", () => {
    it("should soft delete a user and return a 204 status", async () => {
      const userId = 1;
      const deletedUser = { id: userId, isDeleted: true };

      req.params.userId = userId;
      UserService.softDeleteUser.mockResolvedValue(deletedUser);

      await UserController.softDeleteUser(req, res);

      expect(UserService.softDeleteUser).toHaveBeenCalledWith(userId);
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalled();
    });

    it("should handle user not found and return a 404 error", async () => {
      const userId = 1;

      req.params.userId = userId;
      UserService.softDeleteUser.mockResolvedValue(null);

      await UserController.softDeleteUser(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
    });

    it("should handle errors and return an error response", async () => {
      const error = new Error("Failed to soft delete user");
      error.statusCode = 500;

      req.params.userId = 1;
      UserService.softDeleteUser.mockRejectedValue(error);

      await UserController.softDeleteUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Failed to soft delete user",
      });
    });
  });
});
