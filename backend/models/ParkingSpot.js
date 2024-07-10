// models/ParkingSpot.js
const mongoose = require('mongoose');

const parkingSpotSchema = new mongoose.Schema({
    address: { type: String, required: true },
    coordinates: {
        lat: { type: String, required: true },
        lng: { type: String, required: true }
    },
    duration: { type: String, required: true },
    price: { type: String, required: true },
    totalSpots: { type: String, required: true },
    imgUrl: String,
    userName: { type: String, required: true },
    email: { type: String, required: true }
});

parkingSpotSchema.statics.getAllParkingSpots = function () {
    return this.find();
};

const ParkingSpot = mongoose.model('ParkingSpot', parkingSpotSchema);

module.exports = ParkingSpot;
