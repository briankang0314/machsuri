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
        amount,
        fee,
        contactInfo,
        minorCategoryIds,
        images,
        thumbnailIndex,
      } = jobDetails;
      const newJob = await prisma.jobPost.create({
        data: {
          user_id: parseInt(userId),
          city_id: parseInt(cityId),
          title,
          summary,
          amount: parseInt(amount),
          fee: parseFloat(fee),
          contact_info: contactInfo,
        },
      });
      console.log("New job created:", newJob);

      if (minorCategoryIds && minorCategoryIds.length > 0) {
        for (let categoryId of minorCategoryIds) {
          const categoryLink = await prisma.jobCategory.create({
            data: {
              job_post_id: newJob.id,
              minor_category_id: parseInt(categoryId),
            },
          });
          console.log("Linked job to category:", categoryLink);
        }
      }

      console.log("Processing images and thumbnail...");
      const jobImages = await prisma.jobImage.createMany({
        data: images.map((image, index) => {
          const isThumbnail = index === parseInt(thumbnailIndex);
          console.log(
            `Image ${index}: path=${image.path}, isThumbnail=${isThumbnail}`
          );
          return {
            job_post_id: newJob.id,
            url: image.path,
            is_thumbnail: isThumbnail,
          };
        }),
      });
      console.log("New job images created:", jobImages);

      return newJob;
    } catch (error) {
      console.error("Error in JobDao.createJob:", error);
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
  getJobs: async (filter, sortBy = "created_at", sortOrder = "desc") => {
    console.log(
      "Input parameters to JobDao.getJobs:",
      filter,
      sortBy,
      sortOrder
    );
    try {
      const jobs = await prisma.jobPost.findMany({
        where: filter,
        orderBy: {
          [sortBy]: sortOrder,
        },
        include: {
          city: {
            include: {
              region: true,
            },
          },
          job_categories: {
            include: {
              minor_category: {
                include: {
                  major_category: true,
                },
              },
            },
          },
          images: true,
        },
      });
      return jobs;
    } catch (error) {
      console.log("Error in JobDao.getJobs:", error);
      console.error("Error retrieving jobs:", error);
      throw error;
    }
  },

  /**
   * Retrieves a specific job post from the database based on the provided jobId.
   * @param {number} jobId - The ID of the job post to retrieve.
   * @returns {Object} The job post object.
   * @throws Will throw an error if the job is not found or the database operation fails.
   */
  getJobById: async (jobId) => {
    console.log("Input parameters to JobDao.getJobById:", jobId);
    try {
      const job = await prisma.jobPost.findUnique({
        where: { id: parseInt(jobId) },
        include: {
          city: {
            include: {
              region: true,
            },
          },
          job_categories: {
            include: {
              minor_category: {
                include: {
                  major_category: true,
                },
              },
            },
          },
          images: true,
        },
      });
      return job;
    } catch (error) {
      console.log("Error in JobDao.getJobById:", error);
      console.error("Error retrieving job by ID:", error);
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
      // Initialize an empty object for the data to update
      const dataToUpdate = {};

      // Dynamically add properties to the dataToUpdate object if they exist in jobData
      if (jobData.cityId !== undefined)
        dataToUpdate.city_id = parseInt(jobData.cityId);
      if (jobData.title !== undefined) dataToUpdate.title = jobData.title;
      if (jobData.summary !== undefined) dataToUpdate.summary = jobData.summary;
      if (jobData.fee !== undefined) dataToUpdate.fee = parseFloat(jobData.fee);
      if (jobData.contactInfo !== undefined)
        dataToUpdate.contact_info = jobData.contactInfo;
      if (jobData.status !== undefined) dataToUpdate.status = jobData.status;

      // Only perform the update if there's actually data to update
      if (Object.keys(dataToUpdate).length === 0) {
        throw new Error("No valid fields provided to update.");
      }

      const updatedJob = await prisma.jobPost.update({
        where: { id: parseInt(jobId) },
        data: dataToUpdate,
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
      // Manually delete all related applications
      await prisma.jobApplication.deleteMany({
        where: { job_post_id: parseInt(jobId) },
      });

      // Manually delete all related categories
      await prisma.jobCategory.deleteMany({
        where: { job_post_id: parseInt(jobId) },
      });

      // Then delete the job post
      await prisma.jobPost.delete({
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

  /**
   * Adds images to a job post.
   * @param {number} jobId - The ID of the job post.
   * @param {Array} images - An array of image URLs with a flag indicating if it is a thumbnail.
   * @returns {Object} The newly created job images.
   */
  addJobImages: async (jobId, images) => {
    console.log("Input parameters to JobDao.addJobImages:", {
      jobId,
      images,
    });
    try {
      const jobImages = await prisma.jobImage.createMany({
        data: images.map((image) => ({
          job_post_id: jobId,
          url: image.url,
          is_thumbnail: image.is_thumbnail || false,
        })),
      });
      return jobImages;
    } catch (error) {
      console.error("Error in JobDao.addJobImages:", error);
      throw error;
    }
  },

  /**
   * Retrieves images for a specific job post.
   * @param {number} jobId - The ID of the job post.
   * @returns {Array} An array of job images.
   */
  getJobImages: async (jobId) => {
    console.log("Input parameters to JobDao.getJobImages:", jobId);
    try {
      const jobImages = await prisma.jobImage.findMany({
        where: { job_post_id: jobId },
      });
      return jobImages;
    } catch (error) {
      console.error("Error in JobDao.getJobImages:", error);
      throw error;
    }
  },

  /**
   * Deletes images for a specific job post.
   * @param {number} jobId - The ID of the job post.
   * @returns {Object} The result of the delete operation.
   */
  deleteJobImages: async (jobId) => {
    console.log("Input parameters to JobDao.deleteJobImages:", jobId);
    try {
      const deleteResult = await prisma.jobImage.deleteMany({
        where: { job_post_id: jobId },
      });
      return deleteResult;
    } catch (error) {
      console.error("Error in JobDao.deleteJobImages:", error);
      throw error;
    }
  },
};

module.exports = JobDao;
