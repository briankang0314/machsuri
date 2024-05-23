const errorGenerator = require("../utils/errorGenerator");

const roleCheck = (requiredRoles) => {
  return async (req, res, next) => {
    try {
      const userRole = req.user.role;
      console.log("User role:", userRole);
      if (!requiredRoles.includes(userRole)) {
        console.error("Access denied for role:", userRole);
        throw errorGenerator({
          statusCode: 403,
          message: "ACCESS_DENIED",
        });
      }
      next();
    } catch (err) {
      console.error("Error in roleCheck middleware:", err);
      next(err);
    }
  };
};

module.exports = roleCheck;
