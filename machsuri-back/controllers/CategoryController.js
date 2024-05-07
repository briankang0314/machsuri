const CategoryService = require("../services/CategoryService");
const errorGenerator = require("../utils/errorGenerator");

/**
 * Controller to handle the creation of a new major category.
 * Validates the name and uses the category service to create the category.
 * @param {Object} req - The HTTP request object, containing the category name in req.body.
 * @param {Object} res - The HTTP response object used to send responses.
 */
const addMajorCategory = async (req, res) => {
  const { name } = req.body;

  // Validate that the name is provided
  if (!name) {
    const error = await errorGenerator({
      statusCode: 400,
      message: "Category name is required",
    });
    return res.status(error.statusCode).json({ message: error.message });
  }

  try {
    // Call service to create major category and send successful response
    const newCategory = await CategoryService.createMajorCategory(name);
    res.status(201).json(newCategory);
  } catch (error) {
    // Handle specific and general errors with more granularity
    console.error("Failed to create major category:", error);
    const err = await errorGenerator({
      statusCode: error.statusCode || 500,
      message: error.message || "Internal server error",
    });
    res.status(err.statusCode).json({ message: err.message });
  }
};

/**
 * Controller to retrieve all major categories.
 * Uses the category service to get the list of major categories.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object used to send responses.
 */
const listMajorCategories = async (req, res) => {
  try {
    // Call service to get all major categories and send successful response
    const categories = await CategoryService.getMajorCategories();
    res.status(200).json(categories);
  } catch (error) {
    // Handle specific and general errors with more granularity
    console.error("Failed to get major categories:", error);
    const err = await errorGenerator({
      statusCode: error.statusCode || 500,
      message: error.message || "Internal server error",
    });
    res.status(err.statusCode).json({ message: err.message });
  }
};

/**
 * Controller to retrieve a major category by its ID.
 * Uses the category service to get the major category by ID.
 * @param {Object} req - The HTTP request object, containing the category ID in req.params.
 * @param {Object} res - The HTTP response object used to send responses.
 */
const findMajorCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    // Call service to get major category by ID and send successful response
    const category = await CategoryService.getMajorCategoryById(Number(id));
    res.status(200).json(category);
  } catch (error) {
    // Handle specific and general errors with more granularity
    console.error("Failed to get major category by ID:", error);
    const err = await errorGenerator({
      statusCode: error.statusCode || 500,
      message: error.message || "Internal server error",
    });
    res.status(err.statusCode).json({ message: err.message });
  }
};

/**
 * Controller to retrieve a major category by its Name.
 * Uses the category service to get the major category by Name.
 * @param {Object} req - The HTTP request object, containing the category Name in req.params.
 * @param {Object} res - The HTTP response object used to send responses.
 */
const findMajorCategoryByName = async (req, res) => {
  const { name } = req.params;

  try {
    // Call service to get major category by Name and send successful response
    const category = await CategoryService.getMajorCategoryByName(name);
    res.status(200).json(category);
  } catch (error) {
    // Handle specific and general errors with more granularity
    console.error("Failed to get major category by Name:", error);
    const err = await errorGenerator({
      statusCode: error.statusCode || 500,
      message: error.message || "Internal server error",
    });
    res.status(err.statusCode).json({ message: err.message });
  }
};

/**
 * Controller to update the name of a major category.
 * Validates the new name and uses the category service to update the category.
 * @param {Object} req - The HTTP request object, containing the category ID and new name in req.body.
 * @param {Object} res - The HTTP response object used to send responses.
 */
const changeMajorCategoryName = async (req, res) => {
  const { id, newName } = req.body;

  // Validate that the ID and new name are provided
  if (!id || !newName) {
    const error = await errorGenerator({
      statusCode: 400,
      message: "Category ID and new name are required",
    });
    return res.status(error.statusCode).json({ message: error.message });
  }

  try {
    // Call service to update major category name and send successful response
    await CategoryService.updateMajorCategoryName(Number(id), newName);
    res
      .status(200)
      .json({ message: "Major category name updated successfully" });
  } catch (error) {
    // Handle specific and general errors with more granularity
    console.error("Failed to update major category name:", error);
    const err = await errorGenerator({
      statusCode: error.statusCode || 500,
      message: error.message || "Internal server error",
    });
    res.status(err.statusCode).json({ message: err.message });
  }
};

/**
 * Controller to handle the creation of a new minor category for a major category.
 * Validates the name and major category ID, and uses the category service to create the category.
 * @param {Object} req - The HTTP request object, containing the category name and major category ID in req.body.
 * @param {Object} res - The HTTP response object used to send responses.
 */
const addMinorCategory = async (req, res) => {
  const { name, majorCategoryId } = req.body;

  // Validate that the name and major category ID are provided
  if (!name || !majorCategoryId) {
    const error = await errorGenerator({
      statusCode: 400,
      message: "Category name and major category ID are required",
    });
    return res.status(error.statusCode).json({ message: error.message });
  }

  try {
    // Call service to create minor category and send successful response
    const newCategory = await CategoryService.createMinorCategory(
      name,
      Number(majorCategoryId)
    );
    res.status(201).json(newCategory);
  } catch (error) {
    // Handle specific and general errors with more granularity
    console.error("Failed to create minor category:", error);
    const err = await errorGenerator({
      statusCode: error.statusCode || 500,
      message: error.message || "Internal server error",
    });
    res.status(err.statusCode).json({ message: err.message });
  }
};

/**
 * Controller to retrieve all minor categories.
 * Uses the category service to get the list of minor categories.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object used to send responses.
 */
const listMinorCategories = async (req, res) => {
  try {
    // Call service to get all minor categories and send successful response
    const categories = await CategoryService.getMinorCategories();
    res.status(200).json(categories);
  } catch (error) {
    // Handle specific and general errors with more granularity
    console.error("Failed to get minor categories:", error);
    const err = await errorGenerator({
      statusCode: error.statusCode || 500,
      message: error.message || "Internal server error",
    });
    res.status(err.statusCode).json({ message: err.message });
  }
};

/**
 * Controller to retrieve a minor category by its ID.
 * Uses the category service to get the minor category by ID.
 * @param {Object} req - The HTTP request object, containing the category ID in req.params.
 * @param {Object} res - The HTTP response object used to send responses.
 */
const findMinorCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    // Call service to get minor category by ID and send successful response
    const category = await CategoryService.getMinorCategoryById(Number(id));
    res.status(200).json(category);
  } catch (error) {
    // Handle specific and general errors with more granularity
    console.error("Failed to get minor category by ID:", error);
    const err = await errorGenerator({
      statusCode: error.statusCode || 500,
      message: error.message || "Internal server error",
    });
    res.status(err.statusCode).json({ message: err.message });
  }
};

/**
 * Controller to retrieve a minor category by its Name.
 * Uses the category service to get the minor category by Name.
 * @param {Object} req - The HTTP request object, containing the category Name in req.params.
 * @param {Object} res - The HTTP response object used to send responses.
 */
const findMinorCategoryByName = async (req, res) => {
  const { name } = req.params;

  try {
    // Call service to get minor category by Name and send successful response
    const category = await CategoryService.getMinorCategoryByName(name);
    res.status(200).json(category);
  } catch (error) {
    // Handle specific and general errors with more granularity
    console.error("Failed to get minor category by Name:", error);
    const err = await errorGenerator({
      statusCode: error.statusCode || 500,
      message: error.message || "Internal server error",
    });
    res.status(err.statusCode).json({ message: err.message });
  }
};

/**
 * Controller to update the name of a minor category.
 * Validates the new name and uses the category service to update the category.
 * @param {Object} req - The HTTP request object, containing the category ID and new name in req.body.
 * @param {Object} res - The HTTP response object used to send responses.
 */
const changeMinorCategoryName = async (req, res) => {
  const { id, newName } = req.body;

  // Validate that the ID and new name are provided
  if (!id || !newName) {
    const error = await errorGenerator({
      statusCode: 400,
      message: "Category ID and new name are required",
    });
    return res.status(error.statusCode).json({ message: error.message });
  }

  try {
    // Call service to update minor category name and send successful response
    await CategoryService.updateMinorCategoryName(Number(id), newName);
    res
      .status(200)
      .json({ message: "Minor category name updated successfully" });
  } catch (error) {
    // Handle specific and general errors with more granularity
    console.error("Failed to update minor category name:", error);
    const err = await errorGenerator({
      statusCode: error.statusCode || 500,
      message: error.message || "Internal server error",
    });
    res.status(err.statusCode).json({ message: err.message });
  }
};

module.exports = {
  addMajorCategory,
  listMajorCategories,
  findMajorCategoryById,
  findMajorCategoryByName,
  changeMajorCategoryName,
  addMinorCategory,
  listMinorCategories,
  findMinorCategoryById,
  findMinorCategoryByName,
  changeMinorCategoryName,
};
