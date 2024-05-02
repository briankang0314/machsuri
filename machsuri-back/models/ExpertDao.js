const { PrismaClient } = require("@prisma/client");
const { use } = require("../routes/ExpertRoute");

const prisma = new PrismaClient();

const getExperts = async (search) => {
  const { addressId, minorId, take } = search;
  let data = {};
  data = {
    take: Number(take),
    select: {
      id: true,
      name: true,
      intro: true,
      expertImage: true,
      reviews: {
        select: {
          id: true,
          comment: true,
          grade: true,
          users: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  };
  if (addressId === "null" && minorId === "null") {
    return await prisma.experts.findMany(data);
  } else if (addressId !== "null" && minorId === "null") {
    data.where = {
      detailAddress: {
        id: Number(addressId),
      },
    };
  } else if (addressId === "null" && minorId !== "null") {
    data.where = {
      expertsCategories: {
        some: {
          minorCategories: {
            id: Number(minorId),
          },
        },
      },
    };
  } else {
    data.where = {
      detailAddress: {
        id: Number(addressId),
      },
      expertsCategories: {
        some: {
          minorCategories: {
            id: Number(minorId),
          },
        },
      },
    };
  }
  return await prisma.experts.findMany(data);
};

const findExpertInfo = async (userID) => {
  return await prisma.$queryRaw`
    SELECT id, user_id AS userID, intro, 
    start_time AS startTime, end_time AS endTime,
    work_experience AS workExperience, employee_number AS employeeNumber, 
    is_deleted AS isDeleted,
    created_at AS createdAt, updated_at AS updatedAt
    FROM experts
    WHERE id = ${userID};
  `;
};

const createExpert = async (userID, name, addressID, detailAddressID) => {
  return await prisma.experts.create({
    data: {
      user_id: userID,
      name: name,
      address_id: addressID,
      detail_address_id: detailAddressID,
    },
  });
};

const makeExpertMainCategories = async (expertID, minorCatID) => {
  console.log(minorCatID);
  return minorCatID.map(async (catID) => {
    await prisma.$queryRaw`
        INSERT INTO experts_categories (expert_id, minor_category_id, is_main)
        VALUES
        (${expertID}, ${Number(catID)}, true);
    `;
  });
};

const findExpertAddress = async (address, detailAddress) => {
  const detailAddressID = await prisma.$queryRaw`
      SELECT id FROM detailAddress
      WHERE name = ${detailAddress};
  `;

  return detailAddressId;
};

const getExpertProfile = async (expertId) => {
  return await prisma.experts.findUnique({
    where: {
      id: expertId,
    },
    select: {
      id: true,
      name: true,
      intro: true,
      expert_image: true,
      start_time: true,
      end_time: true,
      work_experience: true,
      employee_number: true,
      address: {
        select: {
          id: true,
          name: true,
        },
      },
      detailAddress: {
        select: {
          id: true,
          name: true,
        },
      },
      expertsCategories: {
        select: {
          id: true,
          is_main: true,
          minorCategories: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
      reviews: {
        select: {
          id: true,
          grade: true,
          comment: true,
          users: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });
};

const sendExpertDetail = async (id) => {
  const expertDetail = await prisma.$queryRaw`
  select id, name, intro, start_time, end_time, work_experience, employee_number
  from experts
  where id=${id};
  `;
  return expertDetail;
};

const setExpertProfile = async (params) => {
  const { type, value, user } = params;

  return await prisma.$queryRaw`
  UPDATE experts t SET t.${type} = ${value} WHERE t.id = ${user.id};
  `;
};

const getExpertByUserId = async (userId) => {
  return await prisma.experts.findUnique({
    where: {
      user_id: userId,
    },
  });
};

const getExpertsByCategory = async (category) => {
  return await prisma.$queryRaw`
  SELECT m.id as expert_id, m.name as expert_name, m.expert_image as image, m.work_experience as recurit, r.grade as star, COUNT(r.id) as review_sum
  FROM experts_categories
  LEFT JOIN experts m ON m.id = experts_categories.expert_id
  LEFT JOIN reviews r ON r.expert_id = experts_categories.expert_id
  WHERE experts_categories.minor_category_id=${category}
  GROUP BY m.id,m.name,m.expert_image, m.work_experience, r.grade;
  `;
};

const isExpert = async (expertID) => {
  return await prisma.$queryRaw`
    SELECT id, name FROM experts WHERE id = ${expertID};
  `;
};

const createUserDirectExpert = async (
  inputName,
  inputEmail,
  inputPW,
  inputPhone
) => {
  return await prisma.users.create({
    data: {
      name: inputName,
      email: inputEmail,
      password: inputPW,
      phone_number: inputPhone,
    },
  });
};

const upgradeUserStatus = async (userID, inputPhone) => {
  return await prisma.$queryRaw`
    UPDATE users SET phone_number = ${inputPhone}
    WHERE id = ${userID};
  `;
};

const findUserInfo = async (inputEmail, inputPhone) => {
  return await prisma.$queryRaw`
    SELECT id, name
    FROM users
    WHERE users.email = ${inputEmail} 
    OR users.phone_number = ${inputPhone};
  `;
};

const findUserName = async (userId) => {
  return await prisma.$queryRaw`
    SELECT name
    FROM users
    WHERE id = ${userId};
  `;
};

const getUserByEmail = async (email) => {
  return await prisma.$queryRaw`
    select id, password from users where email= ${email};`;
};

const crossCheckAddress = async (detailAddress) => {
  return await prisma.$queryRaw`
    SELECT address_id 
    FROM detail_address
    WHERE id = ${detailAddress};
  `;
};

const rollBackSignUp = async (userId) => {
  return await prisma.$queryRaw`
    DELETE FROM users WHERE id = ${userId};
  `;
};

const rollBackUserStatus = async (userId) => {
  return await prisma.$queryRaw`
    UPDATE users SET phone_number = null WHERE id = ${userId};
  `;
};

module.exports = {
  getExperts,
  findExpertInfo,
  createExpert,
  makeExpertMainCategories,
  findExpertAddress,
  sendExpertDetail,
  getExpertProfile,
  setExpertProfile,
  getExpertByUserId,
  getExpertsByCategory,
  isExpert,
  createUserDirectExpert,
  upgradeUserStatus,
  findUserInfo,
  findUserName,
  getUserByEmail,
  crossCheckAddress,
  rollBackSignUp,
  rollBackUserStatus,
};
