const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/CategoryController");

// Route to post a new major category.
// Open to all users without authentication.
// router.post("/categories", CategoryController.postCategory);

// Route to retrieve major categories with optional filters.
// Open to all users without authentication.
router.get("/categories", CategoryController.listMajorCategories);

// Route to retrieve a major category by ID.
// Open to all users without authentication.
router.get("/categories/:categoryId", CategoryController.findMajorCategoryById);

// Route to retrieve a major category by name.
// Open to all users without authentication.
router.get(
  "/categories/name/:categoryName",
  CategoryController.findMajorCategoryByName
);

// Route to change the name of an existing major category.
// Open to all users without authentication.
// router.put("/categories/:categoryId", CategoryController.changeMajorCategoryName);

// Route to post a new minor category under a major category.
// Open to all users without authentication.
// router.post("/categories/:categoryId/subcategories", CategoryController addMinorCategory);

// Route to retrieve minor categories under a major category.
// Open to all users without authentication.
router.get(
  "/categories/:categoryId/subcategories",
  CategoryController.listMinorCategories
);

// Route to retrieve a minor category by ID.
// Open to all users without authentication.
router.get(
  "/categories/:categoryId/subcategories/:subcategoryId",
  CategoryController.findMinorCategoryById
);

// Route to retrieve a minor category by name.
// Open to all users without authentication.
router.get(
  "/categories/:categoryId/subcategories/name/:subcategoryName",
  CategoryController.findMinorCategoryByName
);

// Route to change the name of an existing minor category.
// Open to all users without authentication.
// router.put("/categories/:categoryId/subcategories/:subcategoryId", CategoryController.changeMinorCategoryName);

module.exports = router;
