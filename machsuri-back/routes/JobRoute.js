const express = require("express");
const router = express.Router();
const JobController = require("../controllers/JobController");
const userValidateToken = require("../middleware/userValidateToken");

// Route to post a new job.
// Uses the userValidateToken middleware to ensure the user is authenticated as an user.
router.post("/jobs", userValidateToken, JobController.postJob);

// Route to retrieve job postings with optional filters.
// Open to all users without authentication.
router.get("/jobs", JobController.getJobs);

// Route to update an existing job posting.
// Uses the userValidateToken middleware to ensure only the job poster can update the job.
router.put("/jobs/:jobId", userValidateToken, JobController.updateJob);

// Route to delete a job posting.
// Uses the userValidateToken middleware to ensure only the job poster can delete the job.
router.delete("/jobs/:jobId", userValidateToken, JobController.deleteJob);

module.exports = router;
