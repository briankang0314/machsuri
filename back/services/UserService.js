const UserDao = require("../models/UserDao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * Registers a new user with the provided details.
 * @param {string} name - The full name of the user.
 * @param {string} email - The email address of the user.
 * @param {string} password - The password for the user's account.
 * @param {string} phoneNumber - The phone number of the user (optional).
 * @package {number} cityId - The ID of the city the user is located in.
 * @returns {Object} The newly created user object.
 * @throws Will throw an error if the registration fails.
 */
const registerUser = async (name, email, password, phoneNumber, cityId) => {
  // Regular expressions for input validation
  const emailReg =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  const pwReg = /(?=.*\d)(?=.*[a-zA-ZS]).{8,}/;
  const phoneReg = /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/;

  // Validate name, email, password, and cityId
  if (!name || !emailReg.test(email) || !pwReg.test(password) || !cityId) {
    throw new Error("Invalid input format");
  }
  if (password.length < 8) {
    throw new Error("Password too short");
  }

  // Validate phone number if provided
  if (phoneNumber && !phoneReg.test(phoneNumber)) {
    throw new Error("Invalid phone number");
  }

  // Check if the user already exists
  const existingUser = await UserDao.getUserByEmail(email);
  if (existingUser) {
    throw new Error("User already exists");
  }

  // Hash the password
  const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync());
  const newUser = await UserDao.createUser(
    name,
    email,
    hashedPassword,
    phoneNumber,
    cityId
  );

  return newUser;
};

/**
 * Authenticates a user using their email and password.
 * @param {string} email - The email of the user trying to authenticate.
 * @param {string} password - The password of the user for authentication.
 * @returns {Object} The authenticated user object and a JWT token.
 * @throws Will throw an error if authentication fails.
 * @throws Will throw an error if required fields are missing.
 */
const authenticateUser = async (email, password) => {
  // Validate input
  if (!email || !password) {
    throw new Error("Missing required fields");
  }

  const user = await UserDao.getUserByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid email or password");
  }

  // Generate a JWT token
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1h" }
  );

  return { user, token };
};

/**
 * Retrieves a user's profile information by their ID.
 * @param {number} userId - The ID of the user to retrieve.
 * @returns {Object} The user's profile information.
 * @throws Will throw an error if the user is not found or the database operation fails.
 * @throws Will throw an error if required fields are missing.
 */
const getUserProfile = async (userId) => {
  // Validate input
  if (!userId) {
    throw new Error("Missing required fields");
  }

  const user = await UserDao.getUserById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

/**
 * Retrieves a user's preferences by their ID.
 * @param {number} userId - The ID of the user to retrieve preferences for.
 * @returns {Object} The user's preferences.
 * @throws Will throw an error if the user is not found or the database operation fails.
 * @throws Will throw an error if required fields are missing.
 */
const getUserPreferences = async (userId) => {
  try {
    const preferences = await UserDao.getUserPreferences(userId);
    if (!preferences) {
      throw new Error("No preferences found for this user");
    }
    return preferences;
  } catch (error) {
    console.error("Error retrieving user preferences:", error);
    throw new Error("Failed to get user preferences");
  }
};

/**
 * Updates a user's profile information.
 * @param {number} userId - The ID of the user to update.
 * @param {Object} profileData - The updated profile information.
 * @returns {Object} The updated user profile.
 * @throws Will throw an error if the user is not found or the database operation fails.
 * @throws Will throw an error if required fields are missing.
 */
const updateUserProfile = async (userId, profileData) => {
  // Validate input
  if (!userId || !profileData) {
    throw new Error("Missing required fields");
  }

  const updatedUser = await UserDao.updateUserProfile(userId, profileData);
  if (!updatedUser) {
    throw new Error("User not found");
  }

  return updatedUser;
};

/**
 * Updates a user's location in the database.
 * @param {number} userId - The ID of the user to update.
 * @param {number} cityId - The ID of the city to update the user's location to.
 * @returns {Object} The updated user object.
 * @throws Will throw an error if the user is not found or the database operation fails.
 * @throws Will throw an error if the city is not found.
 */
const updateUserLocation = async (userId, cityId) => {
  // Validate input
  if (!userId || !cityId) {
    throw new Error("Missing required fields");
  }

  const updatedUser = await UserDao.updateUserLocation(userId, cityId);
  if (!updatedUser) {
    throw new Error("User not found or city not found");
  }

  return updatedUser;
};

// /**
//  * Updates a user's role in the database.
//  * @param {number} userId - The ID of the user to update.
//  * @param {string} newRole - The new role for the user.
//  * @returns {Object} The updated user object.
//  * @throws Will throw an error if the user is not found or the database operation fails.
//  * @throws Will throw an error if required fields are missing.
//  */
// const updateUserRole = async (userId, newRole) => {
//   try {
//     const updatedUser = await UserDao.updateUserRole(userId, newRole);
//     if (!updatedUser) {
//       throw new Error("User not found or unable to update");
//     }
//     return updatedUser;
//   } catch (error) {
//     console.error("Error updating user role:", error);
//     throw new Error("Failed to update user role");
//   }
// };

/**
 * Updates a user's preferences in the database.
 * @param {number} userId - The ID of the user to update.
 * @param {Array} minorCategoryIds - An array of minor category IDs for the user's preferences.
 * @returns {Array} The updated user preferences.
 * @throws Will throw an error if the user is not found or the database operation fails.
 * @throws Will throw an error if required fields are missing.
 */
const updateUserPreferences = async (userId, minorCategoryIds) => {
  try {
    const updatedPreferences = await UserDao.updateUserPreferences(
      userId,
      minorCategoryIds
    );
    return updatedPreferences;
  } catch (error) {
    console.error(
      "Error updating user preferences in UserPreference table:",
      error
    );
    throw new Error("Failed to update user preferences");
  }
};

/**
 * Soft deletes a user from the database.
 * @param {number} userId - The ID of the user to soft delete.
 * @returns {Object} The deleted user object.
 * @throws Will throw an error if the user is not found or the database operation fails.
 */
const softDeleteUser = async (userId) => {
  try {
    const result = await UserDao.softDeleteUser(userId);
    if (!result) {
      throw new Error("User not found or already deleted");
    }
    return result;
  } catch (error) {
    console.error("Error soft deleting user:", error);
    throw new Error("Failed to soft delete user");
  }
};

// Export the service functions to be used by other parts of the application
module.exports = {
  registerUser,
  authenticateUser,
  updateUserProfile,
  updateUserLocation,
  updateUserPreferences,
  // updateUserRole,
  getUserProfile,
  getUserPreferences,
  softDeleteUser,
};
