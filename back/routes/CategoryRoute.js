const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/CategoryController");
const userValidateToken = require("../middleware/userValidateToken");

const validateCategoryInput = (req, res, next) => {
  const { name } = req.body;
  if (!name || name.length < 3) {
    return res
      .status(400)
      .json({ message: "Category name must be at least 3 characters long." });
  }
  next();
};

// Route to post a new major category.
// Open to all users without authentication.
router.post(
  "/major-categories",
  userValidateToken,
  validateCategoryInput,
  CategoryController.addMajorCategory
);

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
  userValidateToken,
  CategoryController.changeMajorCategoryName
);

// Route to post a new minor category under a major category.
// Open to all users without authentication.
router.post(
  "/major-categories/:majorCategoryId/minor-categories",
  userValidateToken,
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
  "/major-categories/:majorCategoryId/minor-categories",
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
  userValidateToken,
  CategoryController.changeMinorCategoryName
);

module.exports = router;
