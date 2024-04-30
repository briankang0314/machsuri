const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// const errorGenerator = require("../utils/errorGenerator");

const getAddress = async () => {
  return await prisma.address.findMany({
    select: {
      id: true,
      name: true,
      detailAddress: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};

const sendExpertAddress = async (id) => {
  return await prisma.$queryRaw`
  select a.name as addressName, d.name as detailAddressName
  from address a, detailAddress d, experts e 
  where e.id = ${id}
  and e.addressId = a.id
  and e.detailAddressId = d.id;
  `;
};

module.exports = {
  getAddress,
  sendExpertAddress,
};
