const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getCategory = async () => {
  return await prisma.majorCategories.findMany({
    select: {
      id: true,
      name: true,
      minorCategories: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });
};

const sendMinorCat = async (id) => {
  try {
    return await prisma.$queryRaw`
        SELECT mic.id, mic.name 
        FROM minorCategories mic
        JOIN majorCategories mac
        ON mic.majorCategoryId = mac.id
        WHERE mac.id = ${id};
        `;
  } catch (error) {
    throw await errorGenerator({ statusCode: 500, message: "SERVER_ERROR" });
  }
};

const sendExpertCategory = async (id) => {
  return await prisma.$queryRaw`
  select JSON_ARRAYAGG(mic.name) as minorCategories
  from minorCategories mic, expertsCategories ec
  where ec.expertId = ${id}
  and ec.minorCategoryId = mic.id
  group by ec.expertId
  `;
};

module.exports = { getCategory, sendMinorCat, sendExpertCategory };
