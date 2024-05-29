const express = require("express");
const router = express.Router();
const LocationController = require("../controllers/LocationController");

// Route to retrieve all regions, including the cities in each region.
// Open to all users without authentication.
router.get("/regions", LocationController.listRegions);

// Route to retrieve a region by ID.
// Open to all users without authentication.
router.get("/regions/:regionId", LocationController.findRegionById);

// Route to retrieve a region by name.
// Open to all users without authentication.
router.get("/regions/name/:regionName", LocationController.findRegionByName);

// Route to retrieve all cities.
// Open to all users without authentication.
router.get("/cities", LocationController.listCities);

// Route to retrieve all cities in a region.
// Open to all users without authentication.
router.get("/regions/:regionId/cities", LocationController.listCitiesByRegion);

// Route to retrieve a city by ID.
// Open to all users without authentication.
router.get("/cities/:cityId", LocationController.findCityById);

// Route to retrieve a city by name.
// Open to all users without authentication.
router.get("/cities/name/:cityName", LocationController.findCityByName);

module.exports = router;
