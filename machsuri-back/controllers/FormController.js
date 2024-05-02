const FormService = require("../services/FormService");
const errorGenerator = require("../utils/errorGenerator");

const getQuestions = async (req, res, next) => {
  try {
    const { minorId, userId } = req.params;
    if (!minorId) {
      throw await errorGenerator({ statusCode: 400, message: "KEY_ERROR" });
    }

    const questions = await FormService.getQuestions(minorId);

    const checkId = await FormService.getMinorCategoryId(minorId, userId);
    if (checkId.length !== 0) {
      return res
        .status(200)
        .json({ message: "LESSON ALEADY EXIST", questions });
      //throw await errorGenerator({ statusCode: 400, message: "LESSON ALEADY EXIST", questions });
    }

    return res.status(200).json({ message: "SUCCESS", questions });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const postQuestions = async (req, res, next) => {
  try {
    const questionForm = req.body;
    const ret = await FormService.postQuestions(questionForm);

    return res.status(200).json({ message: "SUCCESS" });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = { getQuestions, postQuestions };
