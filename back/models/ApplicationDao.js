const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const ApplicationDao = {
  /**
   * Creates a new job application in the database with the provided details.
   * @param {number} jobPostId - The ID of the job post to apply for.
   * @param {number} applicantId - The ID of the applicant applying for the job.
   * @param {string} coverLetter - The cover letter submitted with the application.
   * @returns {Object} The newly created job application.
   * @throws Will throw an error if the database operation fails.
   */
  createApplication: async (jobPostId, applicantId, coverLetter) => {
    console.log(
      "Input parameters to ApplicationDao.createApplication:",
      jobPostId,
      applicantId,
      coverLetter
    );

    // Input validation
    if (!jobPostId || !applicantId || !coverLetter) {
      throw new Error("Missing required fields for creating job application.");
    }
    try {
      const newApplication = await prisma.jobApplication.create({
        data: {
          job_post_id: parseInt(jobPostId),
          applicant_id: parseInt(applicantId),
          cover_letter: coverLetter,
        },
      });
      console.log("New job application created successfully:", newApplication);
      return newApplication;
    } catch (error) {
      console.log("Error in ApplicationDao.createApplication:", error);
      console.error("Error creating job application:", error);
      throw new Error(`Failed to create job application: ${error.message}`);
    }
  },

  /**
   * Retrieves a list of job applications filtered by applicant ID and optionally by the application status.
   * @param {number} applicantId - The ID of the applicant whose job applications are being queried.
   * @param {string} [status] - The current status of the job applications to filter by (e.g., 'pending', 'accepted', 'rejected'). Optional.
   * @returns {Array} A promise that resolves to an array of job application objects.
   * @throws {Error} Throws an error if the database query fails.
   */
  getApplicationsByApplicant: async (applicantId, status) => {
    console.log(
      "Input parameters to ApplicationDao.getApplicationsByApplicant:",
      applicantId,
      status
    );
    if (!applicantId) throw new Error("Applicant ID is required.");

    try {
      const applications = await prisma.jobApplication.findMany({
        where: {
          applicant_id: parseInt(applicantId),
          ...(status && { status: status }),
        },
      });
      console.log("Applications retrieved:", applications.length);
      return applications || [];
    } catch (error) {
      console.log("Error in ApplicationDao.getApplicationsByApplicant:", error);
      console.error("Error fetching applications:", error);
      throw new Error("Failed to fetch applications due to an internal error.");
    }
  },

  /**
   * Retrieves a specific job application from the database based on its unique identifier.
   * @param {number} applicationId - The ID of the job application to retrieve.
   * @returns {Object} A promise that resolves to the job application object.
   * @throws {Error} Throws an error if the application is not found or the database query fails.
   * @throws {Error} Throws an error if the application ID is missing.
   */
  getApplicationById: async (applicationId) => {
    console.log(
      "Input parameters to ApplicationDao.getApplicationById:",
      applicationId
    );
    if (!applicationId) throw new Error("Application ID is required.");

    try {
      const application = await prisma.jobApplication.findUnique({
        where: { id: parseInt(applicationId) },
      });
      if (!application) {
        console.log("Application not found with ID:", applicationId);
        throw new Error("Application not found.");
      }
      console.log("Application retrieved successfully:", application);
      return application;
    } catch (error) {
      console.log("Error in ApplicationDao.getApplicationById:", error);
      console.error("Error fetching application:", error);
      throw new Error("Failed to fetch application due to an internal error.");
    }
  },

  /**
   * Updates the status of a specific job application in the database.
   * This function sets the new status and updates the timestamp of the last modification.
   * @param {number} applicationId - The unique identifier of the job application to be updated.
   * @param {string} newStatus - The new status to set for the job application (e.g., 'approved', 'rejected').
   * @returns {Object} A promise that resolves to the updated job application object.
   * @throws {Error} Throws an error if the update operation fails, such as when no application matches the given ID.
   */
  updateApplicationStatus: async (applicationId, newStatus) => {
    console.log(
      "Input parameters to ApplicationDao.updateApplicationStatus:",
      applicationId,
      newStatus
    );
    if (!applicationId || !newStatus)
      throw new Error("Both application ID and new status are required.");

    try {
      const updatedApplication = await prisma.jobApplication.update({
        where: { id: parseInt(applicationId) },
        data: { status: newStatus, updated_at: new Date() },
      });
      console.log("Application updated successfully:", updatedApplication);
      return updatedApplication;
    } catch (error) {
      console.log("Error in ApplicationDao.updateApplicationStatus:", error);
      console.error("Error updating application status:", error);
      throw new Error(
        "Failed to update application status due to an internal error."
      );
    }
  },

  /**
   * Deletes a job application from the database based on its unique identifier.
   * @param {number} applicationId - The ID of the job application to be deleted.
   * @returns {Object} A promise that resolves to the job application object that was deleted.
   * @throws {Error} Throws an error if the deletion operation fails, such as when no application matches the given ID.
   */
  deleteApplication: async (applicationId) => {
    console.log(
      "Input parameters to ApplicationDao.deleteApplication:",
      applicationId
    );
    if (!applicationId) throw new Error("Application ID is required.");

    try {
      const deletedApplication = await prisma.jobApplication.delete({
        where: { id: parseInt(applicationId) },
      });
      console.log("Application deleted successfully:", deletedApplication);
      return deletedApplication;
    } catch (error) {
      console.error("Error deleting application:", error);
      throw new Error(`Failed to delete application: ${error.message}`);
    }
  },
};

module.exports = ApplicationDao;
