const express = require("express");
const router = express.Router();

const UserRoute = require("./UserRoute");
const CategoryRoute = require("./CategoryRoute");
const FormRoute = require("./FormRoute");
const ExpertRoute = require("./ExpertRoute");
const AddressRoute = require("./AddressRoute");
const ReviewRoute = require("./ReviewRoute");
const ReceiveRoute = require("./ReceiveRoute");
const ImageRoute = require("./ImageRoute");

router.get("/", (req, res) =>
  res.status(200).json({ message: "Hello! You are connected." })
);

router.use("/users", UserRoute);
router.use("/category", CategoryRoute);
router.use("/form", FormRoute);
router.use("/expert", ExpertRoute);
router.use("/address", AddressRoute);
router.use("/review", ReviewRoute);
router.use("/receive", ReceiveRoute);
router.use("/image", ImageRoute);

module.exports = router;
