const express = require("express");
const router = express.Router();
const ApplicationController = require("../controllers/ApplicationController");
const userValidateToken = require("../middleware/userValidateToken");
const verifyApplicantOrAdmin = require("../middleware/verifyApplicant");

// Route to submit a new application
// Requires user authentication
router.post("/", userValidateToken, ApplicationController.submitApplication);

// Route to get all applications for a user
// Requires user authentication
router.get("/", userValidateToken, ApplicationController.findApplications);

// Route to update an existing application
// Requires user authentication and checks if the user is the applicant or an admin
router.put(
  "/:applicationId",
  userValidateToken,
  verifyApplicantOrAdmin, // Additional middleware for authorization
  ApplicationController.updateApplication
);

// Route to delete an application
// Requires user authentication and checks if the user is the applicant or an admin
router.delete(
  "/:applicationId",
  userValidateToken,
  verifyApplicantOrAdmin, // Additional middleware for authorization
  ApplicationController.deleteApplication
);

module.exports = router;
