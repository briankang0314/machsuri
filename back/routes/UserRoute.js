const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const userValidateToken = require("../middleware/userValidateToken");
const roleCheck = require("../middleware/roleCheck");
const verifyUserIdentity = require("../middleware/verifyUserIdentity");

// Route to register a new user
// Open to all users without authentication.
router.post("/register", UserController.register);

// Route to log in a user
// Open to all users without authentication.
router.post("/login", UserController.login);

// Route to refresh a user's token
// Open to all users without authentication.
router.post("/refresh-token", UserController.refreshToken);

// Route to retrieve all users
// Uses the userValidateToken middleware to ensure the user is authenticated as an user.
router.get(
  "/all",
  userValidateToken,
  roleCheck(["admin"]),
  UserController.getAllUsers
);

// Route to retrieve a user's profile
// Uses the userValidateToken middleware to ensure the user is authenticated as an user.
router.get(
  "/profile/:userId",
  userValidateToken,
  verifyUserIdentity,
  UserController.getProfile
);

// Route to update a user's profile
// Uses the userValidateToken middleware to ensure the user is authenticated as an user.
router.put(
  "/profile/:userId",
  userValidateToken,
  verifyUserIdentity,
  UserController.updateProfile
);

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
router.delete(
  "/:userId",
  userValidateToken,
  verifyUserIdentity,
  roleCheck(["admin", "user"]),
  UserController.softDeleteUser
);

module.exports = router;
