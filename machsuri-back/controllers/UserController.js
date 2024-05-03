const UserService = require("../services/UserService");
const errorGenerator = require("../utils/errorGenerator");

/**
 * Handles user registration.
 * @param {Object} req - The request object containing user data in req.body.
 * @param {Object} res - The response object for sending responses.
 */
const register = async (req, res) => {
  const { name, email, password, phoneNumber } = req.body;

  try {
    const user = await UserService.registerUser(
      name,
      email,
      password,
      phoneNumber
    );
    res.status(201).json(user);
  } catch (error) {
    console.error("Error registering user:", error);
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

/**
 * Handles user login.
 * @param {Object} req - The request object containing login data in req.body.
 * @param {Object} res - The response object for sending responses.
 */
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { user, token } = await UserService.authenticateUser(email, password);
    res.status(200).json({ user, token });
  } catch (error) {
    console.error("Error logging in:", error);
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

/**
 * Handles updating a user's profile.
 * @param {Object} req - The request object containing profile data in req.body.
 * @param {Object} res - The response object for sending responses.
 */
const updateProfile = async (req, res) => {
  const { userId } = req.params;
  const profileData = req.body;

  try {
    const user = await UserService.updateUserProfile(userId, profileData);
    res.status(200).json(user);
  } catch (error) {
    console.error("Error updating profile:", error);
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

/**
 * Handles fetching a user's profile by ID.
 * @param {Object} req - The request object containing the user ID in req.params.
 * @param {Object} res - The response object for sending responses.
 */
const getProfile = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await UserService.getUserProfile(userId);
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

module.exports = {
  register,
  login,
  updateProfile,
  getProfile,
};
