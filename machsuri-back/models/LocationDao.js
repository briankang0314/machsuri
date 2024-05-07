const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const LocationDao = {
  /**
   * Retrieves all regions from the database , including the cities in each region.
   * @returns {Array} An array of all regions.
   * @throws Will throw an error if the database operation fails.
   */
  getRegions: async () => {
    try {
      const regions = await prisma.region.findMany({
        include: {
          cities: true, // Includes the list of cities within each region
        },
      });

      if (regions.length === 0) {
        throw new Error("No regions found.");
      }

      return regions;
    } catch (error) {
      console.error("Error getting regions:", error);
      throw new Error("Failed to get regions.");
    }
  },

  /**
   * Retrieves a region by its ID from the database.
   * @param {number} id - The ID of the region to be retrieved.
   * @returns {Object} The region with the provided ID.
   * @throws Will throw an error if the database operation fails.
   */
  getRegionById: async (id) => {
    try {
      const region = await prisma.region.findUnique({
        where: { id },
      });

      if (!region) {
        throw new Error("Region not found.");
      }

      return region;
    } catch (error) {
      console.error("Error getting region by ID:", error);
      throw new Error("Failed to get region by ID.");
    }
  },

  /**
   * Retrieves a region by its name from the database.
   * @param {string} name - The name of the region to be retrieved.
   * @returns {Object} The region with the provided name.
   * @throws Will throw an error if the database operation fails.
   */
  getRegionByName: async (name) => {
    try {
      const region = await prisma.region.findUnique({
        where: { name },
      });

      if (!region) {
        throw new Error("Region not found.");
      }

      return region;
    } catch (error) {
      console.error("Error getting region by name:", error);
      throw new Error("Failed to get region by name.");
    }
  },

  /**
   * Retrieves all cities from the database.
   * @returns {Array} An array of all cities.
   * @throws Will throw an error if the database operation fails.
   */
  getCities: async () => {
    try {
      const cities = await prisma.city.findMany();

      if (cities.length === 0) {
        throw new Error("No cities found.");
      }

      return cities;
    } catch (error) {
      console.error("Error getting cities:", error);
      throw new Error("Failed to get cities.");
    }
  },

  /**
   * Retrieves all cities from the database that belong to the specified region ID.
   * @param {number} regionId - The ID of the region for which to retrieve cities.
   * @returns {Array} An array of cities belonging to the specified region.
   * @throws Will throw an error if the database operation fails.
   */
  getCitiesByRegion: async (regionId) => {
    try {
      const cities = await prisma.city.findMany({
        where: { region_id: regionId }, // Corrected to use region_id which matches the database schema
      });

      if (cities.length === 0) {
        throw new Error("No cities found for the specified region.");
      }

      return cities;
    } catch (error) {
      console.error("Error getting cities by region:", error);
      throw new Error("Failed to get cities by region.");
    }
  },

  /**
   * Retrieves a city by its ID from the database.
   * @param {number} id - The ID of the city to be retrieved.
   * @returns {Object} The city with the provided ID.
   * @throws Will throw an error if the database operation fails.
   */
  getCityById: async (id) => {
    try {
      const city = await prisma.city.findUnique({
        where: { id },
      });

      if (!city) {
        throw new Error("City not found.");
      }

      return city;
    } catch (error) {
      console.error("Error getting city by ID:", error);
      throw new Error("Failed to get city by ID.");
    }
  },

  /**
   * Retrieves a city by its name from the database.
   * @param {string} name - The name of the city to be retrieved.
   * @returns {Object} The city with the provided name.
   * @throws Will throw an error if the database operation fails.
   */
  getCityByName: async (name) => {
    try {
      const city = await prisma.city.findUnique({
        where: { name },
      });

      if (!city) {
        throw new Error("City not found.");
      }

      return city;
    } catch (error) {
      console.error("Error getting city by name:", error);
      throw new Error("Failed to get city by name.");
    }
  },
};

module.exports = LocationDao;
