const CategoryService = require("../services/CategoryService");
const errorGenerator = require("../utils/errorGenerator"); // Ensure the path is correct based on your project structure

const getAllCategories = async (req, res) => {
  try {
    const categories = await CategoryService.listCategories();
    res.json(categories);
  } catch (error) {
    const err = await errorGenerator({
      statusCode: 500,
      message: error.message,
    });
    res.status(err.statusCode).json({ message: err.message });
  }
};

const getCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await CategoryService.findCategory(id);
    res.json(category);
  } catch (error) {
    const err = await errorGenerator({
      statusCode: 404,
      message: error.message || "Category not found",
    });
    res.status(err.statusCode).json({ message: err.message });
  }
};

module.exports = {
  getAllCategories,
  getCategory,
};
