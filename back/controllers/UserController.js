const UserService = require("../services/UserService");
const errorGenerator = require("../utils/errorGenerator");

/**
 * Handles user registration.
 * @param {Object} req - The request object containing user data in req.body.
 * @param {Object} res - The response object for sending responses.
 */
const register = async (req, res) => {
  const {
    name,
    openchatName,
    businessName,
    email,
    password,
    phoneNumber,
    cityId,
    role,
  } = req.body;
  const profileImage = req.file;
  console.log("Request body to UserController.register:", req.body);
  console.log("Uploaded file:", profileImage);

  try {
    const user = await UserService.registerUser(
      name,
      openchatName,
      businessName,
      email,
      password,
      phoneNumber,
      cityId,
      role,
      profileImage
    );
    console.log("New user created by UserController.register:", user);
    res.status(201).json(user);
  } catch (error) {
    console.log("Error in UserController.register:", error);
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
  console.log("Request body to UserController.login:", req.body);
  console.log("Login attempt with email:", email);

  try {
    const { user, token } = await UserService.authenticateUser(email, password);
    console.log("User authenticated by UserController.login:", user);
    console.log(`User authenticated: ${user.id}, Token issued: ${token}`);
    res.status(200).json({ user, token });
  } catch (error) {
    const err = await errorGenerator({
      statusCode: error.statusCode || 500,
      message: error.message || "Error logging in",
    });
    console.error("Login failed:", err.message);
    res.status(err.statusCode).json({ message: err.message });
  }
};

/**
 * Handles updating a user's profile image.
 * @param {Object} req - The request object containing the profile image file in req.file.
 * @param {Object} res - The response object for sending responses.
 */
const updateProfileImage = async (req, res) => {
  const { userId } = req.params;
  console.log(
    "Request params to UserController.updateProfileImage:",
    req.params
  );
  const profileImage = req.file;
  console.log("Uploaded file:", profileImage);

  try {
    if (!profileImage) {
      throw new Error("Profile image is required");
    }

    const user = await UserService.updateUserProfileImage(userId, profileImage);
    console.log(
      "User profile image updated by UserController.updateProfileImage:",
      user
    );
    res.status(200).json(user);
  } catch (error) {
    console.log("Error in UserController.updateProfileImage:", error);
    const err = await errorGenerator({
      statusCode: error.statusCode || 500,
      message: error.message || "Error updating profile image",
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
    console.log("Error in UserController.getAllUsers:", error);
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
  console.log("Request params to UserController.getProfile:", req.params);

  try {
    const user = await UserService.getUserProfile(userId);
    console.log("User profile fetched by UserController.getProfile:", user);
    if (!user) {
      const err = await errorGenerator({
        statusCode: 404,
        message: "User not found",
      });
      return res.status(err.statusCode).json({ message: err.message });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log("Error in UserController.getProfile:", error);
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
  console.log("Request params to UserController.updateProfile:", req.params);
  const profileData = req.body;
  console.log("Request body to UserController.updateProfile:", req.body);

  try {
    const user = await UserService.updateUserProfile(userId, profileData);
    console.log("User profile updated by UserController.updateProfile:", user);
    res.status(200).json(user);
  } catch (error) {
    console.log("Error in UserController.updateProfile:", error);
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
  console.log("Request params to UserController.updateLocation:", req.params);
  const { cityId } = req.body;
  console.log("Request body to UserController.updateLocation:", req.body);

  try {
    const user = await UserService.updateUserLocation(userId, cityId);
    console.log(
      "User location updated by UserController.updateLocation:",
      user
    );
    res.status(200).json(user);
  } catch (error) {
    console.log("Error in UserController.updateLocation:", error);
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
  console.log(
    "Request params to UserController.updatePreferences:",
    req.params
  );
  const { minorCategoryIds } = req.body;
  console.log("Request body to UserController.updatePreferences:", req.body);

  try {
    const preferences = await UserService.updateUserPreferences(
      userId,
      minorCategoryIds
    );
    console.log(
      "User preferences updated by UserController.updatePreferences:",
      preferences
    );
    res.status(200).json(preferences);
  } catch (error) {
    console.log("Error in UserController.updatePreferences:", error);
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
  console.log("Request params to UserController.softDeleteUser:", req.params);

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
    console.log("Error in UserController.softDeleteUser:", error);
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
  updateProfileImage,
  getAllUsers,
  getProfile,
  updateProfile,
  updateLocation,
  updatePreferences,
  softDeleteUser,
};
