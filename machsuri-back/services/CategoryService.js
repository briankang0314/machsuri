const CategoryDao = require("../models/CategoryDao");

const listCategories = async () => {
  try {
    return await CategoryDao.getAllCategories();
  } catch (error) {
    throw new Error("Failed to retrieve categories");
  }
};

const findCategory = async (id) => {
  try {
    const category = await CategoryDao.getCategoryById(id);
    if (!category) {
      throw new Error("Category not found");
    }
    return category;
  } catch (error) {
    throw new Error("Failed to retrieve the category");
  }
};

module.exports = {
  listCategories,
  findCategory,
};
