const ApplicationService = require("../services/ApplicationService");
const errorGenerator = require("../utils/errorGenerator");

/**
 * Controller to handle the submission of a new job application.
 * Validates required inputs and uses the application service to create the application.
 * @param {Object} req - The HTTP request object, containing application details in req.body.
 * @param {Object} res - The HTTP response object used to send responses.
 */
const submitApplication = async (req, res) => {
  const { jobPostId, coverLetter } = req.body;
  const applicantId = req.user.id; // Assuming user ID is stored in req.user by auth middleware

  try {
    const application = await ApplicationService.submitApplication(
      jobPostId,
      applicantId,
      coverLetter
    );
    res
      .status(201)
      .json({ message: "Application submitted successfully", application });
  } catch (error) {
    const err = await errorGenerator({
      statusCode: 400,
      message: error.message,
    });
    res.status(err.statusCode).json({ message: err.message });
  }
};

/**
 * Controller to retrieve job applications for the authenticated applicant.
 * Uses the application service to fetch the applications.
 * @param {Object} req - The HTTP request object, containing the authenticated user's ID.
 * @param {Object} res - The HTTP response object used to send responses.
 */
const getApplication = async (req, res) => {
  const applicantId = req.user.id; // Assuming user ID is stored in req.user

  try {
    const applications = await ApplicationService.getApplicationsByApplicant(
      applicantId
    );
    res.status(200).json({ applications });
  } catch (error) {
    const err = await errorGenerator({
      statusCode: 500,
      message: "Failed to retrieve applications",
    });
    res.status(err.statusCode).json({ message: err.message });
  }
};

/**
 * Controller to update the status of a job application.
 * Validates the new status and uses the application service to update the application.
 * @param {Object} req - The HTTP request object, containing application ID and new status in req.body.
 * @param {Object} res - The HTTP response object used to send responses.
 */
const updateApplication = async (req, res) => {
  const { applicationId, newStatus } = req.body;

  try {
    const updatedApplication = await ApplicationService.updateApplicationStatus(
      applicationId,
      newStatus
    );
    res.status(200).json({
      message: "Application updated successfully",
      updatedApplication,
    });
  } catch (error) {
    const err = await errorGenerator({
      statusCode: 400,
      message: error.message,
    });
    res.status(err.statusCode).json({ message: err.message });
  }
};

/**
 * Controller to delete a job application.
 * Uses the application service to delete the application.
 * @param {Object} req - The HTTP request object, containing the application ID in req.params.
 * @param {Object} res - The HTTP response object used to send responses.
 */
const deleteApplication = async (req, res) => {
  const { applicationId } = req.params;

  try {
    await ApplicationService.deleteApplication(applicationId);
    res.status(200).json({ message: "Application deleted successfully" });
  } catch (error) {
    const err = await errorGenerator({
      statusCode: 400,
      message: error.message,
    });
    res.status(err.statusCode).json({ message: err.message });
  }
};

module.exports = {
  submitApplication,
  getApplication,
  updateApplication,
  deleteApplication,
};
