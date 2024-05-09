const errorGenerator = require("../utils/errorGenerator");
const UserService = require("../services/UserService");
const { verifyToken } = require("../utils/tokenUtils");

const userValidateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw errorGenerator({
        statusCode: 400,
        message: "TOKEN_UNDEFINED",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);

    const { id } = decoded;
    if (!id) {
      throw errorGenerator({
        statusCode: 400,
        message: "INCORRECT_TOKEN",
      });
    }

    const user = await UserService.getUserProfile(id);
    if (!user) {
      throw errorGenerator({
        statusCode: 404,
        message: "USER_NOT_FOUND",
      });
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = userValidateToken;
