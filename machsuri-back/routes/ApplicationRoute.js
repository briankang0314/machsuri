const express = require("express");
const router = express.Router();
const ApplicationController = require("../controllers/ApplicationController");
const userValidateToken = require("../middleware/userValidateToken");

// Route to submit a new application
// Requires user authentication
router.post(
  "/applications",
  userValidateToken,
  ApplicationController.submitApplication
);

// Route to get all applications for a user
// Requires user authentication
router.get(
  "/applications",
  userValidateToken,
  ApplicationController.getApplications
);

// Route to update an existing application
// Requires user authentication and should likely ensure that only the applicant or a privileged user can update the application
router.put(
  "/applications/:applicationId",
  userValidateToken,
  ApplicationController.updateApplication
);

// Route to delete an application
// Requires user authentication and should ensure that only the applicant or a privileged user can delete the application
router.delete(
  "/applications/:applicationId",
  userValidateToken,
  ApplicationController.deleteApplication
);

module.exports = router;
