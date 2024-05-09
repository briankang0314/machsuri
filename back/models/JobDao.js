const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const JobDao = {
  /**
   * Creates a new job post in the database using the provided job details and links it to selected minor categories.
   * @param {Object} jobDetails - The job details to be saved, including an array of minor category IDs.
   * @returns {Object} The newly created job post with category links.
   * @throws Will throw an error if the database operation fails.
   */
  createJob: async (jobDetails) => {
    console.log("Input parameters to JobDao.createJob:", jobDetails);
    try {
      const {
        userId,
        cityId,
        title,
        summary,
        fee,
        contactInfo,
        minorCategoryIds,
      } = jobDetails;

      // Create the job post and link it to the selected minor categories within a transaction
      const job = await prisma.$transaction(async (prisma) => {
        const newJob = await prisma.jobPost.create({
          data: {
            user_id: parseInt(userId),
            city_id: parseInt(cityId),
            title,
            summary,
            fee: parseFloat(fee),
            contact_info: contactInfo,
          },
        });

        // If minorCategoryIds are provided, link them to the job
        if (minorCategoryIds && minorCategoryIds.length > 0) {
          await Promise.all(
            minorCategoryIds.map((categoryId) =>
              prisma.jobCategory.create({
                data: {
                  job_post_id: newJob.id,
                  minor_category_id: categoryId,
                },
              })
            )
          );
        }

        return newJob;
      });

      return job;
    } catch (error) {
      console.log("Error in JobDao.createJob:", error);
      console.error("Error creating job:", error);
      throw error;
    }
  },

  /**
   * Retrieves a list of job posts from the database that match the specified filtering criteria.
   * Includes related data from other tables like user, location, required skills, and category.
   * @param {Object} filter - Conditions to apply for filtering job posts.
   * @param {string} sortBy - The field to sort the results by.
   * @param {string} sortOrder - The order to sort the results in (asc or desc).
   * @returns {Array} An array of job posts.
   * @throws Will throw an error if the database operation fails.
   */
  getJobs: async (filter, sortBy = "createdAt", sortOrder = "desc") => {
    console.log(
      "Input parameters to JobDao.getJobs:",
      filter,
      sortBy,
      sortOrder
    );
    try {
      const jobs = await prisma.jobPosts.findMany({
        where: filter,
        orderBy: {
          [sortBy]: sortOrder,
        },
        include: {
          user_id: true,
          city_id: true,
        },
      });
      return jobs.map((job) => ({
        id: job.id,
        userId: job.user_id,
        cityId: job.city_id,
        title: job.title,
        summary: job.summary,
        fee: job.fee,
        contactInfo: job.contact_info,
        status: job.status,
        createdAt: job.created_at,
        updatedAt: job.updated_at,
      }));
    } catch (error) {
      console.log("Error in JobDao.getJobs:", error);
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
    console.log("Input parameters to JobDao.updateJob:", jobId, jobData);
    try {
      const updatedJob = await prisma.jobPosts.update({
        where: { id: jobId },
        data: {
          city_id: jobData.cityId,
          title: jobData.title,
          summary: jobData.summary,
          fee: jobData.fee,
          contact_info: jobData.contactInfo,
          status: jobData.status,
        },
      });
      return updatedJob;
    } catch (error) {
      console.log("Error in JobDao.updateJob:", error);
      console.error("Error updating job:", error);
      throw error;
    }
  },

  /**
   * Updates the status of a job post identified by jobId.
   * @param {number} jobId - The ID of the job post to update.
   * @param {string} status - The new status to set for the job post.
   * @returns {Object} The updated job post.
   * @throws Will throw an error if the job is not found or the database operation fails.
   */
  updateJobStatus: async (jobId, status) => {
    console.log("Input parameters to JobDao.updateJobStatus:", jobId, status);
    try {
      const updatedJob = await prisma.jobPost.update({
        where: { id: parseInt(jobId) },
        data: { status },
      });
      return updatedJob;
    } catch (error) {
      console.log("Error in JobDao.updateJobStatus:", error);
      console.error("Error updating job status:", error);
      throw error;
    }
  },

  /**
   * Updates the location of a job post identified by jobId.
   * @param {number} jobId - The ID of the job post to update.
   * @param {number} cityId - The ID of the city to update the job post's location to.
   * @returns {Object} The updated job post.
   * @throws Will throw an error if the job is not found or the database operation fails.
   */
  updateJobLocation: async (jobId, cityId) => {
    console.log("Input parameters to JobDao.updateJobLocation:", jobId, cityId);
    try {
      const updatedJob = await prisma.jobPost.update({
        where: { id: parseInt(jobId) },
        data: { city_id: parseInt(cityId) },
      });
      return updatedJob;
    } catch (error) {
      console.log("Error in JobDao.updateJobLocation:", error);
      console.error("Error updating job location:", error);
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
    console.log("Input parameters to JobDao.deleteJob:", jobId);
    try {
      await prisma.jobPosts.delete({
        where: { id: parseInt(jobId) },
      });
      return true;
    } catch (error) {
      console.log("Error in JobDao.deleteJob:", error);
      console.error("Error deleting job:", error);
      throw error;
    }
  },

  /**
   * Soft deletes a job post from the database identified by jobId.
   * @param {number} jobId - The ID of the job post to soft delete.
   * @returns {Object} The updated job post with the new status.
   * @throws Will throw an error if the job is not found or the database operation fails.
   */
  softDeleteJob: async (jobId) => {
    console.log("Input parameters to JobDao.softDeleteJob:", jobId);
    try {
      const updatedJob = await prisma.jobPost.update({
        where: { id: parseInt(jobId) },
        data: { is_deleted: true, deleted_at: new Date() },
      });
      return updatedJob;
    } catch (error) {
      console.log("Error in JobDao.softDeleteJob:", error);
      console.error("Error soft deleting job:", error);
      throw error;
    }
  },
};

module.exports = JobDao;
