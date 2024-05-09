const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const userValidateToken = require("../middleware/userValidateToken");

// Route to register a new user
// Open to all users without authentication.
router.post("/register", UserController.register);

// Route to log in a user
// Open to all users without authentication.
router.post("/login", UserController.login);

// Route to retrieve all users
// Uses the userValidateToken middleware to ensure the user is authenticated as an user.
router.get("/", UserController.getAllUsers);

// Route to retrieve a user's profile
// Uses the userValidateToken middleware to ensure the user is authenticated as an user.
router.get("/profile/:userId", userValidateToken, UserController.getProfile);

// Route to update a user's profile
// Uses the userValidateToken middleware to ensure the user is authenticated as an user.
router.put("/profile/:userId", userValidateToken, UserController.updateProfile);

// Route to update a user's location
// Uses the userValidateToken middleware to ensure the user is authenticated as an user.
router.put(
  "/:userId/location",
  userValidateToken,
  UserController.updateLocation
);

// Route to update a user's preferences
// Uses the userValidateToken middleware to ensure the user is authenticated as an user.
router.put(
  "/:userId/preferences",
  userValidateToken,
  UserController.updatePreferences
);

// Route to soft delete a user
// Uses the userValidateToken middleware to ensure the user is authenticated as an user.
router.delete("/:userId", userValidateToken, UserController.softDeleteUser);

module.exports = router;
