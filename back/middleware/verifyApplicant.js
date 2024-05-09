const ApplicationService = require("../services/ApplicationService");

/**
 * Middleware to verify if the logged-in user is the owner of the application or an admin.
 */
const verifyApplicantOrAdmin = async (req, res, next) => {
  const { applicationId } = req.params;
  const userId = req.user.id; // ID from validated token

  try {
    const application = await ApplicationService.getApplicationById(
      applicationId
    );

    // Check if the current user is the applicant or an admin
    if (application.applicant_id !== userId && req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Unauthorized to perform this action" });
    }

    next();
  } catch (error) {
    return res.status(404).json({ message: "Application not found" });
  }
};

module.exports = verifyApplicantOrAdmin;
