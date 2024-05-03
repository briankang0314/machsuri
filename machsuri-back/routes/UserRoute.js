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

// Route to update a user's profile
// Uses the userValidateToken middleware to ensure the user is authenticated as an user.
router.put("/profile/:userId", userValidateToken, UserController.updateProfile);

// Route to retrieve a user's profile
// Uses the userValidateToken middleware to ensure the user is authenticated as an user.
router.get("/profile/:userId", userValidateToken, UserController.getProfile);

module.exports = router;
