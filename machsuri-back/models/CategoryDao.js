// models/CategoryDao.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const CategoryDao = {
  // Retrieves all categories
  getCategories: async () => {
    return await prisma.category.findMany();
  },
  // Retrieves a category by its ID
  getCategoryById: async (id) => {
    return await prisma.category.findUnique({
      where: { id },
    });
  },
};

module.exports = CategoryDao;
