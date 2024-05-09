const CategoryDao = require("../models/CategoryDao");

/**
 * Creates a new major category, ensuring the name is not empty and is unique.
 * @param {string} name - The name of the major category to be created.
 * @returns {Object} The newly created major category object.
 * @throws {Error} If the name is empty or the category already exists.
 */
const createMajorCategory = async (name) => {
  if (!name) {
    throw new Error("Category name cannot be empty.");
  }

  const existingCategory = await CategoryDao.getMajorCategoryByName(name);
  if (existingCategory) {
    throw new Error("A major category with this name already exists.");
  }

  return CategoryDao.createMajorCategory(name);
};

/**
 * Retrieves all major categories, including their associated minor categories.
 * @returns {Array} An array of major category objects.
 */
const getMajorCategories = async () => {
  return CategoryDao.getMajorCategories();
};

/**
 * Retrieves a major category by its ID.
 * @param {number} id - The ID of the major category.
 * @returns {Object} The major category object.
 * @throws {Error} If no major category is found with the given ID.
 */
const getMajorCategoryById = async (id) => {
  const category = await CategoryDao.getMajorCategoryById(id);
  if (!category) {
    throw new Error("Major category not found.");
  }
  return category;
};

/**
 * Updates the name of a major category, ensuring the new name is unique.
 * @param {number} majorCategoryId - The ID of the major category to update.
 * @param {string} newName - The new name for the major category.
 * @returns {Object} The updated major category object.
 * @throws {Error} If the new name is already in use.
 */
const updateMajorCategoryName = async (majorCategoryId, newName) => {
  const existingCategory = await CategoryDao.getMajorCategoryByName(newName);
  if (existingCategory && existingCategory.id !== majorCategoryId) {
    throw new Error("Another major category with this name already exists.");
  }
  await CategoryDao.updateMajorCategoryName(majorCategoryId, newName);
};

/**
 * Creates a new subcategory for a major category.
 * @param {string} name - The name of the subcategory to be created.
 * @param {number} majorCategoryId - The ID of the major category.
 * @returns {Object} The newly created subcategory object.
 * @throws {Error} If the name is empty or the subcategory already exists.
 */
const createMinorCategory = async (name, majorCategoryId) => {
  if (!name) {
    throw new Error("Category name cannot be empty.");
  }

  const existingCategory = await CategoryDao.getMinorCategoryByName(name);
  if (existingCategory) {
    throw new Error("A subcategory with this name already exists.");
  }

  return CategoryDao.createMinorCategory(name, majorCategoryId);
};

/**
 * Retrieves all minor categories.
 * @returns {Array} An array of minor category objects.
 * @throws {Error} If the database operation fails.
 */
const getMinorCategories = async () => {
  return CategoryDao.getMinorCategories();
};

/**
 * Retrieves all minor categories for a major category.
 * @param {number} majorCategoryId - The ID of the major category.
 * @returns {Array} An array of minor category objects.
 * @throws {Error} If the database operation fails.
 */
const getMinorCategoriesByMajorCategory = async (majorCategoryId) => {
  return CategoryDao.getMinorCategoriesByMajorCategory(majorCategoryId);
};

/**
 * Retrieves a minor category by its ID.
 * @param {number} id - The ID of the minor category.
 * @returns {Object} The minor category object.
 * @throws {Error} If no minor category is found with the given ID.
 */
const getMinorCategoryById = async (id) => {
  const category = await CategoryDao.getMinorCategoryById(id);
  if (!category) {
    throw new Error("Minor category not found.");
  }
  return category;
};

/**
 * Retrieves a minor category by its name.
 * @param {string} name - The name of the minor category.
 * @returns {Object} The minor category object.
 * @throws {Error} If no minor category is found with the given name.
 */
const getMinorCategoryByName = async (name) => {
  const category = await CategoryDao.getMinorCategoryByName(name);
  if (!category) {
    throw new Error("Minor category not found.");
  }
  return category;
};

/**
 * Updates the name of a minor category.
 * @param {number} minorCategoryId - The ID of the minor category.
 * @param {string} newName - The new name for the minor category.
 * @returns {Object} The updated minor category object.
 * @throws {Error} If the new name is already in use.
 */
const updateMinorCategoryName = async (minorCategoryId, newName) => {
  const existingCategory = await CategoryDao.getMinorCategoryByName(newName);
  if (existingCategory && existingCategory.id !== minorCategoryId) {
    throw new Error("Another minor category with this name already exists.");
  }
  await CategoryDao.updateMinorCategoryName(minorCategoryId, newName);
};

module.exports = {
  createMajorCategory,
  getMajorCategories,
  getMajorCategoryById,
  updateMajorCategoryName,
  createMinorCategory,
  getMinorCategories,
  getMinorCategoriesByMajorCategory,
  getMinorCategoryById,
  getMinorCategoryByName,
  updateMinorCategoryName,
};
