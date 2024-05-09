const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const UserDao = {
  /**
   * Creates a new user in the database.
   * @param {string} name - The full name of the user.
   * @param {string} email - The email address of the user, must be unique.
   * @param {string} password - The hashed password for the user's account.
   * @param {string} phoneNumber - The phone number of the user (optional).
   * @param {number} cityId - The ID of the city the user is located in.
   * @returns {Object} The newly created user object.
   * @throws Will throw an error if the database operation fails.
   */
  createUser: async (name, email, password, phoneNumber, cityId) => {
    console.log("Input parameters to UserDao.createUser:", {
      name,
      email,
      password,
      phoneNumber,
      cityId,
    });
    try {
      // Validate input parameters
      if (!name || !email || !password || !phoneNumber || !cityId) {
        throw new Error("Missing required fields");
      }

      return await prisma.user.create({
        data: {
          name,
          email,
          password,
          phone_number: phoneNumber,
          city_id: parseInt(cityId),
        },
      });
    } catch (error) {
      console.log("Error in UserDao.createUser:", error);
      console.error("Failed to create user:", error);
      throw new Error("Error creating user");
    }
  },

  /**
   * Authenticates a user using their email and password.
   * @param {string} email - The email of the user trying to authenticate.
   * @param {string} password - The password of the user for authentication.
   * @returns {Object} The authenticated user object if credentials match.
   * @throws Will throw an error if authentication fails.
   */
  authenticateUser: async (email, password) => {
    console.log("Input parameters to UserDao.authenticateUser:", {
      email,
      password,
    });
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (user && user.password === password) {
        return user;
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error) {
      console.log("Error in UserDao.authenticateUser:", error);
      console.error("Authentication failed:", error);
      if (error.message === "Invalid email or password") {
        throw error;
      } else {
        throw new Error("Authentication error");
      }
    }
  },

  /**
   * Retrieves all users from the database.
   * @returns {Array} An array of user objects.
   * @throws Will throw an error if the database operation fails.
   * @throws Will throw an error if no users are found.
   */
  getAllUsers: async () => {
    try {
      return await prisma.user.findMany();
    } catch (error) {
      console.log("Error in UserDao.getAllUsers:", error);
      console.error("Failed to get all users:", error);
      throw new Error("Error getting all users");
    }
  },

  /**
   * Retrieves a user by their userId.
   * @param {number} userId - The ID of the user to retrieve.
   * @returns {Object} The user object if found.
   * @throws Will throw an error if the user is not found or the database operation fails.
   */
  getUserById: async (userId) => {
    console.log("Input parameters to UserDao.getUserById:", { userId });
    try {
      const user = await prisma.user.findUnique({
        where: { id: parseInt(userId) },
      });

      if (!user) {
        throw new Error("User not found");
      }

      return user;
    } catch (error) {
      console.log("Error in UserDao.getUserById:", error);
      console.error("Failed to get user by ID:", error);
      throw error;
    }
  },

  /**
   * Retrieves a user by their email address.
   * @param {string} email - The email of the user to retrieve.
   * @returns {Object} The user object if found.
   * @throws Will throw an error if the user is not found or the database operation fails.
   */
  getUserByEmail: async (email) => {
    console.log("Input parameters to UserDao.getUserByEmail:", { email });
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      return user;
    } catch (error) {
      console.log("Error in UserDao.getUserByEmail:", error);
      console.error("Failed to get user by email:", error);
      throw error;
    }
  },

  /**
   * Retrieves user preferences based on their userId.
   * @param {number} userId - The ID of the user whose preferences are to be retrieved.
   * @returns {Array} An array of user preferences.
   * @throws Will throw an error if the operation fails or user is not found.
   */
  getUserPreferences: async (userId) => {
    console.log("Input parameters to UserDao.getUserPreferences:", { userId });
    try {
      const preferences = await prisma.userPreference.findMany({
        where: { user_id: parseInt(userId) },
        select: { minor_category_id: true },
      });

      return preferences.length > 0 ? preferences : [];
    } catch (error) {
      console.log("Error in UserDao.getUserPreferences:", error);
      console.error("Failed to get user preferences:", error);
      throw new Error("Error getting user preferences");
    }
  },

  /**
   * Updates a user's profile information in the database based on their userId.
   * @param {number} userId - The ID of the user to update.
   * @param {Object} profileData - The new data for the user's profile.
   * @returns {Object} The updated user object.
   * @throws Will throw an error if the update operation fails or user is not found.
   */
  updateUserProfile: async (userId, profileData) => {
    console.log("Input parameters to UserDao.updateUserProfile:", {
      userId,
      profileData,
    });
    try {
      // Validate profileData object
      if (!profileData || Object.keys(profileData).length === 0) {
        throw new Error("Invalid profile data");
      }

      return await prisma.user.update({
        where: { id: parseInt(userId) },
        data: profileData,
      });
    } catch (error) {
      console.log("Error in UserDao.updateUserProfile:", error);
      console.error("Failed to update user profile:", error);
      throw error;
    }
  },

  /**
   * Updates a user's location based on their userId and cityId.
   * @param {number} userId - The ID of the user whose location is to be updated.
   * @param {number} cityId - The ID of the city to update the user's location to.
   * @returns {Object} The updated user object.
   * @throws Will throw an error if the update operation fails or user is not found.
   * @throws Will throw an error if the city is not found.
   */
  updateUserLocation: async (userId, cityId) => {
    console.log("Input parameters to UserDao.updateUserLocation:", {
      userId,
      cityId,
    });
    try {
      // Check if the city exists
      const city = await prisma.city.findUnique({
        where: { id: parseInt(cityId) },
      });

      if (!city) {
        throw new Error("Invalid city ID");
      }

      return await prisma.user.update({
        where: { id: parseInt(userId) },
        data: {
          city_id: parseInt(cityId),
        },
      });
    } catch (error) {
      console.log("Error in UserDao.updateUserLocation:", error);
      console.error("Failed to update user location:", error);
      throw error;
    }
  },

  /**
   * Updates user preferences based on their userId.
   * @param {number} userId - The ID of the user whose preferences are to be updated.
   * @param {Array} minorCategoryIds - An array of minor category IDs to update the user's preferences to.
   * @returns {Array} An array of updated user preferences.
   * @throws Will throw an error if updating preferences fails.
   */
  updateUserPreferences: async (userId, minorCategoryIds) => {
    console.log("Input parameters to UserDao.updateUserPreferences:", {
      userId,
      minorCategoryIds,
    });
    try {
      // Validate minorCategoryIds array
      if (!Array.isArray(minorCategoryIds) || minorCategoryIds.length === 0) {
        throw new Error("Invalid minor category IDs");
      }

      // Start a transaction to handle multiple operations automatically
      return await prisma.$transaction(async (prisma) => {
        // First, remove existing preferences for this user
        await prisma.userPreference.deleteMany({
          where: { user_id: parseInt(userId) },
        });

        // Then, add new preferences based on provided minorCategoryIds
        const preferencePromises = minorCategoryIds.map((minorCategoryId) => {
          return prisma.userPreference.create({
            data: {
              user_id: parseInt(userId),
              minor_category_id: parseInt(minorCategoryId),
            },
          });
        });

        // Execute all insertions in parallel
        return await Promise.all(preferencePromises);
      });
    } catch (error) {
      console.log("Error in UserDao.updateUserPreferences:", error);
      console.error("Failed to update user preferences:", error);
      throw error;
    }
  },

  // /**
  //  * Updates a user's role based on their userId.
  //  * @param {number} userId - The ID of the user whose role is to be updated.
  //  * @param {string} newRole - The new role to assign to the user.
  //  * @returns {Object} The user object with the updated role.
  //  * @throws Will throw an error if the user is not found or the database operation fails.
  //  */
  // updateUserRole: async (userId, newRole) => {
  //   try {
  //     return await prisma.users.update({
  //       where: { id: userId },
  //       data: { role: newRole },
  //     });
  //   } catch (error) {
  //     console.error("Failed to update user role:", error);
  //     throw new Error("Error updating user role");
  //   }
  // },

  /**
   * Marks a user as deleted (soft delete) based on their userId.
   * @param {number} userId - The ID of the user to soft delete.
   * @returns {Object} The user object marked as deleted.
   * @throws Will throw an error if the user is not found or the database operation fails.
   */
  softDeleteUser: async (userId) => {
    console.log("Input parameters to UserDao.softDeleteUser:", { userId });
    try {
      // Check if the user exists
      const user = await prisma.user.findUnique({
        where: { id: parseInt(userId) },
      });

      if (!user) {
        throw new Error("User not found");
      }

      return await prisma.user.update({
        where: { id: parseInt(userId) },
        data: { is_deleted: true, deleted_at: new Date() },
      });
    } catch (error) {
      console.log("Error in UserDao.softDeleteUser:", error);
      console.error("Failed to delete user:", error);
      throw error;
    }
  },
};

module.exports = UserDao;
