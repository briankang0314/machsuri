const JobDao = require("../models/JobDao");

/**
 * Posts a new job with the provided details and links it to selected minor categories.
 * Throws an error if any required fields are missing or if there's a database error.
 * @param {number} userId - The ID of the user posting the job.
 * @param {number} cityId - The ID of the city where the job is located.
 * @param {string} title - The title of the job post.
 * @param {string} summary - A brief description of the job.
 * @param {number} fee - The fee or payment amount for the job.
 * @param {string} contactInfo - Contact information for the job post.
 * @param {Array} minorCategoryIds - An array of minor category IDs linked to the job.
 * @returns {Object} The newly created job post with category links.
 */
const postJob = async (
  userId,
  cityId,
  title,
  summary,
  fee,
  contactInfo,
  minorCategoryIds
) => {
  console.log("Input parameters to JobService.postJob:", {
    userId,
    cityId,
    title,
    summary,
    fee,
    contactInfo,
    minorCategoryIds,
  });

  // Validate input to ensure no essential details are missing.
  if (
    !userId ||
    !cityId ||
    !title ||
    !summary ||
    fee === undefined ||
    !contactInfo ||
    !Array.isArray(minorCategoryIds) ||
    minorCategoryIds.length === 0
  ) {
    throw new Error("Required fields missing or invalid minor category IDs");
  }

  // Calls the JobDao to create a job in the database with the provided details.
  try {
    const newJob = await JobDao.createJob({
      userId,
      cityId,
      title,
      summary,
      fee,
      contactInfo,
      minorCategoryIds,
    });

    console.log("Job created by JobService.postJob:", newJob);

    // Return the newly created job object.
    return newJob;
  } catch (error) {
    console.log("Error in JobService.postJob:", error);
    console.error("Service Error: Failed to post job:", error);
    throw new Error("Failed to create job: " + error.message);
  }
};

/**
 * Retrieves jobs based on a filtering criteria, including sorting options.
 * Can throw an error if no jobs are found matching the filter or if there's a database error.
 * @param {Object} filter - The filtering criteria for retrieving jobs.
 * @param {string} sortBy - The field to sort the jobs by (defaults to "createdAt").
 * @param {string} sortOrder - The order of the sort: "asc" for ascending, "desc" for descending (defaults to "desc").
 * @returns {Array} An array of job posts that match the filter.
 */
const getJobs = async (filter, sortBy = "created_at", sortOrder = "desc") => {
  console.log("Filter parameters to JobService.getJobs:", {
    filter,
    sortBy,
    sortOrder,
  });
  try {
    // Uses the JobDao to fetch jobs that match the provided filter criteria.
    const jobs = await JobDao.getJobs(filter, sortBy, sortOrder);
    if (jobs.length === 0) {
      throw new Error("No jobs found matching the specified criteria");
    }
    // console.log("Jobs retrieved by JobService.getJobs:", jobs);
    // Returns a list of jobs that match the filter.
    return jobs;
  } catch (error) {
    console.log("Error in JobService.getJobs:", error);
    console.error("Error retrieving jobs:", error.message);
    throw new Error("Failed to retrieve jobs: " + error.message);
  }
};

/**
 * Retrieves a job post from the database based on its ID.
 * Throws an error if the job is not found or if there's a database error.
 * @param {number} jobId - The ID of the job post to retrieve.
 * @returns {Object} The job post object.
 * @throws Will throw an error if the job is not found or the database operation fails.
 */
const findJobById = async (jobId) => {
  console.log("Input parameters to JobService.findJobById:", jobId);
  try {
    // Calls the JobDao to fetch a specific job post based on its ID.
    const job = await JobDao.getJobById(jobId);
    if (!job) {
      throw new Error("Job not found");
    }
    console.log("Job retrieved by JobService.findJobById:", job);
    return job;
  } catch (error) {
    console.log("Error in JobService.findJobById:", error);
    console.error("Service Error: Failed to find job by ID:", error.message);
    throw new Error("Failed to find job by ID: " + error.message);
  }
};

/**
 * Updates an existing job post with new data.
 * Throws an error if the job is not found or if there's a database error.
 * @param {number} jobId - The ID of the job post to update.
 * @param {Object} jobData - The new data to update the job with.
 * @returns {Object} The updated job post object.
 */
const updateJob = async (jobId, jobData) => {
  console.log("Input parameters to JobService.updateJob:", {
    jobId,
    jobData,
  });
  // Calls the JobDao to update the specified job with new data.
  const updatedJob = await JobDao.updateJob(jobId, jobData);
  if (!updatedJob) {
    throw new Error("Job not found");
  }
  console.log("Job updated by JobService.updateJob:", updatedJob);
  // Returns the updated job object.
  return updatedJob;
};

/**
 * Updates the status of a job post in the database.
 * Throws an error if the job is not found or if there's a database error.
 * @param {number} jobId - The ID of the job post to update.
 * @param {string} status - The new status to update the job with.
 * @returns {Object} The updated job post object.
 */
const updateJobStatus = async (jobId, status) => {
  console.log("Input parameters to JobService.updateJobStatus:", {
    jobId,
    status,
  });
  try {
    // Optionally add logic here to validate status, check job existence, etc.
    const updatedJob = await JobDao.updateJobStatus(jobId, status);
    console.log(
      "Job status updated by JobService.updateJobStatus:",
      updatedJob
    );
    return updatedJob;
  } catch (error) {
    console.log("Error in JobService.updateJobStatus:", error);
    console.error("Service Error: Failed to update job status:", error);
    throw new Error("Could not update job status. Please try again later.");
  }
};

/**
 * Updates the location of a job post in the database.
 * Throws an error if the job is not found or if there's a database error.
 * @param {number} jobId - The ID of the job post to update.
 * @param {number} cityId - The new city ID to update the job with.
 * @returns {Object} The updated job post object.
 */
const updateJobLocation = async (jobId, cityId) => {
  console.log("Input parameters to JobService.updateJobLocation:", {
    jobId,
    cityId,
  });
  try {
    // Optionally add logic here to check job existence or permissions
    const updatedJob = await JobDao.updateJobLocation(jobId, cityId);
    console.log(
      "Job location updated by JobService.updateJobLocation:",
      updatedJob
    );
    return updatedJob;
  } catch (error) {
    console.log("Error in JobService.updateJobLocation:", error);
    console.error("Service Error: Failed to update job location:", error);
    throw new Error("Could not update job location. Please try again later.");
  }
};

/**
 * Deletes a job post from the database.
 * Throws an error if the job is not found or if there's a database error.
 * @param {number} jobId - The ID of the job post to delete.
 * @returns {Object} A confirmation message on successful deletion.
 */
const deleteJob = async (jobId) => {
  console.log("Input parameters to JobService.deleteJob:", jobId);
  // Calls the JobDao to delete the job identified by jobId.
  const result = await JobDao.deleteJob(jobId);
  if (!result) {
    throw new Error("Job not found");
  }
  // Returns a confirmation message on successful deletion.
  return { message: "Job deleted successfully" };
};

/**
 * Soft deletes a job post in the database.
 * Throws an error if the job is not found or if there's a database error.
 * @param {number} jobId - The ID of the job post to soft delete.
 * @returns {Object} The updated job post object with the new status.
 */
const softDeleteJob = async (jobId) => {
  console.log("Input parameters to JobService.softDeleteJob:", jobId);
  try {
    // Optionally add logic here to check job existence or permissions
    const deletedJob = await JobDao.softDeleteJob(jobId);
    console.log("Job soft deleted by JobService.softDeleteJob:", deletedJob);
    return deletedJob;
  } catch (error) {
    console.log("Error in JobService.softDeleteJob:", error);
    console.error("Service Error: Failed to soft delete job:", error);
    throw new Error("Could not soft delete the job. Please try again later.");
  }
};

// Export the service functions to be used by other parts of the application.
module.exports = {
  postJob,
  getJobs,
  findJobById,
  updateJob,
  deleteJob,
  softDeleteJob,
  updateJobStatus,
  updateJobLocation,
};
