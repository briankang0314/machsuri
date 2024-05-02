const FormDao = require("../models/FormDao");
// const errorGenerator = require("../utils/errorGenerator");

const getQuestions = async (minorId) => {
  return await FormDao.getQuestions(minorId);
};

const getMinorCategoryId = async (minorId, user_id) => {
  return await FormDao.getMinorCategoryId(minorId, user_id);
};

const postQuestions = async (questionForm) => {
  for (let i = 0; i < questionForm.length; i++) {
    await FormDao.postQuestion(questionForm[i]);
  }
};

module.exports = { getQuestions, postQuestions, getMinorCategoryId };
