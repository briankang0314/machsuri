const ApplicationService = require("../services/ApplicationService");
const JobService = require("../services/JobService");
const NotificationService = require("../services/NotificationService");
const errorGenerator = require("../utils/errorGenerator");

/**
 * Controller to handle the submission of a new job application.
 * Validates required inputs and uses the application service to create the application.
 * @param {Object} req - The HTTP request object, containing application details in req.body.
 * @param {Object} res - The HTTP response object used to send responses.
 */
const submitApplication = async (req, res) => {
  console.log("Request body:", req.body);
  const { job_post_id } = req.body;
  const applicantId = req.user.id; // Assuming user ID is stored in req.user by auth middleware
  console.log(
    "Input parameters to ApplicationController.submitApplication:",
    job_post_id,
    applicantId
  );

  try {
    const application = await ApplicationService.submitApplication(
      job_post_id,
      applicantId
    );
    console.log("New job application created successfully:", application);

    const jobPost = await JobService.findJobById(job_post_id);

    await NotificationService.createNotification(
      jobPost.user_id,
      "info",
      `새로운 지원서가 도착했습니다. 오더 제목: ${jobPost.title}`
    );
    res
      .status(201)
      .json({ message: "Application submitted successfully", application });
  } catch (error) {
    console.log("Error in ApplicationController.submitApplication:", error);
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
const findApplications = async (req, res) => {
  const applicantId = req.user.id; // Assuming user ID is stored in req.user
  console.log(
    "Input parameters to ApplicationController.findApplications:",
    applicantId
  );

  try {
    const applications = await ApplicationService.getApplicationsByApplicant(
      applicantId
    );
    console.log("Applications retrieved:", applications.length);
    console.log("Applications retrieved:", applications);
    res.status(200).json({ applications });
  } catch (error) {
    console.log("Error in ApplicationController.findApplications:", error);
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
  const { applicationId } = req.params;
  const { newStatus } = req.body;
  console.log(
    "Input parameters to ApplicationController.updateApplication:",
    applicationId,
    newStatus
  );

  try {
    const updatedApplication = await ApplicationService.updateApplicationStatus(
      applicationId,
      newStatus
    );
    console.log("Application updated successfully:", updatedApplication);
    res.status(200).json({
      message: "Application updated successfully",
      updatedApplication,
    });
  } catch (error) {
    console.log("Error in ApplicationController.updateApplication:", error);
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
  console.log(
    "Input parameters to ApplicationController.deleteApplication:",
    applicationId
  );

  try {
    await ApplicationService.deleteApplication(applicationId);
    res.status(200).json({ message: "Application deleted successfully" });
  } catch (error) {
    console.log("Error in ApplicationController.deleteApplication:", error);
    const err = await errorGenerator({
      statusCode: 400,
      message: error.message,
    });
    res.status(err.statusCode).json({ message: err.message });
  }
};

module.exports = {
  submitApplication,
  findApplications,
  updateApplication,
  deleteApplication,
};
