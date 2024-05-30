const ApplicationDao = require("../models/ApplicationDao");

/**
 * Submits a new job application with the provided details.
 * Throws an error if the applicant has already applied to the job.
 * @param {number} jobPostId - The ID of the job post to apply for.
 * @param {number} applicantId - The ID of the applicant submitting the application.
 * @returns {Object} The newly created job application.
 */
const submitApplication = async (jobPostId, applicantId) => {
  console.log(
    "Input parameters to ApplicationService.submitApplication:",
    jobPostId,
    applicantId
  );
  // Validate input or check business rules here
  if (!jobPostId || !applicantId) {
    throw new Error("All fields (jobPostId, applicantId) must be provided");
  }
  const existingApplication = await ApplicationDao.getApplicationsByApplicant(
    applicantId
  );
  if (existingApplication.some((app) => app.job_post_id === jobPostId)) {
    throw new Error("Applicant has already applied to this job");
  }

  // Call the DAO to create the application
  return await ApplicationDao.createApplication(jobPostId, applicantId);
};

/**
 * Retrieves a list of job applications for a specific applicant.
 * Optionally filters the applications by status.
 * @param {number} applicantId - The ID of the applicant.
 * @param {string} status - The status of the applications to filter by.
 * @returns {Array} An array of job application objects.
 */
const getApplicationsByApplicant = async (applicantId, status) => {
  console.log(
    "Input parameters to ApplicationService.getApplicationsByApplicant:",
    applicantId,
    status
  );

  if (!applicantId) {
    throw new Error("Applicant ID must be provided");
  }

  // Additional business logic can be added here if needed
  return ApplicationDao.getApplicationsByApplicant(applicantId, status);
};

/**
 * Retrieves a job application by its ID.
 * @param {number} applicationId - The ID of the application to retrieve.
 * @returns {Object} The job application object.
 * @throws {Error} Throws an error if the application is not found.
 * @throws {Error} Throws an error if the database query fails.
 */
const getApplicationById = async (applicationId) => {
  console.log(
    "Input parameters to ApplicationService.getApplicationById:",
    applicationId
  );

  if (!applicationId) {
    throw new Error("Application ID must be provided");
  }

  // Call the DAO to fetch the application by ID
  return await ApplicationDao.getApplicationById(applicationId);
};

/**
 * Updates the status of a job application.
 * Throws an error if the status update is invalid.
 * @param {number} applicationId - The ID of the application to update.
 * @param {string} newStatus - The new status to set for the application.
 * @returns {Object} The updated job application object.
 */
const updateApplicationStatus = async (applicationId, newStatus) => {
  console.log(
    "Input parameters to ApplicationService.updateApplicationStatus:",
    applicationId,
    newStatus
  );

  if (!applicationId || !newStatus) {
    throw new Error("Both application ID and new status must be provided");
  }

  // Example: Validate newStatus is a valid transition
  const validStatuses = ["pending", "accepted", "rejected"];
  if (!validStatuses.includes(newStatus)) {
    throw new Error("Invalid status update");
  }

  // Call the DAO to update the application
  return await ApplicationDao.updateApplicationStatus(applicationId, newStatus);
};

/**
 * Deletes a job application from the database.
 * @param {number} applicationId - The ID of the application to delete.
 * @returns {Object} The deleted job application object.
 */
const deleteApplication = async (applicationId) => {
  console.log(
    "Input parameters to ApplicationService.deleteApplication:",
    applicationId
  );
  if (!applicationId) {
    throw new Error("Application ID must be provided");
  }

  // Additional checks can be added here, such as permissions checks
  return await ApplicationDao.deleteApplication(applicationId);
};

module.exports = {
  submitApplication,
  getApplicationsByApplicant,
  getApplicationById,
  updateApplicationStatus,
  deleteApplication,
};
