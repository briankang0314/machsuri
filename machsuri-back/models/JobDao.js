const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const JobDao = {
  /**
   * Creates a new job post in the database using the provided job details.
   * @param {Object} jobDetails - The job details to be saved.
   * @returns {Object} The newly created job post.
   * @throws Will throw an error if the database operation fails.
   */
  createJob: async (jobDetails) => {
    try {
      const job = await prisma.jobPosts.create({
        data: {
          user_id: jobDetails.userId,
          title: jobDetails.title,
          summary: jobDetails.summary,
          location_id: jobDetails.locationId,
          required_skills_id: jobDetails.requiredSkillsId,
          category_id: jobDetails.categoryId,
          fee: jobDetails.fee,
          contact_info: jobDetails.contactInfo,
          status: "open", // Default status
        },
      });
      return job;
    } catch (error) {
      console.error("Error creating job:", error);
      throw error;
    }
  },

  /**
   * Retrieves a list of job posts from the database that match the specified filtering criteria.
   * Includes related data from other tables like user, location, required skills, and category.
   * @param {Object} filter - Conditions to apply for filtering job posts.
   * @returns {Array} An array of job posts.
   * @throws Will throw an error if the database operation fails.
   */
  getJobs: async (filter) => {
    try {
      const jobs = await prisma.jobPosts.findMany({
        where: filter,
        include: {
          user: true,
          location: true,
          required_skills: true,
          category: true,
        },
      });
      return jobs.map((job) => ({
        id: job.id,
        userId: job.user_id,
        title: job.title,
        summary: job.summary,
        locationId: job.location_id,
        requiredSkillsId: job.required_skills_id,
        categoryId: job.category_id,
        fee: job.fee,
        contactInfo: job.contact_info,
        status: job.status,
        createdAt: job.created_at,
        updatedAt: job.updated_at,
      }));
    } catch (error) {
      console.error("Error retrieving jobs:", error);
      throw error;
    }
  },

  /**
   * Updates a specific job post identified by jobId with the new data provided.
   * @param {number} jobId - The ID of the job to update.
   * @param {Object} jobData - The new data for updating the job post.
   * @returns {Object} The updated job post.
   * @throws Will throw an error if the job is not found or the database operation fails.
   */
  updateJob: async (jobId, jobData) => {
    try {
      const updatedJob = await prisma.jobPosts.update({
        where: { id: jobId },
        data: {
          title: jobData.title,
          summary: jobData.summary,
          location_id: jobData.locationId,
          required_skills_id: jobData.requiredSkillsId,
          category_id: jobData.categoryId,
          fee: jobData.fee,
          contact_info: jobData.contactInfo,
          status: jobData.status,
        },
      });
      return updatedJob;
    } catch (error) {
      console.error("Error updating job:", error);
      throw error;
    }
  },

  /**
   * Deletes a job post from the database identified by jobId.
   * @param {number} jobId - The ID of the job post to delete.
   * @returns {Boolean} True if the deletion was successful.
   * @throws Will throw an error if the job is not found or the database operation fails.
   */
  deleteJob: async (jobId) => {
    try {
      await prisma.jobPosts.delete({
        where: { id: jobId },
      });
      return true;
    } catch (error) {
      console.error("Error deleting job:", error);
      throw error;
    }
  },
};

module.exports = JobDao;
