const ApplicationDao = require("../models/ApplicationDao");

// Submits a new application
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

// Retrieves applications for a given applicant
const getApplicationsByApplicant = async (applicantId, status) => {
  // Additional business logic can be added here if needed
  return await ApplicationDao.getApplicationsByApplicant(applicantId, status);
};

// Updates the status of an application
const updateApplicationStatus = async (applicationId, newStatus) => {
  // Example: Validate newStatus is a valid transition
  const validStatuses = ["pending", "accepted", "rejected"];
  if (!validStatuses.includes(newStatus)) {
    throw new Error("Invalid status update");
  }

  // Call the DAO to update the application
  return await ApplicationDao.updateApplicationStatus(applicationId, newStatus);
};

// Deletes an application
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
