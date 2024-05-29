const LocationService = require("../services/LocationService");
const errorGenerator = require("../utils/errorGenerator");

/**
 * Controller to retrieve all regions, including the cities in each region.
 * @param {Request} req - The Express Request object.
 * @param {Response} res - The Express Response object.
 */
const listRegions = async (req, res) => {
  try {
    const regions = await LocationService.getRegions();
    res.status(200).json(regions);
  } catch (error) {
    console.error("Failed to get regions:", error);
    const err = await errorGenerator({
      statusCode: error || 500,
      message: error.message || "Internal Server Error",
    });
    res.status(err.statusCode).json({ message: err.message });
  }
};

/**
 * Controller to retrieve a region by its ID.
 * @param {Request} req - The Express Request object.
 * @param {Response} res - The Express Response object.
 */
const findRegionById = async (req, res) => {
  const { regionId } = req.params;

  try {
    const region = await LocationService.getRegionById(Number(regionId));
    res.status(200).json(region);
  } catch (error) {
    console.error("Failed to get region by ID:", error);
    const err = await errorGenerator({
      statusCode: error.statusCode || 500,
      message: error.message || "Internal Server Error",
    });
    res.status(err.statusCode).json({ message: err.message });
  }
};

/**
 * Controller to retrieve a region by its name.
 * @param {Request} req - The Express Request object.
 * @param {Response} res - The Express Response object.
 */
const findRegionByName = async (req, res) => {
  const { name } = req.params;

  try {
    const region = await LocationService.getRegionByName(name);
    res.status(200).json(region);
  } catch (error) {
    console.error("Failed to get region by name:", error);
    const err = await errorGenerator({
      statusCode: error.statusCode || 500,
      message: error.message || "Internal Server Error",
    });
    res.status(err.statusCode).json({ message: err.message });
  }
};

/**
 * Controller to retrieve all cities.
 * @param {Request} req - The Express Request object.
 * @param {Response} res - The Express Response object.
 */
const listCities = async (req, res) => {
  try {
    const cities = await LocationService.getCities();
    res.status(200).json(cities);
  } catch (error) {
    console.error("Failed to get cities:", error);
    const err = await errorGenerator({
      statusCode: error.statusCode || 500,
      message: error.message || "Internal Server Error",
    });
    res.status(err.statusCode).json({ message: err.message });
  }
};

/**
 * Controller to retrieve all cities in a region.
 * @param {Request} req - The Express Request object.
 * @param {Response} res - The Express Response object.
 */
const listCitiesByRegion = async (req, res) => {
  const { regionId } = req.params;

  try {
    const cities = await LocationService.getCitiesByRegion(Number(regionId));
    res.status(200).json(cities);
  } catch (error) {
    console.error("Failed to get cities by region:", error);
    const err = await errorGenerator({
      statusCode: error.statusCode || 500,
      message: error.message || "Internal Server Error",
    });
    res.status(err.statusCode).json({ message: err.message });
  }
};

/**
 * Controller to retrieve a city by its ID.
 * @param {Request} req - The Express Request object.
 * @param {Response} res - The Express Response object.
 */
const findCityById = async (req, res) => {
  console.log(req.params);
  const { cityId } = req.params;

  try {
    const city = await LocationService.getCityById(Number(cityId));
    res.status(200).json(city);
  } catch (error) {
    console.error("Failed to get city by ID:", error);
    const err = await errorGenerator({
      statusCode: error.statusCode || 500,
      message: error.message || "Internal Server Error",
    });
    res.status(err.statusCode).json({ message: err.message });
  }
};

/**
 * Controller to retrieve a city by its name.
 * @param {Request} req - The Express Request object.
 * @param {Response} res - The Express Response object.
 */
const findCityByName = async (req, res) => {
  const { name } = req.params;

  try {
    const city = await LocationService.getCityByName(name);
    res.status(200).json(city);
  } catch (error) {
    console.error("Failed to get city by name:", error);
    const err = await errorGenerator({
      statusCode: error.statusCode || 500,
      message: error.message || "Internal Server Error",
    });
    res.status(err.statusCode).json({ message: err.message });
  }
};

module.exports = {
  listRegions,
  findRegionById,
  findRegionByName,
  listCities,
  listCitiesByRegion,
  findCityById,
  findCityByName,
};
