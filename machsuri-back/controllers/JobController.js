const jobService = require("../services/JobService");
const errorGenerator = require("../utils/errorGenerator");

/**
 * Controller to handle the creation of a new job posting.
 * Validates required inputs and uses the job management service to create the job.
 *
 * @param {Object} req - The HTTP request object, containing job details in req.body.
 * @param {Object} res - The HTTP response object used to send responses.
 */
exports.postJob = async (req, res) => {
  const {
    userId,
    title,
    summary,
    locationId,
    requiredSkillsId,
    categoryId,
    fee,
    contactInfo,
  } = req.body;

  // Validate that all necessary fields are provided
  if (
    !title ||
    !summary ||
    !locationId ||
    !requiredSkillsId ||
    !categoryId ||
    !fee ||
    !contactInfo
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Call service to create job and send successful response
    const newJob = await jobService.postJob(
      userId,
      title,
      summary,
      locationId,
      requiredSkillsId,
      categoryId,
      fee,
      contactInfo
    );
    res.status(201).json(newJob);
  } catch (error) {
    // Log error and send error response
    console.error("Error posting job:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Controller to retrieve job postings based on provided filters.
 * Filters are passed via query parameters.
 *
 * @param {Object} req - The HTTP request object, containing filters in req.query.
 * @param {Object} res - The HTTP response object used to send responses.
 */
exports.getJobs = async (req, res) => {
  try {
    // Retrieve jobs using filters and send them
    const jobs = await jobService.getJobs(req.query);
    if (jobs.length === 0) {
      return res.status(404).json({ message: "No jobs found" });
    }
    res.json(jobs);
  } catch (error) {
    // Log error and send error response
    console.error("Error retrieving jobs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Controller to update a specific job posting.
 * Job ID is provided as a URL parameter and updated data in the request body.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object used to send responses.
 */
exports.updateJob = async (req, res) => {
  const { jobId } = req.params;
  const jobData = req.body;

  try {
    // Update job and return the updated record
    const updatedJob = await jobService.updateJob(jobId, jobData);
    res.json(updatedJob);
  } catch (error) {
    // Log error and conditionally send response based on error type
    console.error("Error updating job:", error);
    if (error.statusCode === 404) {
      res.status(404).json({ message: "Job not found" });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

/**
 * Controller to delete a job posting.
 * Job ID is provided as a URL parameter.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object used to send responses.
 */
exports.deleteJob = async (req, res) => {
  const { jobId } = req.params;

  try {
    // Delete job and confirm deletion
    const result = await jobService.deleteJob(jobId);
    if (result) {
      res.status(200).json({ message: "Job successfully deleted" });
    } else {
      res.status(404).json({ message: "Job not found" });
    }
  } catch (error) {
    // Log error and send error response
    console.error("Error deleting job:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
