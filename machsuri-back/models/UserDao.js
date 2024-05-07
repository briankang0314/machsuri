const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const UserDao = {
  /**
   * Creates a new user in the database.
   * @param {string} name - The full name of the user.
   * @param {string} email - The email address of the user, must be unique.
   * @param {string} password - The hashed password for the user's account.
   * @returns {Object} The newly created user object.
   * @throws Will throw an error if the database operation fails.
   */
  createUser: async (name, email, password) => {
    try {
      return await prisma.user.create({
        data: {
          name,
          email,
          password,
        },
      });
    } catch (error) {
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
      console.error("Authentication failed:", error);
      throw new Error("Authentication error");
    }
  },

  /**
   * Retrieves a user by their userId.
   * @param {number} userId - The ID of the user to retrieve.
   * @returns {Object} The user object if found.
   * @throws Will throw an error if the user is not found or the database operation fails.
   */
  getUserById: async (userId) => {
    try {
      return await prisma.user.findUnique({
        where: { id: userId },
      });
    } catch (error) {
      console.error("Failed to get user by ID:", error);
      throw new Error("Error getting user by ID");
    }
  },

  /**
   * Retrieves a user by their email address.
   * @param {string} email - The email of the user to retrieve.
   * @returns {Object} The user object if found.
   * @throws Will throw an error if the user is not found or the database operation fails.
   */
  getUserByEmail: async (email) => {
    try {
      return await prisma.user.findUnique({
        where: { email },
      });
    } catch (error) {
      console.error("Failed to get user by email:", error);
      throw new Error("Error getting user by email");
    }
  },

  /**
   * Retrieves user preferences based on their userId.
   * @param {number} userId - The ID of the user whose preferences are to be retrieved.
   * @returns {Array} An array of user preferences.
   * @throws Will throw an error if the operation fails or user is not found.
   */
  getUserPreferences: async (userId) => {
    try {
      return await prisma.userPreference.findMany({
        where: { user_id: userId },
        select: { minor_category_id: true },
      });
    } catch (error) {
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
    try {
      return await prisma.user.update({
        where: { id: userId },
        data: profileData,
      });
    } catch (error) {
      console.error("Failed to update user profile:", error);
      throw new Error("Error updating user profile");
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
    try {
      // Start a transaction to handle multiple operations automically
      return await prisma.$transaction(async (prisma) => {
        // First, remove existing preferences for this user
        await prisma.userPreference.deleteMany({
          where: { user_id: userId },
        });

        // Then, add new preferences based on provided minorCategoryIds
        const preferencePromises = minorCategoryIds.map((minorCategoryId) => {
          return prisma.userPreference.create({
            data: {
              user_id: userId,
              minor_category_id: minorCategoryId,
            },
          });
        });

        // Execute all insertions in parallel
        return await Promise.all(preferencePromises);
      });
    } catch (error) {
      console.error(
        "Failed to update user preferences in UserPreference table:",
        error
      );
      throw new Error(
        "Error updating user preferences in UserPreference table"
      );
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
    try {
      return await prisma.users.update({
        where: { id: userId },
        data: { is_deleted: true, deleted_at: new Date() },
      });
    } catch (error) {
      console.error("Failed to delete user:", error);
      throw new Error("Error deleting user");
    }
  },
};

module.exports = UserDao;
