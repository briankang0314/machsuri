const LocationDao = require("../models/LocationDao");

/**
 * Retrieves all regions from the database, including the cities in each region.
 * @returns {Array} An array of all regions.
 */
const getRegions = async () => {
  return LocationDao.getRegions();
};

/**
 * Retrieves a region by its ID.
 * @param {number} id - The ID of the region to be retrieved.
 * @returns {Object} The region with the provided ID.
 * @throws {Error} If no region is found with the given ID.
 */
const getRegionById = async (id) => {
  const region = await LocationDao.getRegionById(id);
  if (!region) {
    throw new Error("Region not found.");
  }
  return region;
};

/**
 * Retrieves a region by its name.
 * @param {string} name - The name of the region to be retrieved.
 * @returns {Object} The region with the provided name.
 * @throws {Error} If no region is found with the given name.
 */
const getRegionByName = async (name) => {
  const region = await LocationDao.getRegionByName(name);
  if (!region) {
    throw new Error("Region not found.");
  }
  return region;
};

/**
 * Retrieves all cities from the database.
 * @returns {Array} An array of city objects.
 * @throws {Error} If the database operation fails.
 */
const getCities = async () => {
  return LocationDao.getCities();
};

/**
 * Retrieves all cities in a region.
 * @param {number} regionId - The ID of the region.
 * @returns {Array} An array of city objects.
 * @throws {Error} If the database operation fails.
 */
const getCitiesByRegion = async (regionId) => {
  return LocationDao.getCitiesByRegion(regionId);
};

/**
 * Retrieves a city by its ID.
 * @param {number} id - The ID of the city.
 * @returns {Object} The city object.
 * @throws {Error} If no city is found with the given ID.
 */
const getCityById = async (id) => {
  console.log("(LocationService) id", id);
  const city = await LocationDao.getCityById(id);
  if (!city) {
    throw new Error("City not found.");
  }
  return city;
};

/**
 * Retrieves a city by its name.
 * @param {string} name - The name of the city.
 * @returns {Object} The city object.
 * @throws {Error} If no city is found with the given name.
 */
const getCityByName = async (name) => {
  const city = await LocationDao.getCityByName(name);
  if (!city) {
    throw new Error("City not found.");
  }
  return city;
};

module.exports = {
  getRegions,
  getRegionById,
  getRegionByName,
  getCities,
  getCitiesByRegion,
  getCityById,
  getCityByName,
};
