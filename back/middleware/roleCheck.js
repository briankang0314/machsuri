const errorGenerator = require("../utils/errorGenerator");

const roleCheck = (requiredRoles) => {
  return async (req, res, next) => {
    try {
      const userRole = req.user.role;
      if (!requiredRoles.includes(userRole)) {
        throw errorGenerator({
          statusCode: 403,
          message: "ACCESS_DENIED",
        });
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};

module.exports = roleCheck;
