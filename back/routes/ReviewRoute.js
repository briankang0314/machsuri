const express = require("express");
const router = express.Router();
const ReviewController = require("../controllers/ReviewController");
const userValidateToken = require("../middleware/userValidateToken");
const validateReviewOwner = require("../middleware/validateReviewOwnership");

// Route to post a new review.
// Uses the userValidateToken middleware to ensure the user is authenticated as a user.
router.post("/", userValidateToken, ReviewController.postReview);

// Route to retrieve all reviews.
// Open to all users without authentication.
router.get("/", ReviewController.getAllReviews);

// Route to retrieve reviews for a specific user.
// Open to all users without authentication.
router.get("/for/:userId", ReviewController.getReviewsForUser);

// Route to retrieve reviews written by a specific user.
// Open to all users without authentication.
router.get("/by/:userId", ReviewController.getReviewsByUser);

// Route to retrieve a specific review.
// Open to all users without authentication.
router.get("/:reviewId", ReviewController.getReviewById);

// Route to update an existing review.
// Uses the userValidateToken middleware to ensure only the reviewer can update the review.
router.put(
  "/:reviewId",
  userValidateToken,
  validateReviewOwner,
  ReviewController.updateReview
);

// Route to delete a review.
// Uses the userValidateToken middleware to ensure only the reviewer can delete the review.
router.delete(
  "/:reviewId",
  userValidateToken,
  validateReviewOwner,
  ReviewController.deleteReview
);

module.exports = router;
