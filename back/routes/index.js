const express = require("express");
const router = express.Router();

const UserRouter = require("./UserRoute");
const NotificationRouter = require("./NotificationRoute");
const JobRouter = require("./JobRoute");
const ApplicationRouter = require("./ApplicationRoute");
const CategoryRouter = require("./CategoryRoute");
const LocationRouter = require("./LocationRoute");
const ReviewRouter = require("./ReviewRoute");

router.get("/", (req, res) =>
  res.status(200).json({ message: "Hello! You are connected." })
);

// Apply specific routes for different API segments
router.use("/users", UserRouter);
router.use("/jobs", JobRouter);
router.use("/applications", ApplicationRouter);
router.use("/categories", CategoryRouter);
router.use("/locations", LocationRouter);
router.use("/reviews", ReviewRouter);
router.use("/notifications", NotificationRouter);

module.exports = router;
