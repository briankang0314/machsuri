const jobService = require("../services/JobService");
const errorGenerator = require("../utils/errorGenerator");

/**
 * Controller to handle the creation of a new job posting.
 * Validates required inputs and uses the job management service to create the job.
 *
 * @param {Object} req - The HTTP request object, containing job details in req.body.
 * @param {Object} res - The HTTP response object used to send responses.
 */
const postJob = async (req, res) => {
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
    const error = await errorGenerator({
      statusCode: 400,
      message: "All fields are required",
    });
    return res.status(error.statusCode).json({ message: error.message });
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
    const err = await errorGenerator({
      statusCode: 500,
      message: "Internal server error",
    });
    res.status(err.statusCode).json({ message: err.message });
  }
};

/**
 * Controller to retrieve job postings based on provided filters.
 * Filters are passed via query parameters.
 *
 * @param {Object} req - The HTTP request object, containing filters in req.query.
 * @param {Object} res - The HTTP response object used to send responses.
 */
const getJobs = async (req, res) => {
  try {
    // Retrieve jobs using filters and send them
    const jobs = await jobService.getJobs(req.query);
    if (jobs.length === 0) {
      const error = await errorGenerator({
        statusCode: 404,
        message: "No jobs found",
      });
      return res.status(error.statusCode).json({ message: error.message });
    }
    res.json(jobs);
  } catch (error) {
    // Log error and send error response
    const err = await errorGenerator({
      statusCode: 500,
      message: "Internal server error",
    });
    res.status(err.statusCode).json({ message: err.message });
  }
};

/**
 * Controller to update a specific job posting.
 * Job ID is provided as a URL parameter and updated data in the request body.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object used to send responses.
 */
const updateJob = async (req, res) => {
  const { jobId } = req.params;
  const jobData = req.body;

  try {
    // Update job and return the updated record
    const updatedJob = await jobService.updateJob(jobId, jobData);
    res.json(updatedJob);
  } catch (error) {
    // Log error and conditionally send response based on error type
    const err = await errorGenerator({
      statusCode: error.statusCode || 500,
      message: error.message || "Internal server error",
    });
    res.status(err.statusCode).json({ message: err.message });
  }
};

/**
 * Controller to delete a job posting.
 * Job ID is provided as a URL parameter.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object used to send responses.
 */
const deleteJob = async (req, res) => {
  const { jobId } = req.params;

  try {
    // Delete job and confirm deletion
    const result = await jobService.deleteJob(jobId);
    if (result) {
      res.status(200).json({ message: "Job successfully deleted" });
    } else {
      const error = await errorGenerator({
        statusCode: 404,
        message: "Job not found",
      });
      res.status(error.statusCode).json({ message: error.message });
    }
  } catch (error) {
    // Log error and send error response
    const err = await errorGenerator({
      statusCode: 500,
      message: "Internal server error",
    });
    res.status(err.statusCode).json({ message: err.message });
  }
};

module.exports = {
  postJob,
  getJobs,
  updateJob,
  deleteJob,
};
