const UserService = require("../services/UserService");
const UserDao = require("../models/UserDao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

jest.mock("../models/UserDao");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("UserService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("registerUser", () => {
    it("should register a new user successfully", async () => {
      const userData = {
        name: "Jane Doe",
        email: "janedoe@example.com",
        password: "securePassword456",
        phone_number: "01012345678",
        city_id: 1,
      };
      const hashedPassword = "hashedPassword";
      const salt = "salt";

      const newUser = { ...userData, id: 1 };

      bcrypt.genSaltSync.mockReturnValue(salt);
      bcrypt.hashSync.mockReturnValue(hashedPassword);
      UserDao.getUserByEmail.mockResolvedValue(null);
      UserDao.createUser.mockResolvedValue(newUser);

      const result = await UserService.registerUser(
        userData.name,
        userData.email,
        userData.password,
        userData.phone_number,
        userData.city_id
      );

      expect(result).toEqual(newUser);
      expect(UserDao.getUserByEmail).toHaveBeenCalledWith(userData.email);
      expect(bcrypt.genSaltSync).toHaveBeenCalled();
      expect(bcrypt.hashSync).toHaveBeenCalledWith(userData.password, salt);
      expect(UserDao.createUser).toHaveBeenCalledWith(
        userData.name,
        userData.email,
        hashedPassword,
        userData.phone_number,
        userData.city_id
      );
    });

    // Add more test cases for error scenarios
    it("should throw an error if user already exists", async () => {
      const userData = {
        name: "Jane Doe",
        email: "janedoe@example.com",
        password: "securePassword456",
        phone_number: "01012345678",
        city_id: 1,
      };
      UserDao.getUserByEmail.mockResolvedValue(userData);

      await expect(
        UserService.registerUser(
          userData.name,
          userData.email,
          userData.password,
          userData.phone_number,
          userData.city_id
        )
      ).rejects.toThrow("User already exists");
    });
  });

  describe("authenticateUser", () => {
    it("should authenticate a user successfully", async () => {
      const email = "john@example.com";
      const password = "securePassword123";
      const user = { id: 1, email, password: "hashedPassword" };
      const token = "generatedToken";

      UserDao.getUserByEmail.mockResolvedValue(user);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue(token);

      const result = await UserService.authenticateUser(email, password);

      expect(result).toEqual({ user, token });
      expect(UserDao.getUserByEmail).toHaveBeenCalledWith(email);
      expect(bcrypt.compare).toHaveBeenCalledWith(password, user.password);
      expect(jwt.sign).toHaveBeenCalledWith(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1h" }
      );
    });

    // Add more test cases for error scenarios
    it("should throw an error if user does not exist", async () => {
      const email = "nonexistent@example.com";
      const password = "password123";
      UserDao.getUserByEmail.mockResolvedValue(null);

      await expect(
        UserService.authenticateUser(email, password)
      ).rejects.toThrow("Invalid email or password");
    });

    it("should throw an error if password is incorrect", async () => {
      const email = "john@example.com";
      const password = "wrongPassword";
      const user = { id: 1, email, password: "hashedPassword" };
      UserDao.getUserByEmail.mockResolvedValue(user);
      bcrypt.compare.mockResolvedValue(false);

      await expect(
        UserService.authenticateUser(email, password)
      ).rejects.toThrow("Invalid email or password");
    });
  });

  describe("getAllUsers", () => {
    it("should retrieve all users successfully", async () => {
      const users = [
        { id: 1, name: "Jane Doe" },
        { id: 2, name: "John Doe" },
      ];
      UserDao.getAllUsers.mockResolvedValue(users);

      const result = await UserService.getAllUsers();

      expect(result).toEqual(users);
      expect(UserDao.getAllUsers).toHaveBeenCalled();
    });

    // Add more test cases for error scenarios
    it("should throw an error if database operation fails", async () => {
      UserDao.getAllUsers.mockRejectedValue(new Error("Database error"));

      await expect(UserService.getAllUsers()).rejects.toThrow(
        "Failed to get all users"
      );
    });
  });

  describe("getUserProfile", () => {
    it("should retrieve a user profile successfully", async () => {
      const userId = 1;
      const user = { id: userId, name: "Jane Doe" };
      UserDao.getUserById.mockResolvedValue(user);

      const result = await UserService.getUserProfile(userId);

      expect(result).toEqual(user);
      expect(UserDao.getUserById).toHaveBeenCalledWith(userId);
    });

    // Add more test cases for error scenarios
    it("should throw an error if user is not found", async () => {
      const userId = 1;
      UserDao.getUserById.mockRejectedValue(new Error("User not found"));

      await expect(UserService.getUserProfile(userId)).rejects.toThrow(
        "Failed to get user profile"
      );
    });
  });

  describe("getUserPreferences", () => {
    it("should retrieve user preferences successfully", async () => {
      const userId = 1;
      const preferences = [{ minor_category_id: 1 }, { minor_category_id: 2 }];
      UserDao.getUserPreferences.mockResolvedValue(preferences);

      const result = await UserService.getUserPreferences(userId);

      expect(result).toEqual(preferences);
      expect(UserDao.getUserPreferences).toHaveBeenCalledWith(userId);
    });

    // Add more test cases for error scenarios
    it("should throw an error if preferences are not found", async () => {
      const userId = 1;
      UserDao.getUserPreferences.mockRejectedValue(
        new Error("Error getting user preferences")
      );

      await expect(UserService.getUserPreferences(userId)).rejects.toThrow(
        "Failed to get user preferences"
      );
    });
  });

  describe("updateUserProfile", () => {
    it("should update a user profile successfully", async () => {
      const userId = 1;
      const profileData = { name: "Updated Name" };
      const updatedUser = { id: userId, ...profileData };
      UserDao.updateUserProfile.mockResolvedValue(updatedUser);

      const result = await UserService.updateUserProfile(userId, profileData);

      expect(result).toEqual(updatedUser);
      expect(UserDao.updateUserProfile).toHaveBeenCalledWith(
        userId,
        profileData
      );
    });

    // Add more test cases for error scenarios
    it("should throw an error if update operation fails", async () => {
      const userId = 1;
      const profileData = { name: "Updated Name" };
      UserDao.updateUserProfile.mockRejectedValue(new Error("Update error"));

      await expect(
        UserService.updateUserProfile(userId, profileData)
      ).rejects.toThrow("Failed to update user profile");
    });
  });

  describe("updateUserLocation", () => {
    it("should update a user location successfully", async () => {
      const userId = 1;
      const cityId = 2;
      const updatedUser = { id: userId, cityId };
      UserDao.updateUserLocation.mockResolvedValue(updatedUser);

      const result = await UserService.updateUserLocation(userId, cityId);

      expect(result).toEqual(updatedUser);
      expect(UserDao.updateUserLocation).toHaveBeenCalledWith(userId, cityId);
    });

    // Add more test cases for error scenarios
    it("should throw an error if update operation fails", async () => {
      const userId = 1;
      const cityId = 2;
      UserDao.updateUserLocation.mockRejectedValue(new Error("Update error"));

      await expect(
        UserService.updateUserLocation(userId, cityId)
      ).rejects.toThrow("Failed to update user location");
    });
  });

  describe("updateUserPreferences", () => {
    it("should update user preferences successfully", async () => {
      const userId = 1;
      const minorCategoryIds = [1, 2, 3];
      const updatedPreferences = [
        { id: 1, userId, minorCategoryId: 1 },
        { id: 2, userId, minorCategoryId: 2 },
        { id: 3, userId, minorCategoryId: 3 },
      ];
      UserDao.updateUserPreferences.mockResolvedValue(updatedPreferences);

      const result = await UserService.updateUserPreferences(
        userId,
        minorCategoryIds
      );

      expect(result).toEqual(updatedPreferences);
      expect(UserDao.updateUserPreferences).toHaveBeenCalledWith(
        userId,
        minorCategoryIds
      );
    });

    // Add more test cases for error scenarios
    it("should throw an error if update operation fails", async () => {
      const userId = 1;
      const minorCategoryIds = [1, 2, 3];
      UserDao.updateUserPreferences.mockRejectedValue(
        new Error("Update error")
      );

      await expect(
        UserService.updateUserPreferences(userId, minorCategoryIds)
      ).rejects.toThrow("Failed to update user preferences");
    });
  });

  describe("softDeleteUser", () => {
    it("should soft delete a user successfully", async () => {
      const userId = 1;
      const deletedUser = { id: userId, isDeleted: true };
      UserDao.softDeleteUser.mockResolvedValue(deletedUser);

      const result = await UserService.softDeleteUser(userId);

      expect(result).toEqual(deletedUser);
      expect(UserDao.softDeleteUser).toHaveBeenCalledWith(userId);
    });

    // Add more test cases for error scenarios
    it("should throw an error if user is not found", async () => {
      const userId = 1;
      UserDao.softDeleteUser.mockRejectedValue(new Error("User not found"));

      await expect(UserService.softDeleteUser(userId)).rejects.toThrow(
        "Failed to soft delete user"
      );
    });
  });
});
