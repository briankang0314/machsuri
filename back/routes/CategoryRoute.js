const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/CategoryController");

// Route to post a new major category.
// Open to all users without authentication.
router.post("/major-categories", CategoryController.addMajorCategory);

// Route to retrieve major categories, including their minor categories.
// Open to all users without authentication.
router.get("/major-categories", CategoryController.listMajorCategories);

// Route to retrieve a major category by ID.
// Open to all users without authentication.
router.get(
  "/major-categories/:majorCategoryId",
  CategoryController.findMajorCategoryById
);

// Route to retrieve a major category by name.
// Open to all users without authentication.
router.get(
  "/major-categories/name/:majorCategoryName",
  CategoryController.findMajorCategoryByName
);

// Route to change the name of an existing major category.
// Open to all users without authentication.
router.put(
  "/major-categories/:majorCategoryId",
  CategoryController.changeMajorCategoryName
);

// Route to post a new minor category under a major category.
// Open to all users without authentication.
router.post(
  "/major-categories/:majorCategoryId/minor-categories",
  CategoryController.addMinorCategory
);

// Route to retrieve all minor categories.
// Open to all users without authentication.
router.get(
  "/major-categories/:majorCategoryId/minor-categories",
  CategoryController.listMinorCategories
);

// Route to retrieve all minor categories under a major category.
// Open to all users without authentication.
router.get(
  "/categories/:majorCategoryId/minor-categories",
  CategoryController.listMinorCategoriesByMajorCategory
);

// Route to retrieve a minor category by ID.
// Open to all users without authentication.
router.get(
  "/major-categories/:majorCategoryId/minor-categories/:minorCategoryId",
  CategoryController.findMinorCategoryById
);

// Route to retrieve a minor category by name.
// Open to all users without authentication.
router.get(
  "/major-categories/:majorCategoryId/minor-categories/name/:minorCategoryName",
  CategoryController.findMinorCategoryByName
);

// Route to change the name of an existing minor category.
// Open to all users without authentication.
router.put(
  "/major-categories/:majorCategoryId/minor-categories/:minorCategoryId",
  CategoryController.changeMinorCategoryName
);

module.exports = router;
