// services/parkingSpotService.js
const ParkingSpot = require('../models/ParkingSpot');

async function createParkingSpot(data) {
    try {
        const newParkingSpot = new ParkingSpot(data);
        return await newParkingSpot.save();
    } catch (error) {
        throw new Error('Error storing parking spot ad');
    }
}

async function getAllParkingSpots() {
    try {
        return await ParkingSpot.getAllParkingSpots();
    } catch (error) {
        throw new Error('Error fetching all parking spots');
    }
}

module.exports = {
    createParkingSpot,
    getAllParkingSpots
};
