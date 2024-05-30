const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const userValidateToken = require("../middleware/userValidateToken");
const roleCheck = require("../middleware/roleCheck");
const verifyUserIdentity = require("../middleware/verifyUserIdentity");
const multer = require("multer");
const AWS = require("aws-sdk");

// Configure AWS SDK
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION_S3,
});

// Set up multer for in-memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Function to upload file to S3
const uploadFile = (file) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: `profile_pictures/${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };
  return s3.upload(params).promise();
};

// Route to register a new user
// Open to all users without authentication.
router.post(
  "/register",
  upload.single("profileImage"),
  async (req, res, next) => {
    try {
      if (req.file) {
        const result = await uploadFile(req.file);
        req.body.profileImageUrl = result.Location; // Attach the URL of the uploaded image to the request body
      }
      next();
    } catch (error) {
      console.error("Error uploading profile image to S3:", error);
      res.status(500).send("Error uploading profile image");
    }
  },
  UserController.register
);

// Route to log in a user
// Open to all users without authentication.
router.post("/login", UserController.login);

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
  verifyUserIdentity,
  UserController.updateLocation
);

// Route to update a user's preferences
// Uses the userValidateToken middleware to ensure the user is authenticated as an user.
router.put(
  "/:userId/preferences",
  userValidateToken,
  verifyUserIdentity,
  UserController.updatePreferences
);

// Route to update a user's profile image
router.put(
  "/profile/:userId/image",
  userValidateToken,
  verifyUserIdentity,
  upload.single("profileImage"),
  UserController.updateProfileImage
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
