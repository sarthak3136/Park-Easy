// routes/parkingSpotRoutes.js
const express = require('express');
const router = express.Router();
const parkingSpotController = require('../controllers/parkingSpotController');

router.post('/parking-spots', parkingSpotController.createParkingSpot);
router.get('/parking-spots', parkingSpotController.getAllParkingSpots);

module.exports = router;
