const jwt = require("jsonwebtoken");

const ValidateToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(403).json({ message: "로그인이 필요합니다." });
  }

  jwt.verify(authorization, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res
        .status(403)
        .json({ success: false, message: err.message, result: "WRONG_TOKEN" });
    }
    if (!decoded.id) {
      return res
        .status(403)
        .json({
          success: false,
          message: "Invalid token: User ID missing",
          result: "INVALID_TOKEN",
        });
    }
    req.userId = decoded.id; // Attach user ID to request object
    next();
  });
};

module.exports = { ValidateToken };
