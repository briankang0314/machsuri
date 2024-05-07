const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/CategoryController");

// Route to get all categories
router.get("/categories", CategoryController.getAllCategories);
// Route to get a category by its ID
router.get("/categories/:id", CategoryController.getCategory);

module.exports = router;
