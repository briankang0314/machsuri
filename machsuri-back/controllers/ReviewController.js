const ReviewService = require("../services/ReviewService");

const sendPreview = async (req, res, next) => {
  try {
    const expertId = req.params.id;
    const reviews = await ReviewService.sendPreview(expertId);

    return res.status(200).json({ message: "SUCCESS", reviews });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const sendReviews = async (req, res, next) => {
  try {
    const expertId = req.params.id;
    const reviews = await ReviewService.sendReviews(expertId);

    return res.status(200).json({ message: "SUCCESS", reviews });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = { sendPreview, sendReviews };
