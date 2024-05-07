const express = require("express");
const router = express.Router();

const UserRoute = require("./UserRoute");
const JobRoute = require("./JobRoute");
const ApplicationRoute = require("./ApplicationRoute");

router.get("/", (req, res) =>
  res.status(200).json({ message: "Hello! You are connected." })
);

router.use("/users", UserRoute);
router.use("/jobs", JobRoute);
router.use("/applications", ApplicationRoute);

module.exports = router;
