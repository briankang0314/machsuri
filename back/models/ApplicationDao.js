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
    return await prisma.jobApplication.create({
      data: {
        job_post_id: jobPostId,
        applicant_id: applicantId,
        cover_letter: coverLetter,
        status: "pending", // default status
        applied_at: new Date(), // current timestamp
      },
    });
  },

  /**
   * Retrieves a list of job applications filtered by applicant ID and optionally by the application status.
   * @param {number} applicantId - The ID of the applicant whose job applications are being queried.
   * @param {string} [status] - The current status of the job applications to filter by (e.g., 'pending', 'approved'). Optional.
   * @returns {Array<Object>} A promise that resolves to an array of job application objects.
   * @throws {Error} Throws an error if the database query fails.
   */
  getApplicationsByApplicant: async (applicantId, status) => {
    return await prisma.jobApplication.findMany({
      where: {
        applicant_id: applicantId,
        ...(status && { status: status }), // Conditional addition of status filter
      },
    });
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
    return await prisma.jobApplication.update({
      where: { id: applicationId },
      data: { status: newStatus, updated_at: new Date() },
    });
  },

  /**
   * Deletes a job application from the database based on its unique identifier.
   * @param {number} applicationId - The ID of the job application to be deleted.
   * @returns {Object} A promise that resolves to the job application object that was deleted.
   * @throws {Error} Throws an error if the deletion operation fails, such as when no application matches the given ID.
   */
  deleteApplication: async (applicationId) => {
    return await prisma.jobApplication.delete({
      where: { id: applicationId },
    });
  },
};

module.exports = ApplicationDao;
