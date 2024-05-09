const UserDao = require("../models/UserDao");
const { PrismaClient } = require("@prisma/client");

// Mocking PrismaClient used in UserDao
jest.mock("@prisma/client", () => {
  const mPrisma = {
    user: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
    },
    userPreference: {
      findMany: jest.fn(),
      deleteMany: jest.fn(),
      create: jest.fn(),
    },
    city: {
      findUnique: jest.fn(),
    },
    $transaction: jest.fn(),
  };
  return { PrismaClient: jest.fn(() => mPrisma) };
});

describe("UserDao", () => {
  let prisma;

  beforeAll(() => {
    prisma = new PrismaClient();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createUser", () => {
    it("should create a new user and return user object", async () => {
      const userData = {
        name: "Jane Doe",
        email: "janedoe@example.com",
        password: "securePassword456",
        phone_number: "01012345678",
        city_id: 1,
      };
      const expectedUser = { id: 1, ...userData };
      prisma.user.create.mockResolvedValue(expectedUser);

      const result = await UserDao.createUser(
        userData.name,
        userData.email,
        userData.password,
        userData.phone_number,
        userData.city_id
      );

      expect(result).toEqual(expectedUser);
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: userData,
      });
    });
  });

  describe("authenticateUser", () => {
    it("should authenticate user if credentials match", async () => {
      const user = {
        email: "janedoe@example.com",
        password: "securePassword456",
      };
      prisma.user.findUnique.mockResolvedValue(user);

      const result = await UserDao.authenticateUser(user.email, user.password);

      expect(result).toEqual(user);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: user.email },
      });
    });

    it("should throw error if credentials do not match", async () => {
      const user = {
        email: "janedoe@example.com",
        password: "hashedpassword",
      };
      prisma.user.findUnique.mockResolvedValue(null);

      await expect(
        UserDao.authenticateUser(user.email, "wrongpassword")
      ).rejects.toThrow("Invalid email or password");
    });
  });

  describe("getAllUsers", () => {
    it("should retrieve all users", async () => {
      const users = [
        { id: 1, name: "Jane Doe" },
        { id: 2, name: "John Doe" },
      ];
      prisma.user.findMany.mockResolvedValue(users);

      const result = await UserDao.getAllUsers();

      expect(result).toEqual(users);
      expect(prisma.user.findMany).toHaveBeenCalled();
    });

    it("should return an empty array if no users are found", async () => {
      prisma.user.findMany.mockResolvedValue([]);

      const result = await UserDao.getAllUsers();

      expect(result).toEqual([]);
      expect(prisma.user.findMany).toHaveBeenCalled();
    });
  });

  describe("getUserById", () => {
    it("should retrieve a user by ID", async () => {
      const user = {
        id: 1,
        name: "Jane Doe",
        email: "janedoe@example.com",
      };
      prisma.user.findUnique.mockResolvedValue(user);

      const result = await UserDao.getUserById(user.id);

      expect(result).toEqual(user);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: user.id },
      });
    });

    it("should throw an error if user is not found", async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      await expect(UserDao.getUserById(1)).rejects.toThrow("User not found");
    });
  });

  describe("getUserByEmail", () => {
    it("should retrieve a user by email", async () => {
      const user = {
        id: 1,
        name: "Jane Doe",
        email: "janedoe@example.com",
      };
      prisma.user.findUnique.mockResolvedValue(user);

      const result = await UserDao.getUserByEmail(user.email);

      expect(result).toEqual(user);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: user.email },
      });
    });
  });

  describe("getUserPreferences", () => {
    it("should retrieve user preferences", async () => {
      const preferences = [{ minor_category_id: 1 }, { minor_category_id: 2 }];
      prisma.userPreference.findMany.mockResolvedValue(preferences);

      const result = await UserDao.getUserPreferences(1);

      expect(result).toEqual(preferences);
      expect(prisma.userPreference.findMany).toHaveBeenCalledWith({
        where: { user_id: 1 },
        select: { minor_category_id: true },
      });
    });

    it("should return an empty array if no preferences are found", async () => {
      prisma.userPreference.findMany.mockResolvedValue([]);

      const result = await UserDao.getUserPreferences(1);

      expect(result).toEqual([]);
      expect(prisma.userPreference.findMany).toHaveBeenCalledWith({
        where: { user_id: 1 },
        select: { minor_category_id: true },
      });
    });
  });

  describe("updateUserProfile", () => {
    it("should update user profile", async () => {
      const user = {
        id: 1,
        name: "Jane Doe",
        email: "janedoe@example.com",
        phone_number: "01012345678",
      };
      const updatedUser = { ...user, name: "Brian Kang" };
      prisma.user.update.mockResolvedValue(updatedUser);

      const result = await UserDao.updateUserProfile(user.id, {
        name: "Brian Kang",
      });

      expect(result).toEqual(updatedUser);
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: user.id },
        data: { name: "Brian Kang" },
      });
    });

    it("should throw an error if profile data is invalid", async () => {
      await expect(UserDao.updateUserProfile(1, null)).rejects.toThrow(
        "Invalid profile data"
      );
    });
  });

  describe("updateUserLocation", () => {
    it("should update user location", async () => {
      const user = {
        id: 1,
        name: "Jane Doe",
        email: "janedoe@example.com",
        city_id: 1,
      };
      const updatedUser = { ...user, city_id: 2 };
      prisma.city.findUnique.mockResolvedValue({ id: 2 });
      prisma.user.update.mockResolvedValue(updatedUser);

      const result = await UserDao.updateUserLocation(user.id, 2);

      expect(result).toEqual(updatedUser);
      expect(prisma.city.findUnique).toHaveBeenCalledWith({
        where: { id: 2 },
      });
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: user.id },
        data: { city_id: 2 },
      });
    });

    it("should throw an error if city is invalid", async () => {
      prisma.city.findUnique.mockResolvedValue(null);

      await expect(UserDao.updateUserLocation(1, 999)).rejects.toThrow(
        "Invalid city ID"
      );
    });
  });

  describe("updateUserPreferences", () => {
    it("should update user preferences", async () => {
      const preferences = [{ minor_category_id: 1 }, { minor_category_id: 2 }];
      prisma.$transaction.mockImplementation(async (callback) => {
        await prisma.userPreference.deleteMany({
          where: { user_id: 1 },
        });

        const createPromises = preferences.map((preference) => {
          return prisma.userPreference.create({
            data: {
              user_id: 1,
              minor_category_id: preference.minor_category_id,
            },
          });
        });

        return Promise.all(createPromises).then(() => preferences);
      });

      const result = await UserDao.updateUserPreferences(1, [1, 2]);

      expect(result).toEqual(preferences);
      expect(prisma.$transaction).toHaveBeenCalled();
      expect(prisma.userPreference.deleteMany).toHaveBeenCalledWith({
        where: { user_id: 1 },
      });
      expect(prisma.userPreference.create).toHaveBeenCalledTimes(2);
    });

    it("should throw an error if minor category IDs are invalid", async () => {
      await expect(UserDao.updateUserPreferences(1, null)).rejects.toThrow(
        "Invalid minor category IDs"
      );
    });
  });

  describe("softDeleteUser", () => {
    it("should soft delete a user", async () => {
      const user = {
        id: 1,
        name: "Jane Doe",
        email: "janedoe@example.com",
        is_deleted: false,
        deleted_at: null,
      };
      const deletedUser = {
        ...user,
        is_deleted: true,
        deleted_at: expect.any(Date),
      };
      prisma.user.findUnique.mockResolvedValue(user);
      prisma.user.update.mockResolvedValue(deletedUser);

      const result = await UserDao.softDeleteUser(user.id);

      expect(result).toEqual(deletedUser);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: user.id },
      });
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: user.id },
        data: {
          is_deleted: true,
          deleted_at: expect.any(Date),
        },
      });
    });

    it("should throw an error if user is not found", async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      await expect(UserDao.softDeleteUser(1)).rejects.toThrow("User not found");
    });
  });
});
