const jwt = require("jsonwebtoken");
const errorGenerator = require("../utils/errorGenerator");
const UserService = require("../services/UserService");

const userValidateToken = async (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw errorGenerator({
        statusCode: 400,
        message: "TOKEN_UNDEFINED",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Check if the user ID exists in the decoded token
    const { id } = decoded;
    if (!id) {
      throw errorGenerator({
        statusCode: 400,
        message: "INCORRECT_TOKEN",
      });
    }

    // Verify if the user exists in the database
    const user = await UserService.getUserByUserId(id);
    if (!user) {
      throw errorGenerator({
        statusCode: 404,
        message: "USER_NOT_FOUND",
      });
    }

    // Attach user to the request object
    req.user = user;
    next();
  } catch (err) {
    console.error("Token validation error:", err);
    res
      .status(err.statusCode || 500)
      .json({ message: err.message || "Internal server error" });
  }
};

module.exports = userValidateToken;
