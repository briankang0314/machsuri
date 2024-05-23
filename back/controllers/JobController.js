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
  const { cityId, title, summary, fee, contactInfo, minorCategoryIds, images } =
    req.body;
  const userId = req.user.id;
  console.log("Input parameters to JobController.postJob:", {
    userId,
    cityId,
    title,
    summary,
    fee,
    contactInfo,
    minorCategoryIds,
    images,
  });

  if (
    !userId ||
    !cityId ||
    !title ||
    !summary ||
    !fee ||
    !contactInfo ||
    !Array.isArray(minorCategoryIds) ||
    minorCategoryIds.length === 0
  ) {
    const error = await errorGenerator({
      statusCode: 400,
      message: "All fields are required",
    });
    return res.status(error.statusCode).json({ message: error.message });
  }

  try {
    const newJob = await jobService.postJob(
      userId,
      cityId,
      title,
      summary,
      fee,
      contactInfo,
      minorCategoryIds,
      images
    );
    console.log("Job created by JobController.postJob:", newJob);
    res.status(201).json(newJob);
  } catch (error) {
    console.error("Failed to create job:", error);
    const err = await errorGenerator({
      statusCode: error.statusCode || 500,
      message: error.message || "Internal server error",
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
const findJobs = async (req, res) => {
  const { sortBy, sortOrder, ...filter } = req.query;
  console.log("Input parameters to JobController.findJobs:", {
    filter,
    sortBy,
    sortOrder,
  });

  try {
    // Retrieve jobs using filters and send them
    const jobs = await jobService.getJobs(filter, sortBy, sortOrder);
    // console.log("Jobs retrieved by JobController.findJobs:", jobs);
    if (jobs.length === 0) {
      const error = await errorGenerator({
        statusCode: 404,
        message: "No jobs found matching the specified criteria",
      });
      return res.status(error.statusCode).json({ message: error.message });
    }
    res.json(jobs);
  } catch (error) {
    // Log error and send error response, adjusting to handle specific messages from service
    console.log("Error in JobController.findJobs:", error);
    console.error("Error retrieving jobs:", error);
    const err = await errorGenerator({
      statusCode: error.statusCode || 500,
      message: error.message || "Internal server error",
    });
    res.status(err.statusCode).json({ message: err.message });
  }
};

const findJobById = async (req, res) => {
  const { jobId } = req.params;
  console.log("Input parameters to JobController.findJobById:", { jobId });

  try {
    const job = await jobService.findJobById(jobId);
    if (!job) {
      const error = await errorGenerator({
        statusCode: 404,
        message: "Job not found",
      });
      return res.status(error.statusCode).json({ message: error.message });
    }
    res.json(job);
  } catch (error) {
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
  console.log("Input parameters to JobController.updateJob:", {
    jobId,
    jobData,
  });

  try {
    // Update job and return the updated record
    const updatedJob = await jobService.updateJob(jobId, jobData);
    console.log("Job updated by JobController.updateJob:", updatedJob);
    res.json(updatedJob);
  } catch (error) {
    // Log error and conditionally send response based on error type
    console.log("Error in JobController.updateJob:", error);
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
  console.log("Input parameters to JobController.deleteJob:", { jobId });

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
    console.log("Error in JobController.deleteJob:", error);
    const err = await errorGenerator({
      statusCode: 500,
      message: "Internal server error",
    });
    res.status(err.statusCode).json({ message: err.message });
  }
};

/**
 * Controller to update the status of a job posting.
 * Job ID is provided as a URL parameter and the new status in the request body.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object used to send responses.
 */
const updateJobStatus = async (req, res) => {
  const { jobId } = req.params;
  const { status } = req.body;
  console.log("Input parameters to JobController.updateJobStatus:", {
    jobId,
    status,
  });

  try {
    // Update job status and return the updated record
    const updatedJob = await jobService.updateJobStatus(jobId, status);
    res.json(updatedJob);
  } catch (error) {
    // Log error and conditionally send response based on error type
    console.log("Error in JobController.updateJobStatus:", error);
    const err = await errorGenerator({
      statusCode: error.statusCode || 500,
      message: error.message || "Internal server error",
    });
    res.status(err.statusCode).json({ message: err.message });
  }
};

/**
 * Controller to update the location of a job posting.
 * Job ID is provided as a URL parameter and the new city ID in the request body.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object used to send responses.
 */
const updateJobLocation = async (req, res) => {
  const { jobId } = req.params;
  const { cityId } = req.body;
  console.log("Input parameters to JobController.updateJobLocation:", {
    jobId,
    cityId,
  });

  try {
    // Update job location and return the updated record
    const updatedJob = await jobService.updateJobLocation(jobId, cityId);
    console.log(
      "Job location updated by JobController.updateJobLocation:",
      updatedJob
    );
    res.json(updatedJob);
  } catch (error) {
    // Log error and conditionally send response based on error type
    console.log("Error in JobController.updateJobLocation:", error);
    const err = await errorGenerator({
      statusCode: error.statusCode || 500,
      message: error.message || "Internal server error",
    });
    res.status(err.statusCode).json({ message: err.message });
  }
};

/**
 * Controller to soft delete a job posting.
 * Job ID is provided as a URL parameter.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object used to send responses.
 */
const softDeleteJob = async (req, res) => {
  const { jobId } = req.params;
  console.log("Input parameters to JobController.softDeleteJob:", { jobId });

  try {
    // Soft delete job and return the updated record
    const updatedJob = await jobService.softDeleteJob(jobId);
    console.log("Job soft deleted by JobController.softDeleteJob:", updatedJob);
    res.json(updatedJob);
  } catch (error) {
    // Log error and conditionally send response based on error type
    console.log("Error in JobController.softDeleteJob:", error);
    const err = await errorGenerator({
      statusCode: error.statusCode || 500,
      message: error.message || "Internal server error",
    });
    res.status(err.statusCode).json({ message: err.message });
  }
};

module.exports = {
  postJob,
  findJobs,
  findJobById,
  updateJob,
  updateJobStatus,
  updateJobLocation,
  softDeleteJob,
  deleteJob,
};
