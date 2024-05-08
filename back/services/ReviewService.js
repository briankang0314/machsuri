const ReviewDao = require("../models/ReviewDao");

/**
 * Posts a new review with the provided details.
 * Throws an error if any required fields are missing or if there's a database error.
 * @param {number} revieweeId - The ID of the user who is being reviewed.
 * @param {number} reviewerId - The ID of the user writing the review.
 * @param {number} rating - The numerical rating given in the review.
 * @param {string} comment - The textual comment of the review.
 * @returns {Object} The newly created review object.
 */
const postReview = async (revieweeId, reviewerId, rating, comment) => {
  // Validate input to ensure no essential details are missing.
  if (!revieweeId || !reviewerId || !rating || !comment) {
    throw new Error("Required fields missing");
  }

  // Calls the ReviewDao to create a new review in the database.
  try {
    const newReview = await ReviewDao.createReview({
      revieweeId,
      reviewerId,
      rating,
      comment,
    });

    // Return the newly created review object.
    return newReview;
  } catch (error) {
    console.error("Service Error: Failed to post review:", error);
    throw new Error("Failed to create review: " + error.message);
  }
};

/**
 * Retrieves all reviews from the database.
 * Can throw an error if there are no reviews found or if there's a database error.
 * @returns {Array} An array of review objects.
 */
const getAllReviews = async () => {
  try {
    const reviews = await ReviewDao.getAllReviews();
    return reviews;
  } catch (error) {
    console.error("Service Error: Failed to get reviews:", error);
    throw new Error("Failed to retrieve reviews: " + error.message);
  }
};

/**
 * Retrieves all reviews for a specific user from the database.
 * Can throw an error if there are no reviews found or if there's a database error.
 * @param {number} userId - The ID of the user to retrieve reviews for.
 * @returns {Array} An array of review objects for the specified user.
 * @throws {Error} Throws an error if the user ID is not provided.
 */
const getReviewsForUser = async (userId) => {
  // Validate input to ensure the user ID is provided.
  if (!userId) {
    throw new Error("User ID is required");
  }

  // Calls the ReviewDao to retrieve all reviews for the specified user.
  try {
    const reviews = await ReviewDao.getReviewsByRevieweeId(userId);
    return reviews;
  } catch (error) {
    console.error("Service Error: Failed to get reviews for user:", error);
    throw new Error("Failed to retrieve reviews for user: " + error.message);
  }
};

/**
 * Retrieves all reviews written by a specific user from the database.
 * Can throw an error if there are no reviews found or if there's a database error.
 * @param {number} userId - The ID of the user who wrote the reviews.
 * @returns {Array} An array of review objects written by the specified user.
 * @throws {Error} Throws an error if the user ID is not provided.
 */
const getReviewsByUser = async (userId) => {
  // Validate input to ensure the user ID is provided.
  if (!userId) {
    throw new Error("User ID is required");
  }

  // Calls the ReviewDao to retrieve all reviews written by the specified user.
  try {
    const reviews = await ReviewDao.getReviewsByReviewerId(userId);
    return reviews;
  } catch (error) {
    console.error("Service Error: Failed to get reviews by user:", error);
    throw new Error("Failed to retrieve reviews by user: " + error.message);
  }
};

/**
 * Retrieves a review by its ID from the database.
 * Throws an error if the review is not found or if there's a database error.
 * @param {number} reviewId - The ID of the review to retrieve.
 * @returns {Object} The review object.
 */
const getReviewById = async (reviewId) => {
  // Validate input to ensure the review ID is provided.
  if (!reviewId) {
    throw new Error("Review ID is required");
  }

  // Calls the ReviewDao to retrieve the specified review by its ID.
  try {
    const review = await ReviewDao.getReviewById(reviewId);
    return review;
  } catch (error) {
    console.error("Service Error: Failed to get review:", error);
    throw new Error("Failed to retrieve review: " + error.message);
  }
};

/**
 * Updates an existing review with new data.
 * Throws an error if the review is not found or if there's a database error.
 * @param {number} reviewId - The ID of the review to update.
 * @param {Object} reviewData - The new data to update the review with.
 * @returns {Object} The updated review object.
 */
const updateReview = async (reviewId, reviewData) => {
  // Calls the ReviewDao to update the specified review with new data.
  const updatedReview = await ReviewDao.updateReview(reviewId, reviewData);
  if (!updatedReview) {
    throw new Error("Review not found");
  }
  // Returns the updated review object.
  return updatedReview;
};

/**
 * Deletes a review from the database.
 * Throws an error if the review is not found or if there's a database error.
 * @param {number} reviewId - The ID of the review to delete.
 * @returns {Object} The deleted review object.
 */
const deleteReview = async (reviewId) => {
  // Calls the ReviewDao to delete the specified review.
  const deletedReview = await ReviewDao.deleteReview(reviewId);
  if (!deletedReview) {
    throw new Error("Review not found");
  }
  // Returns the deleted review object.
  return deletedReview;
};

module.exports = {
  postReview,
  getAllReviews,
  getReviewsForUser,
  getReviewsByUser,
  getReviewById,
  updateReview,
  deleteReview,
};
