const bc = require("bcrypt");
const jwt = require("jsonwebtoken");
const errorGenerator = require("../utils/errorGenerator");

const CategoryDao = require("../models/CategoryDao");
const AddressDao = require("../models/AddressDao");
const ExpertDao = require("../models/ExpertDao");

const sendExperts = async (search) => {
  return await ExpertDao.getExperts(search);
};

const signUpDirect = async (
  name,
  email,
  password,
  phoneNumber,
  minorCategoryId,
  detailAddress
) => {
  try {
    // 사용자 입력값 검증
    if (name.length < 2) {
      throw await errorGenerator({ statusCode: 400, message: "WRONG_NAME" });
    }

    const mailFormat =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    if (!email.match(mailFormat)) {
      throw await errorGenerator({ statusCode: 400, message: "WRONG_EMAIL" });
    }

    const pwFormat = /(?=.*\d)(?=.*[a-zA-ZS]).{8,}/;
    if (!password.match(pwFormat)) {
      throw await errorGenerator({
        statusCode: 400,
        message: "WRONG_PASSWORD",
      });
    }

    const phoneFormat = /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/;
    if (!phoneNumber.match(phoneFormat)) {
      throw await errorGenerator({
        statusCode: 400,
        message: "WRONG_PHONE_NUMBER",
      });
    }

    // 이메일과 번호로 일반 회원이나 전문가로 이미 가입된 사용자인지 확인
    const userInfo = await ExpertDao.findUserInfo(email, phoneNumber);
    if (userInfo.length !== 0) {
      const isExistingExpert = await ExpertDao.findExpertInfo(userInfo[0].id);
      if (isExistingExpert.length !== 0) {
        throw await errorGenerator({
          statusCode: 400,
          message: "EXISTING_EXPERT",
        });
      } else {
        throw await errorGenerator({
          statusCode: 400,
          message: "EXISTING_USER!_PLEASE_LOGIN",
        });
      }
    }

    // 일반 회원으로 가입한 적이 없고 전문가로 가입 신청한 경우, user 테이블에 추가
    const hashedPassword = bc.hashSync(password, bc.genSaltSync());

    const newUserInfo = await ExpertDao.createUserDirectExpert(
      name,
      email,
      hashedPassword,
      phoneNumber
    );
    const userId = newUserInfo.id;

    // 주소가 문자열로 들어왔으면 아이디로 변환
    if (typeof address === "string") {
      const expertAddress = await ExpertDao.findExpertAddress(detailAddress);

      detailAddress = expertAddress.detailAddressId[0].id;
    }

    // 주소 id가 상세 주소 id와 매치되는지 확인
    // const addId = await ExpertDao.crossCheckAddress(detailAddress);
    // if (addId[0].address_id !== address) {
    //   await ExpertDao.rollBackSignUp(userId);
    //   throw await errorGenerator({
    //     statusCode: 400,
    //     message: "ADDRESS_NOT_MATCHED",
    //   });
    // }

    // expert 테이블에 추가
    const expert = await ExpertDao.createExpert(userId, name, detailAddress);

    await ExpertDao.makeExpertMainCategories(expert.id, minorCategoryId);

    return expert;
  } catch (error) {
    throw await error;
  }
};

const signUp = async (token, phoneNumber, minorCategoryId, detailAddress) => {
  try {
    // 사용자 입력값 검증
    const phoneFormat = /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/;
    if (!phoneNumber.match(phoneFormat)) {
      throw await errorGenerator({
        statusCode: 400,
        message: "WRONG_PHONE_NUMBER",
      });
    }

    // 로그인한 토큰을 가지고 유저가 맞는지 확인
    try {
      const isValidUser = jwt.verify(token, process.env.SECRET_KEY);

      await ExpertDao.upgradeUserStatus(isValidUser.id, phoneNumber);
    } catch (error) {
      throw await errorGenerator({
        statusCode: 400,
        message: "INVALID_USER",
      });
    }

    // user ID 가져오기
    const validUser = jwt.verify(token, process.env.SECRET_KEY);
    const userId = validUser.id;

    // 주소가 문자열로 들어왔으면 아이디로 변환
    if (typeof address === "string") {
      const expertAddress = await ExpertDao.findExpertAddress(
        address,
        detailAddress
      );
      address = expertAddress.addressID[0].id;
      detailAddress = expertAddress.detailAddressID[0].id;
    }

    // 주소 id가 상세 주소 id와 매치되는지 확인
    // const addId = await ExpertDao.crossCheckAddress(detailAddress);
    // if (addId[0].address_id !== address) {
    //   await ExpertDao.rollBackUserStatus(userId);
    //   throw await errorGenerator({
    //     statusCode: 400,
    //     message: "ADDRESS_NOT_MATCHED",
    //   });
    // }

    // expert 테이블에 추가
    const userInfo = await ExpertDao.findUserName(userId);
    const expert = await ExpertDao.createExpert(
      userId,
      userInfo[0].name,
      address,
      detailAddress
    );

    await ExpertDao.makeExpertMainCategories(expert.id, minorCatID);

    return expert;
  } catch (error) {
    throw await error;
  }
};

const getExpertProfile = async (expertId) => {
  return await ExpertDao.getExpertProfile(expertId);
};

const setExpertProfile = async (params) => {
  return await ExpertDao.setExpertProfile(params);
};

const getExpertByUserId = async (userId) => {
  return await ExpertDao.getExpertByUserId(userId);
};

const getExpertsByCategory = async (category) => {
  return await ExpertDao.getExpertsByCategory(category);
};

const sendExpertDetail = async (id) => {
  const expertDetail = await ExpertDao.sendExpertDetail(id);
  if (expertDetail.length === 0) {
    throw await errorGenerator({
      statusCode: 404,
      message: "존재하지 않는 사용자입니다.",
    });
  }

  const expertDetailAddress = await AddressDao.sendExpertAddress(id);
  const expertDetailCategory = await CategoryDao.sendExpertCategory(id);
  const expertDetailAll = expertDetail[0];
  expertDetailAll.minor_categories = expertDetailCategory[0].minor_categories;
  expertDetailAll.address = expertDetailAddress[0].address;
  expertDetailAll.detail_address = expertDetailAddress[0].detail_address;
  return expertDetailAll;
};

module.exports = {
  signUp,
  signUpDirect,
  sendExperts,
  getExpertProfile,
  setExpertProfile,
  getExpertByUserId,
  getExpertsByCategory,
  sendExpertDetail,
};
