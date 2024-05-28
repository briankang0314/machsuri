const errorGenerator = require("../utils/errorGenerator");
const UserService = require("../services/UserService");
const jwt = require("jsonwebtoken");

const userValidateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.error("Token not provided or invalid format");
      throw errorGenerator({
        statusCode: 400,
        message: "TOKEN_UNDEFINED",
      });
    }

    const token = authHeader.split(" ")[1];
    console.log("Token received:", token);

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
      if (err) {
        console.error("Error verifying token:", err.message);
        throw errorGenerator({
          statusCode: 403,
          message: "WRONG_TOKEN",
        });
      }

      console.log("Decoded token:", decoded);

      const { id } = decoded;
      if (!id) {
        console.error("Token does not contain user ID");
        throw errorGenerator({
          statusCode: 400,
          message: "INCORRECT_TOKEN",
        });
      }

      const user = await UserService.getUserProfile(id);
      if (!user) {
        console.error("User not found with ID:", id);
        throw errorGenerator({
          statusCode: 404,
          message: "USER_NOT_FOUND",
        });
      }

      req.user = user; // Set the user object in the request
      next();
    });
  } catch (err) {
    console.error("Error in userValidateToken middleware:", err);
    next(err);
  }
};

module.exports = userValidateToken;
