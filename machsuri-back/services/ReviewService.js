const ReviewDao = require("../models/ReviewDao");
const ExpertDao = require("../models/ExpertDao");
const errorGenerator = require("../utils/errorGenerator");

const sendPreview = async (expertId) => {
  try {
    // expertId가 expert테이블에 있는지 확인
    const isExpert = await ExpertDao.isExpert(expertId);
    if (isExpert.length === 0) {
      throw await errorGenerator({
        statusCode: 400,
        message: "MASTER_DOES_NOT_EXIST",
      });
    }

    const reviews = await ReviewDao.sendPreview(expertId);

    return reviews;
  } catch (error) {
    throw await error;
  }
};

const sendReviews = async (expertId) => {
  try {
    // expertId가 expert테이블에 있는지 확인
    const isExpert = await ExpertDao.isExpert(expertId);
    if (isExpert.length === 0) {
      throw await errorGenerator({
        statusCode: 400,
        message: "MASTER_DOES_NOT_EXIST",
      });
    }

    const reviews = await ReviewDao.sendReviews(expertId);

    return reviews;
  } catch (error) {
    throw await error;
  }
};

module.exports = { sendPreview, sendReviews };
