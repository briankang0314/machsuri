const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const ReviewDao = {
  /**
   * Creates a new review in the database.
   * This function takes an object containing the user ID of the reviewee,
   * the ID of the reviewer, the numerical rating, and a text comment,
   * and persists these as a new review record in the database.
   *
   * @param {number} revieweeId - The ID of the user who is being reviewed.
   * @param {number} reviewerId - The ID of the user who is writing the review.
   * @param {number} rating - The numerical rating given in the review.
   * @param {string} comment - The textual comment of the review.
   * @returns {Object} A promise that resolves to the newly created review object.
   * @throws {Error} Throws an error if the database operation fails.
   * @throws {Error} Throws an error if any of the required fields are missing.
   * @throws {Error} Throws an error if the rating is not a number between 1 and 5.
   * @throws {Error} Throws an error if the user ID of the reviewee is not provided.
   * @throws {Error} Throws an error if the user ID of the reviewer is not provided.
   */
  createReview: async ({ revieweeId, reviewerId, rating, comment }) => {
    try {
      if (!revieweeId || !reviewerId) {
        throw new Error("User IDs are required to create a review.");
      }

      if (isNaN(rating) || rating < 1 || rating > 5) {
        throw new Error("Rating must be a number between 1 and 5.");
      }

      const newReview = await prisma.review.create({
        data: {
          reviewee_id: revieweeId,
          reviewer_id: reviewerId,
          rating,
          comment,
        },
      });

      return newReview;
    } catch (error) {
      console.error("Error creating review:", error);
      throw new Error("Database operation failed");
    }
  },

  /**
   * Retrieves all reviews from the database.
   * This function queries the database for all reviews and returns them as an array of review objects.
   *
   * @returns {Array} An array of review objects from the database.
   * @throws {Error} Throws an error if the database operation fails.
   */
  getAllReviews: async () => {
    try {
      const reviews = await prisma.review.findMany();
      return reviews;
    } catch (error) {
      console.error("Error retrieving reviews:", error);
      throw new Error("Database operation failed");
    }
  },

  /**
   * Retrieves a list of reviews written for a specific user.
   * This function queries the database for all reviews written about a specific user
   * and returns them as an array of review objects.
   *
   * @param {number} revieweeId - The ID of the user for whom reviews are being retrieved.
   * @returns {Array} An array of review objects written about the specified user.
   * @throws {Error} Throws an error if the database operation fails.
   * @throws {Error} Throws an error if the user ID is not provided.
   */
  getReviewsByRevieweeId: async (revieweeId) => {
    try {
      if (!revieweeId) {
        throw new Error("User ID is required to retrieve reviews.");
      }

      const reviews = await prisma.review.findMany({
        where: {
          reviewee_id: revieweeId,
        },
      });

      return reviews;
    } catch (error) {
      console.error("Error retrieving reviews:", error);
      throw new Error("Database operation failed");
    }
  },

  /**
   * Retrieves a list of reviews written by a specific user.
   * This function queries the database for all reviews written by a specific user
   * and returns them as an array of review objects.
   *
   * @param {number} reviewerId - The ID of the user who wrote the reviews.
   * @returns {Array} An array of review objects written by the specified user.
   * @throws {Error} Throws an error if the database operation fails.
   * @throws {Error} Throws an error if the user ID is not provided.
   */
  getReviewsByReviewerId: async (reviewerId) => {
    try {
      if (!reviewerId) {
        throw new Error("User ID is required to retrieve reviews.");
      }

      const reviews = await prisma.review.findMany({
        where: {
          reviewer_id: reviewerId,
        },
      });

      return reviews;
    } catch (error) {
      console.error("Error retrieving reviews:", error);
      throw new Error("Database operation failed");
    }
  },

  /**
   * Retrieves a specific review from the database.
   * This function takes the ID of a review and returns the corresponding review object.
   * If the review is not found, an error is thrown.
   * @param {number} reviewId - The ID of the review to retrieve.
   * @returns {Object} The review object.
   * @throws {Error} Throws an error if the review is not found.
   * @throws {Error} Throws an error if the database operation fails.
   * @throws {Error} Throws an error if the review ID is not provided.
   */
  getReviewById: async (reviewId) => {
    try {
      if (!reviewId) {
        throw new Error("Review ID is required to retrieve a review.");
      }

      const review = await prisma.review.findUnique({
        where: {
          id: reviewId,
        },
      });

      if (!review) {
        throw new Error("Review not found");
      }

      return review;
    } catch (error) {
      console.error("Error retrieving review:", error);
      throw new Error("Database operation failed");
    }
  },

  /**
   * Updates an existing review in the database.
   * This function takes an object containing the review ID, the numerical rating, and a text comment,
   * and updates the corresponding review record in the database.
   *
   * @param {number} reviewId - The ID of the review to update.
   * @param {Object} reviewData - The data needed to update the review.
   * @param {number} reviewData.rating - The numerical rating given in the review.
   * @param {string} reviewData.comment - The textual comment of the review.
   * @returns {Object} A promise that resolves to the updated review object.
   * @throws {Error} Throws an error if the database operation fails.
   * @throws {Error} Throws an error if the review ID is not provided.
   */
  updateReview: async (reviewId, { rating, comment }) => {
    try {
      if (!reviewId) {
        throw new Error("Review ID is required to update a review.");
      }

      if (isNaN(rating) || rating < 1 || rating > 5) {
        throw new Error("Rating must be a number between 1 and 5.");
      }

      const updatedReview = await prisma.review.update({
        where: {
          id: reviewId,
        },
        data: {
          rating,
          comment,
        },
      });

      return updatedReview;
    } catch (error) {
      console.error("Error updating review:", error);
      throw new Error("Database operation failed");
    }
  },

  /**
   * Deletes an existing review from the database.
   * This function takes the ID of a review and deletes the corresponding record from the database.
   *
   * @param {number} reviewId - The ID of the review to delete.
   * @returns {Object} A promise that resolves to the deleted review object.
   * @throws {Error} Throws an error if the database operation fails.
   * @throws {Error} Throws an error if the review ID is not provided.
   */
  deleteReview: async (reviewId) => {
    try {
      if (!reviewId) {
        throw new Error("Review ID is required to delete a review.");
      }

      const deletedReview = await prisma.review.delete({
        where: {
          id: reviewId,
        },
      });

      return deletedReview;
    } catch (error) {
      console.error("Error deleting review:", error);
      throw new Error("Database operation failed");
    }
  },
};

module.exports = ReviewDao;
