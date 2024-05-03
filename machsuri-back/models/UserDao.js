const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const UserDao = {
  // Function to create a new user in the database
  createUser: async (name, email, password) => {
    return await prisma.users.create({
      data: {
        name,
        email,
        password,
      },
    });
  },

  // Function to update a user's profile based on their userId
  updateUserProfile: async (userId, profileData) => {
    return await prisma.users.update({
      where: { id: userId },
      data: profileData,
    });
  },

  // Function to retrieve a user by their userId
  getUserById: async (userId) => {
    return await prisma.users.findUnique({
      where: { id: userId },
    });
  },

  // Function to retrieve a user by their email
  getUserByEmail: async (email) => {
    return await prisma.users.findUnique({
      where: { email },
    });
  },

  // Function to authenticate a user using their email and password
  authenticateUser: async (email, password) => {
    // Assuming a custom authentication logic here
    const user = await prisma.users.findUnique({
      where: { email },
    });

    if (user && user.password === password) {
      return user; // Replace with JWT or other session logic as needed
    } else {
      throw new Error("Invalid email or password");
    }
  },

  // Function to update user preferences
  updateUserPreferences: async (userId, preferencesData) => {
    return await prisma.users.update({
      where: { id: userId },
      data: preferencesData,
    });
  },
};

module.exports = UserDao;
