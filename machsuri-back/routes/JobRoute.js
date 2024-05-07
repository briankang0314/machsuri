const express = require("express");
const router = express.Router();
const JobController = require("../controllers/JobController");
const userValidateToken = require("../middleware/userValidateToken");

// Route to post a new job.
// Uses the userValidateToken middleware to ensure the user is authenticated as an user.
router.post("/", userValidateToken, JobController.postJob);

// Route to retrieve job postings with optional filters.
// Open to all users without authentication.
router.get("/", JobController.findJobs);

// Route to update an existing job posting.
// Uses the userValidateToken middleware to ensure only the job poster can update the job.
router.put("/:jobId", userValidateToken, JobController.updateJob);

// Route to update the status of a job posting.
// Uses the userValidateToken middleware to ensure only the job poster can update the job status.
router.put("/:jobId/status", userValidateToken, JobController.updateJobStatus);

// Route to update the location of a job posting.
// Uses the userValidateToken middleware to ensure only the job poster can update the job location.
router.put(
  "/:jobId/location",
  userValidateToken,
  JobController.updateJobLocation
);

// Route to soft delete a job posting.
// Uses the userValidateToken middleware to ensure only the job poster can soft delete the job.
router.put("/:jobId/delete", userValidateToken, JobController.softDeleteJob);

// Route to delete a job posting.
// Uses the userValidateToken middleware to ensure only the job poster can delete the job.
router.delete("/:jobId", userValidateToken, JobController.deleteJob);

module.exports = router;
