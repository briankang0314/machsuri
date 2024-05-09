const UserService = require("../services/UserService");
const errorGenerator = require("../utils/errorGenerator");

/**
 * Handles user registration.
 * @param {Object} req - The request object containing user data in req.body.
 * @param {Object} res - The response object for sending responses.
 */
const register = async (req, res) => {
  const { name, email, password, phoneNumber, cityId } = req.body;

  try {
    const user = await UserService.registerUser(
      name,
      email,
      password,
      phoneNumber,
      cityId
    );
    res.status(201).json(user);
  } catch (error) {
    const err = await errorGenerator({
      statusCode: error.statusCode || 500,
      message: error.message || "Error registering user",
    });
    res.status(err.statusCode).json({ message: err.message });
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
    const err = await errorGenerator({
      statusCode: error.statusCode || 500,
      message: error.message || "Error logging in",
    });
    res.status(err.statusCode).json({ message: err.message });
  }
};

/**
 * Handles fetching all users.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object for sending responses.
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await UserService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    const err = await errorGenerator({
      statusCode: error.statusCode || 500,
      message: error.message || "Error fetching users",
    });
    res.status(err.statusCode).json({ message: err.message });
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
    if (!user) {
      const err = await errorGenerator({
        statusCode: 404,
        message: "User not found",
      });
      return res.status(err.statusCode).json({ message: err.message });
    }
    res.status(200).json(user);
  } catch (error) {
    const err = await errorGenerator({
      statusCode: error.statusCode || 500,
      message: error.message || "Error fetching profile",
    });
    res.status(err.statusCode).json({ message: err.message });
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
    const err = await errorGenerator({
      statusCode: error.statusCode || 500,
      message: error.message || "Error updating profile",
    });
    res.status(err.statusCode).json({ message: err.message });
  }
};

/**
 * Handles updating a user's location.
 * @param {Object} req - The request object containing the user ID and city ID in req.body.
 * @param {Object} res - The response object for sending responses.
 */
const updateLocation = async (req, res) => {
  const { userId } = req.params;
  const { cityId } = req.body;

  try {
    const user = await UserService.updateUserLocation(userId, cityId);
    res.status(200).json(user);
  } catch (error) {
    const err = await errorGenerator({
      statusCode: error.statusCode || 500,
      message: error.message || "Error updating location",
    });
    res.status(err.statusCode).json({ message: err.message });
  }
};

/**
 * Handles updating a user's preferences.
 * @param {Object} req - The request object containing the user ID and new preferences in req.body.
 * @param {Object} res - The response object for sending responses.
 */
const updatePreferences = async (req, res) => {
  const { userId } = req.params;
  const { minorCategoryIds } = req.body;

  try {
    const preferences = await UserService.updateUserPreferences(
      userId,
      minorCategoryIds
    );
    res.status(200).json(preferences);
  } catch (error) {
    const err = await errorGenerator({
      statusCode: error.statusCode || 500,
      message: error.message || "Error updating preferences",
    });
    res.status(err.statusCode).json({ message: err.message });
  }
};

/**
 * Handles soft deleting a user.
 * @param {Object} req - The request object containing the user ID in req.params.
 * @param {Object} res - The response object for sending responses.
 */
const softDeleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const deletedUser = await UserService.softDeleteUser(userId);
    if (!deletedUser) {
      const err = await errorGenerator({
        statusCode: 404,
        message: "User not found",
      });
      return res.status(err.statusCode).json({ message: err.message });
    }
    res.status(204).send();
  } catch (error) {
    const err = await errorGenerator({
      statusCode: error.statusCode || 500,
      message: error.message || "Error soft deleting user",
    });
    res.status(err.statusCode).json({ message: err.message });
  }
};

module.exports = {
  register,
  login,
  getAllUsers,
  getProfile,
  updateProfile,
  updateLocation,
  updatePreferences,
  softDeleteUser,
};
