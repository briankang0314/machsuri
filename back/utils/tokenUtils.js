const jwt = require("jsonwebtoken");
const errorGenerator = require("./errorGenerator");

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return decoded;
  } catch (error) {
    throw errorGenerator({
      statusCode: 401,
      message: "INVALID_TOKEN",
    });
  }
};

module.exports = {
  verifyToken,
};
