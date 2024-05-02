const CategoryService = require("../services/CategoryService");
const errorGenerator = require("../utils/errorGenerator");

const getCategories = async (req, res, next) => {
  try {
    const categories = await CategoryService.getCategory();

    return res.status(200).json({ message: "SUCCESS", categories });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const sendMinorCat = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!id) {
      throw await errorGenerator({ statusCode: 400, message: "KEY_ERROR" });
    }
    const minorCat = await CategoryService.sendMinorCat(id);
    return res.status(200).json(minorCat);
  } catch (error) {
    return res.status(500).json({ message: "SERVER_ERROR" });
  }
};
module.exports = { getCategories, sendMinorCat };
