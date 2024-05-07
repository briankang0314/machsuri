const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const ApplicationDao = {
  // Creates a new application with the provided details
  createApplication: async (jobPostId, applicantId, coverLetter) => {
    return await prisma.jobApplications.create({
      data: {
        job_post_id: jobPostId,
        applicant_id: applicantId,
        cover_letter: coverLetter,
        status: "pending", // default status
        applied_at: new Date(), // current timestamp
      },
    });
  },

  // Retrieves applications by applicant ID, with optional filters for status
  getApplicationsByApplicant: async (applicantId, status) => {
    return await prisma.jobApplications.findMany({
      where: {
        applicant_id: applicantId,
        ...(status && { status: status }), // Conditional addition of status filter
      },
    });
  },

  // Updates the status of an application
  updateApplicationStatus: async (applicationId, newStatus) => {
    return await prisma.jobApplications.update({
      where: { id: applicationId },
      data: { status: newStatus, updated_at: new Date() },
    });
  },

  // Deletes an application by its ID
  deleteApplication: async (applicationId) => {
    return await prisma.jobApplications.delete({
      where: { id: applicationId },
    });
  },
};

module.exports = ApplicationDao;
