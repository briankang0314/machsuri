const express = require("express");
const router = express.Router();
const JobController = require("../controllers/JobController");
const userValidateToken = require("../middleware/userValidateToken");
const roleCheck = require("../middleware/roleCheck");
const verifyJobPoster = require("../middleware/verifyJobPoster");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// Route to post a new job.
router.post(
  "/",
  userValidateToken,
  roleCheck(["general", "admin"]),
  upload.array("images", 5),
  JobController.postJob
);

// Route to retrieve job postings with optional filters.
// Open to all users without authentication.
router.get("/all", JobController.findJobs);

// Route to retrieve a job posting by its ID.
// Open to all users without authentication.
router.get("/:jobId", JobController.findJobById);

// Route to update an existing job posting.
router.put(
  "/:jobId",
  userValidateToken,
  verifyJobPoster,
  JobController.updateJob
);

// Route to update the status of a job posting.
router.put(
  "/:jobId/status",
  userValidateToken,
  verifyJobPoster,
  JobController.updateJobStatus
);

// Route to update the location of a job posting.
router.put(
  "/:jobId/location",
  userValidateToken,
  verifyJobPoster,
  JobController.updateJobLocation
);

// Route to soft delete a job posting.
router.put(
  "/:jobId/delete",
  userValidateToken,
  verifyJobPoster,
  JobController.softDeleteJob
);

// Route to delete a job posting.
router.delete(
  "/:jobId",
  userValidateToken,
  verifyJobPoster,
  JobController.deleteJob
);

router.post(
  "/:jobId/images",
  userValidateToken,
  verifyJobPoster,
  upload.array("images", 5),
  JobController.addJobImages
);

router.get(
  "/:jobId/images",
  userValidateToken,
  verifyJobPoster,
  JobController.getJobImages
);
router.delete(
  "/:jobId/images",
  userValidateToken,
  verifyJobPoster,
  JobController.deleteJobImages
);

module.exports = router;
