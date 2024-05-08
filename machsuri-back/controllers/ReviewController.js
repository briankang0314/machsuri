const ReviewService = require("../services/ReviewService");
const errorGenerator = require("../utils/errorGenerator");

/**
 * Controller to handle the creation of a new review.
 * Validates required inputs and uses the review management service to create the review.
 *
 * @param {Object} req - The HTTP request object, containing review details in req.body.
 * @param {Object} res - The HTTP response object used to send responses.
 */
const postReview = async (req, res) => {
  const { revieweeId, reviewerId, rating, comment } = req.body;

  // Validate that all necessary fields are provided
  if (!revieweeId || !reviewerId || !rating || !comment) {
    const error = await errorGenerator({
      statusCode: 400,
      message: "All fields are required",
    });
    return res.status(error.statusCode).json({ message: error.message });
  }

  try {
    // Call service to create review and send successful response
    const newReview = await ReviewService.postReview(
      revieweeId,
      reviewerId,
      rating,
      comment
    );
    res.status(201).json(newReview);
  } catch (error) {
    // Handle specific and general errors with more granularity
    console.error("Failed to create review:", error);
    const err = await errorGenerator({
      statusCode: error.statusCode || 500,
      message: error.message || "Internal server error",
    });
    res.status(err.statusCode).json({ message: err.message });
  }
};

/**
 * Controller to retrieve all reviews from the database.
 * Sends a response with the array of review objects.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object used to send responses.
 */
const getAllReviews = async (req, res) => {
  try {
    // Call service to retrieve all reviews and send successful response
    const reviews = await ReviewService.getAllReviews();
    res.status(200).json(reviews);
  } catch (error) {
    // Handle specific and general errors with more granularity
    console.error("Failed to get reviews:", error);
    const err = await errorGenerator({
      statusCode: error.statusCode || 500,
      message: error.message || "Internal server error",
    });
    res.status(err.statusCode).json({ message: err.message });
  }
};

/**
 * Controller to retrieve all reviews for a specific user.
 * Filters reviews based on the user ID provided in the request.
 *
 * @param {Object} req - The HTTP request object, containing the user ID in req.params.
 * @param {Object} res - The HTTP response object used to send responses.
 */
const getReviewsForUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    // Call service to retrieve reviews for user and send successful response
    const reviews = await ReviewService.getReviewsForUser(userId);
    res.status(200).json(reviews);
  } catch (error) {
    // Handle specific and general errors with more granularity
    console.error("Failed to get reviews for user:", error);
    const err = await errorGenerator({
      statusCode: error.statusCode || 500,
      message: error.message || "Internal server error",
    });
    res.status(err.statusCode).json({ message: err.message });
  }
};

/**
 * Controller to retrieve all reviews written by a specific user.
 * Filters reviews based on the user ID provided in the request.
 *
 * @param {Object} req - The HTTP request object, containing the user ID in req.params.
 * @param {Object} res - The HTTP response object used to send responses.
 */
const getReviewsByUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    // Call service to retrieve reviews by user and send successful response
    const reviews = await ReviewService.getReviewsByUser(userId);
    res.status(200).json(reviews);
  } catch (error) {
    // Handle specific and general errors with more granularity
    console.error("Failed to get reviews by user:", error);
    const err = await errorGenerator({
      statusCode: error.statusCode || 500,
      message: error.message || "Internal server error",
    });
    res.status(err.statusCode).json({ message: err.message });
  }
};

/**
 * Controller to retrieve a review by its ID.
 *
 * @param {Object} req - The HTTP request object, containing the review ID in req.params.
 * @param {Object} res - The HTTP response object used to send responses.
 */
const getReviewById = async (req, res) => {
  const reviewId = req.params.reviewId;

  try {
    // Call service to retrieve review by ID and send successful response
    const review = await ReviewService.getReviewById(reviewId);
    res.status(200).json(review);
  } catch (error) {
    // Handle specific and general errors with more granularity
    console.error("Failed to get review by ID:", error);
    const err = await errorGenerator({
      statusCode: error.statusCode || 500,
      message: error.message || "Internal server error",
    });
    res.status(err.statusCode).json({ message: err.message });
  }
};

/**
 * Controller to update an existing review.
 * Validates required inputs and uses the review management service to update the review.
 *
 * @param {Object} req - The HTTP request object, containing review details in req.body.
 * @param {Object} res - The HTTP response object used to send responses.
 */
const updateReview = async (req, res) => {
  const { reviewId, reviewData } = req.body;
  // Validate that all necessary fields are provided
  if (!reviewId || !reviewData) {
    const error = await errorGenerator({
      statusCode: 400,
      message: "Review ID and review data are required",
    });
    return res.status(error.statusCode).json({ message: error.message });
  }
  try {
    // Call service to update review and send successful response
    const updatedReview = await ReviewService.updateReview(
      reviewId,
      reviewData
    );
    res.status(200).json(updatedReview);
  } catch (error) {
    // Handle specific and general errors with more granularity
    console.error("Failed to update review:", error);
    const err = await errorGenerator({
      statusCode: error.statusCode || 500,
      message: error.message || "Internal server error",
    });
    res.status(err.statusCode).json({ message: err.message });
  }
};

/**
 * Deletes a review from the database.
 * Throws an error if the review is not found or if there's a database error.
 *
 * @param {Object} req - The HTTP request object, containing review ID in req.params.
 * @param {Object} res - The HTTP response object used to send responses.
 */
const deleteReview = async (req, res) => {
  const reviewId = req.params.reviewId;
  try {
    // Call service to delete review and send successful response
    const deletedReview = await ReviewService.deleteReview(reviewId);
    res.status(200).json(deletedReview);
  } catch (error) {
    // Handle specific and general errors with more granularity
    console.error("Failed to delete review:", error);
    const err = await errorGenerator({
      statusCode: error.statusCode || 500,
      message: error.message || "Internal server error",
    });
    res.status(err.statusCode).json({ message: err.message });
  }
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
