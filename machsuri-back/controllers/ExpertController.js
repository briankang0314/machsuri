const ExpertService = require("../services/ExpertService");
const errorGenerator = require("../utils/errorGenerator");

const sendExperts = async (req, res) => {
  try {
    const search = req.query;
    const experts = await ExpertService.sendExperts(search);
    return res.status(200).json(experts);
  } catch (err) {
    return res.status(500).json({ message: "SERVER_ERROR" });
  }
};

const signUpDirect = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      phoneNumber,
      minorCategoryId,
      detailAddress,
    } = req.body;

    if (
      !name ||
      typeof name !== "string" ||
      !email ||
      typeof email !== "string" ||
      !password ||
      typeof password !== "string" ||
      !phoneNumber ||
      !minorCategoryId ||
      typeof minorCategoryId !== "object" ||
      !detailAddress ||
      typeof detailAddress !== "string"
    ) {
      throw await errorGenerator({ statusCode: 400, message: "KEY_ERROR" });
    }

    await ExpertService.signUpDirect(
      name,
      email,
      password,
      phoneNumber,
      minorCategoryId,
      detailAddress
    );

    return res.status(201).json({ message: "SIGNUP_SUCCESS" });
  } catch (error) {
    return res.status(500).json({ message: "SERVER_ERROR" });
  }
};

const signUp = async (req, res, next) => {
  try {
    const { token } = req.headers;

    const { phoneNumber, minorCategoryId, detailAddress } = req.body;

    if (!token) {
      throw await errorGenerator({ statusCode: 400, message: "KEY_ERROR" });
    }

    if (
      !phoneNumber ||
      !minorCategoryId ||
      typeof minorCategoryId !== "object" ||
      !detailAddress
    ) {
      throw await errorGenerator({ statusCode: 400, message: "KEY_ERROR" });
    }

    await ExpertService.signUp(
      token,
      phoneNumber,
      minorCategoryId,
      detailAddress
    );

    return res.status(201).json({ message: "SIGNUP_SUCCESS" });
  } catch (error) {
    return res.status(500).json({ message: "SERVER_ERROR" });
  }
};

const getExpertProfile = async (req, res, next) => {
  try {
    const { id } = req.expert;
    const expert = await ExpertService.getExpertProfile(Number(id));
    return res.status(201).json({
      message: "SUCCESS",
      expert,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const setExpertProfile = async (req, res, next) => {
  try {
    const { type, value, user } = req.body;
    // const { user } = req;
    if (!type || !value || !user) {
      throw await errorGenerator({
        statusCode: 400,
        message: "KEY_ERROR",
      });
    }
    await ExpertService.setExpertProfile({ type, value, user });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const getExpertsByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;

    const getExperts = await ExpertService.getExpertsByCategory(category);

    return res.status(200).json({ message: "SUCCESS", getExperts });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const sendExpertDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const expertDetail = await ExpertService.sendExpertDetail(id);
    return res.status(200).json(expertDetail);
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

module.exports = {
  sendExperts,
  signUp,
  signUpDirect,
  getExpertProfile,
  setExpertProfile,
  getExpertsByCategory,
  sendExpertDetail,
};
