const express = require("express");
const router = express.Router();

const UserRoute = require("./UserRoute");
const JobRoute = require("./JobRoute");

router.get("/", (req, res) =>
  res.status(200).json({ message: "Hello! You are connected." })
);

router.use("/users", UserRoute);
router.use("/jobs", JobRoute);

module.exports = router;
