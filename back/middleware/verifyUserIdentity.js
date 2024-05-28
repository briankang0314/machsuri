const errorGenerator = require("../utils/errorGenerator");

const verifyUserIdentity = async (req, res, next) => {
  // console.log("Request user ID:", req.user.id);
  // console.log("Requested user ID:", req.params.userId);
  try {
    const loggedInUserId = parseInt(req.user.id);
    const requestedUserId = parseInt(req.params.userId);

    if (loggedInUserId !== requestedUserId) {
      throw errorGenerator({
        statusCode: 403,
        message: "UNAUTHORIZED_ACCESS",
      });
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = verifyUserIdentity;
