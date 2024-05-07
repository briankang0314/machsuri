const ApplicationService = require("../services/ApplicationService");
const errorGenerator = require("../utils/errorGenerator");

// Handles requests to submit a new application
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

// Handles requests to get applications by a user
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

// Handles requests to update an application status
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

// Handles requests to delete an application
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
