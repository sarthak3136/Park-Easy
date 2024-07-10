// controllers/parkingSpotController.js
const parkingSpotService = require('../services/parkingSpotService');
const axios = require('axios');

async function createParkingSpot(req, res) {
    try {
        const {
            address,
            coordinates,
            duration,
            price,
            totalSpots,
            imgUrl,
            userName,
            email
        } = req.body;

        const formattedData = {
            address,
            coordinates,
            duration,
            price,
            totalSpots,
            imgUrl,
            userName,
            email
        };

        const savedSpot = await parkingSpotService.createParkingSpot(formattedData);
        await axios.post('https://parkeasybackend.onrender.com/notifications/createNotification', { Id: email });
        res.status(201).json(savedSpot);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getAllParkingSpots(req, res) {
    try {
        const allParkingSpots = await parkingSpotService.getAllParkingSpots();
        res.status(200).json(allParkingSpots);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createParkingSpot,
    getAllParkingSpots
};
