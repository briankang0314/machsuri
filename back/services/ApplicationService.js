const ApplicationDao = require("../models/ApplicationDao");

/**
 * Submits a new job application with the provided details.
 * Throws an error if the applicant has already applied to the job.
 * @param {number} jobPostId - The ID of the job post to apply for.
 * @param {number} applicantId - The ID of the applicant submitting the application.
 * @param {string} coverLetter - The cover letter submitted with the application.
 * @returns {Object} The newly created job application.
 */
const submitApplication = async (jobPostId, applicantId, coverLetter) => {
  // Validate input or check business rules here
  // Example: Check if the applicant has already applied to this jobPostId
  const existingApplication = await ApplicationDao.getApplicationsByApplicant(
    applicantId
  );
  if (existingApplication.some((app) => app.job_post_id === jobPostId)) {
    throw new Error("Applicant has already applied to this job");
  }

  // Call the DAO to create the application
  return await ApplicationDao.createApplication(
    jobPostId,
    applicantId,
    coverLetter
  );
};

/**
 * Retrieves a list of job applications for a specific applicant.
 * Optionally filters the applications by status.
 * @param {number} applicantId - The ID of the applicant.
 * @param {string} status - The status of the applications to filter by.
 * @returns {Array} An array of job application objects.
 */
const getApplicationsByApplicant = async (applicantId, status) => {
  // Additional business logic can be added here if needed
  return await ApplicationDao.getApplicationsByApplicant(applicantId, status);
};

/**
 * Updates the status of a job application.
 * Throws an error if the status update is invalid.
 * @param {number} applicationId - The ID of the application to update.
 * @param {string} newStatus - The new status to set for the application.
 * @returns {Object} The updated job application object.
 */
const updateApplicationStatus = async (applicationId, newStatus) => {
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
  // Additional checks can be added here, such as permissions checks
  return await ApplicationDao.deleteApplication(applicationId);
};

module.exports = {
  submitApplication,
  getApplicationsByApplicant,
  updateApplicationStatus,
  deleteApplication,
};
