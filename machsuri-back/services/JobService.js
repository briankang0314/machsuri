const JobDao = require("../models/JobDao");
const errorGenerator = require("../utils/errorGenerator");

// Function to post a new job. Requires various parameters describing the job.
// Throws an error if required fields are missing.
const postJob = async (
  userId,
  title,
  summary,
  locationId,
  requiredSkillsId,
  categoryId,
  fee,
  contactInfo
) => {
  // Validate input to ensure no essential details are missing.
  if (
    !title ||
    !summary ||
    !locationId ||
    !requiredSkillsId ||
    !categoryId ||
    !fee ||
    !contactInfo
  ) {
    throw errorGenerator({
      statusCode: 400,
      message: "Required fields missing",
    });
  }

  // Calls the JobDao to create a job in the database with the provided details.
  const newJob = await JobDao.createJob({
    userId,
    title,
    summary,
    locationId,
    requiredSkillsId,
    categoryId,
    fee,
    contactInfo,
  });

  // Return the newly created job object.
  return newJob;
};

// Retrieves jobs based on a filtering criteria. Can throw an error if no jobs are found matching the filter.
const getJobs = async (filter) => {
  // Uses the JobDao to fetch jobs that match the provided filter criteria.
  const jobs = await JobDao.getJobs(filter);
  if (jobs.length === 0) {
    throw errorGenerator({
      statusCode: 404,
      message: "No jobs found",
    });
  }
  // Returns a list of jobs that match the filter.
  return jobs;
};

// Updates job details. Takes a jobId and a jobData object containing updatable fields.
// Throws an error if the job to be updated is not found.
const updateJob = async (jobId, jobData) => {
  // Calls the JobDao to update the specified job with new data.
  const updatedJob = await JobDao.updateJob(jobId, jobData);
  if (!updatedJob) {
    throw errorGenerator({
      statusCode: 404,
      message: "Job not found",
    });
  }
  // Returns the updated job object.
  return updatedJob;
};

// Deletes a job by its jobId. Returns a success message or throws an error if the job is not found.
const deleteJob = async (jobId) => {
  // Calls the JobDao to delete the job identified by jobId.
  const result = await JobDao.deleteJob(jobId);
  if (!result) {
    throw errorGenerator({
      statusCode: 404,
      message: "Job not found",
    });
  }
  // Returns a confirmation message on successful deletion.
  return { message: "Job deleted successfully" };
};

// Export the service functions to be used by other parts of the application.
module.exports = { postJob, getJobs, updateJob, deleteJob };
