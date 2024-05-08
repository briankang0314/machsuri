const ReviewService = require("../services/ReviewService");
const errorGenerator = require("../utils/errorGenerator");

const validateReviewOwner = async (req, res, next) => {
  try {
    const user = req.user;
    const reviewId = req.params.reviewId;

    const review = await ReviewService.getReviewById(reviewId);
    if (!review) {
      throw await errorGenerator({
        statusCode: 404,
        message: "Review not found",
      });
    }

    if (review.reviewer_id !== user.id) {
      throw await errorGenerator({
        statusCode: 403,
        message: "Unauthorized to update this review",
      });
    }

    next();
  } catch (error) {
    console.error("Review ownership validation error:", error);
    res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

module.exports = validateReviewOwner;
