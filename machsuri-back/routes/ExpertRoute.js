const express = require("express");
const router = express.Router();

const ExpressController = require("../controllers/ExpertController");

const expertValidateToken = require("../middleware/expertValidateToken");
const userValidateToken = require("../middleware/userValidateToken");

// GET
router.get("/profile", expertValidateToken, ExpertController.getExpertProfile);
router.get("/list", ExpertController.sendExperts);
router.get("/main_list/:category", ExpertController.getExpertsByCategory);
router.get("/users/:id", ExpertController.sendExpertDetail);

// POST
router.post("/signup", userValidateToken, ExpertController.signUp);
router.post("/signupdirect", ExpertController.signUpDirect);

// PUT
router.put("/profile", ExpertController.setExpertProfile);

module.exports = router;
