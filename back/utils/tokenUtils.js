const jwt = require("jsonwebtoken");
const errorGenerator = require("../utils/errorGenerator");

const verifyToken = (token) => {
  try {
    console.log("Token to verify:", token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("Decoded token:", decoded);
    return decoded;
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      console.error("Token verification failed: token expired");
      throw errorGenerator({
        statusCode: 401,
        message: "TOKEN_EXPIRED",
      });
    } else {
      console.error("Token verification failed:", err.message);
      throw errorGenerator({
        statusCode: 401,
        message: "INVALID_TOKEN",
      });
    }
  }
};

module.exports = { verifyToken };
