// models/CategoryDao.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const CategoryDao = {
  /**
   * Creates a new major category in the database using the provided name.
   * @param {string} name - The name of the major category to be created.
   * @returns {Object} The newly created major category.
   * @throws Will throw an error if the database operation fails.
   */
  createMajorCategory: async (name) => {
    try {
      return await prisma.majorCategory.create({
        data: { name },
      });
    } catch (error) {
      console.error("Error creating major category:", error);
      throw new Error("Failed to create major category.");
    }
  },

  /**
   * Retrieves all major categories from the database.
   * @returns {Array} An array of all major categories.
   * @throws Will throw an error if the database operation fails.
   */
  getMajorCategories: async () => {
    try {
      return await prisma.majorCategory.findMany();
    } catch (error) {
      console.error("Error getting major categories:", error);
      throw new Error("Failed to get major categories.");
    }
  },

  /**
   * Retrieves a major category by its ID from the database.
   * @param {number} id - The ID of the major category to be retrieved.
   * @returns {Object} The major category with the provided ID.
   * @throws Will throw an error if the database operation fails.
   */
  getMajorCategoryById: async (id) => {
    try {
      return await prisma.majorCategory.findUnique({
        where: { id },
      });
    } catch (error) {
      console.error("Error getting major category by ID:", error);
      throw new Error("Failed to get major category by ID.");
    }
  },

  /**
   * Retrieves a major category by its name from the database.
   * @param {string} name - The name of the major category to be retrieved.
   * @returns {Object} The major category with the provided name.
   * @throws Will throw an error if the database operation fails.
   */
  getMajorCategoryByName: async (name) => {
    try {
      return await prisma.majorCategory.findUnique({
        where: { name },
      });
    } catch (error) {
      console.error("Error getting major category by name:", error);
      throw new Error("Failed to get major category by name.");
    }
  },

  /**
   * Updates the name of a major category in the database.
   * @param {number} majorCategoryId - The ID of the major category to update.
   * @param {string} newName - The new name for the major category.
   * @throws Will throw an error if the database operation fails.
   */
  updateMajorCategoryName: async (majorCategoryId, newName) => {
    try {
      await prisma.majorCategory.update({
        where: { id: majorCategoryId },
        data: { name: newName },
      });
    } catch (error) {
      console.error("Error updating major category name:", error);
      throw new Error("Failed to update major category name.");
    }
  },

  /**
   * Creates a new minor category in the database using the provided name and major category ID.
   * @param {string} name - The name of the minor category to be created.
   * @param {number} majorCategoryId - The ID of the major category to which the minor category belongs.
   * @returns {Object} The newly created minor category.
   * @throws Will throw an error if the database operation fails.
   */
  createMinorCategory: async (name, majorCategoryId) => {
    try {
      return await prisma.minorCategory.create({
        data: { name, majorCategoryId },
      });
    } catch (error) {
      console.error("Error creating minor category:", error);
      throw new Error("Failed to create minor category.");
    }
  },

  /**
   * Retrieves all minor categories from the database.
   * @returns {Array} An array of all minor categories.
   * @throws Will throw an error if the database operation fails.
   */
  getMinorCategories: async () => {
    try {
      return await prisma.minorCategory.findMany();
    } catch (error) {
      console.error("Error getting minor categories:", error);
      throw new Error("Failed to get minor categories.");
    }
  },

  /**
   * Retrieves a minor category by its ID from the database.
   * @param {number} id - The ID of the minor category to be retrieved.
   * @returns {Object} The minor category with the provided ID.
   * @throws Will throw an error if the database operation fails.
   */
  getMinorCategoryById: async (id) => {
    try {
      return await prisma.minorCategory.findUnique({
        where: { id },
      });
    } catch (error) {
      console.error("Error getting minor category by ID:", error);
      throw new Error("Failed to get minor category by ID.");
    }
  },

  /**
   * Retrieves a minor category by its name from the database.
   * @param {string} name - The name of the minor category to be retrieved.
   * @returns {Object} The minor category with the provided name.
   * @throws Will throw an error if the database operation fails.
   */
  getMinorCategoryByName: async (name) => {
    try {
      return await prisma.minorCategory.findUnique({
        where: { name },
      });
    } catch (error) {
      console.error("Error getting minor category by name:", error);
      throw new Error("Failed to get minor category by name.");
    }
  },

  /**
   * Updates the name of a minor category in the database.
   * @param {number} minorCategoryId - The ID of the minor category to update.
   * @param {string} newName - The new name for the minor category.
   * @throws Will throw an error if the database operation fails.
   */
  updateMinorCategoryName: async (minorCategoryId, newName) => {
    try {
      await prisma.minorCategory.update({
        where: { id: minorCategoryId },
        data: { name: newName },
      });
    } catch (error) {
      console.error("Error updating minor category name:", error);
      throw new Error("Failed to update minor category name.");
    }
  },
};

module.exports = CategoryDao;
