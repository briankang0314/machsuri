const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const errorGenerator = require("../utils/errorGenerator");

const uploadReviewImage = async (reviewId, reviewImageAddr) => {
  try {
    return await prisma.$queryRaw`
      INSERT INTO reviewImages (reviewId, reviewImage)
      VALUES
      (${reviewId}, ${reviewImageAddr});
    `;
  } catch (error) {
    throw await errorGenerator({ statusCode: 500, message: "SERVER_ERROR" });
  }
};

module.exports = { uploadReviewImage };
