const errorGenerator = require("../utils/errorGenerator");

const verifyUserIdentity = async (req, res, next) => {
  try {
    const loggedInUserId = req.user.id;
    const requestedUserId = req.params.userId;

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
