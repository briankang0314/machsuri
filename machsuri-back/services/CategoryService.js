const CategoryDao = require("../models/CategoryDao");
// const errorGenerator = require("../utils/errorGenerator");

const getCategory = async () => {
  return await CategoryDao.getCategory();
};

const sendMinorCat = async (id) => {
  try {
    return await CategoryDao.sendMinorCat(id);
  } catch (error) {
    throw await error;
  }
};

module.exports = { getCategory, sendMinorCat };
