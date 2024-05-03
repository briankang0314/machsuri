const UserDao = require("../models/UserDao");
const errorGenerator = require("../utils/errorGenerator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Function to register a new user
const registerUser = async (name, email, password, phoneNumber) => {
  // Regular expressions for input validation
  const emailReg =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  const pwReg = /(?=.*\d)(?=.*[a-zA-ZS]).{8,}/;
  const phoneReg = /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/;

  // Validate name, email, and password
  if (!name || !emailReg.test(email) || !pwReg.test(password)) {
    throw errorGenerator({ statusCode: 400, message: "Invalid input format" });
  }
  if (password.length < 8) {
    throw errorGenerator({ statusCode: 400, message: "Password too short" });
  }

  // Validate phone number if provided
  if (phoneNumber && !phoneReg.test(phoneNumber)) {
    throw errorGenerator({ statusCode: 400, message: "Invalid phone number" });
  }

  // Check if the user already exists
  const existingUser = await UserDao.getUserByEmail(email);
  if (existingUser) {
    throw errorGenerator({ statusCode: 409, message: "User already exists" });
  }

  // Hash the password
  const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync());
  const newUser = await UserDao.createUser(
    name,
    email,
    hashedPassword,
    phoneNumber
  );

  return newUser;
};

// Function to authenticate a user and generate a JWT
const authenticateUser = async (email, password) => {
  // Validate input
  if (!email || !password) {
    throw errorGenerator({
      statusCode: 400,
      message: "Missing required fields",
    });
  }

  const user = await UserDao.getUserByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw errorGenerator({
      statusCode: 401,
      message: "Invalid email or password",
    });
  }

  // Generate a JWT token
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1h" }
  );

  return { user, token };
};

// Function to update a user's profile information
const updateUserProfile = async (userId, profileData) => {
  // Validate input
  if (!userId || !profileData) {
    throw errorGenerator({
      statusCode: 400,
      message: "Missing required fields",
    });
  }

  const updatedUser = await UserDao.updateUserProfile(userId, profileData);
  if (!updatedUser) {
    throw errorGenerator({ statusCode: 404, message: "User not found" });
  }

  return updatedUser;
};

// Function to fetch a user's profile by their ID
const getUserProfile = async (userId) => {
  // Validate input
  if (!userId) {
    throw errorGenerator({
      statusCode: 400,
      message: "Missing required fields",
    });
  }

  const user = await UserDao.getUserById(userId);
  if (!user) {
    throw errorGenerator({ statusCode: 404, message: "User not found" });
  }

  return user;
};

// Export the service functions to be used by other parts of the application
module.exports = {
  registerUser,
  authenticateUser,
  updateUserProfile,
  getUserProfile,
};
