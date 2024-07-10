// tests/modelsTests/parkingSpotModel.test.js
const mongoose = require('mongoose');
const ParkingSpot = require('../../models/ParkingSpot');

describe('ParkingSpot Model', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb+srv://parkeasy123:parkeasy123@userparkeasy.olqblp4.mongodb.net/', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should be defined', () => {
    expect(ParkingSpot).toBeDefined();
  });

  it('should have required fields', async () => {
    const parkingSpot = new ParkingSpot({
      address: '123 Main St',
      coordinates: { lat: '40.1234', lng: '-74.5678' },
      duration: '2 hours',
      price: '10',
      totalSpots: '5',
      userName: 'john_doe',
      email: 'john@example.com',
    });

    const savedParkingSpot = await parkingSpot.save();

    expect(savedParkingSpot._id).toBeDefined();
    expect(savedParkingSpot.address).toBe('123 Main St');
    expect(savedParkingSpot.coordinates.lat).toBe('40.1234');
    expect(savedParkingSpot.coordinates.lng).toBe('-74.5678');
    expect(savedParkingSpot.duration).toBe('2 hours');
    expect(savedParkingSpot.price).toBe('10');
    expect(savedParkingSpot.totalSpots).toBe('5');
    expect(savedParkingSpot.userName).toBe('john_doe');
    expect(savedParkingSpot.email).toBe('john@example.com');
  });

  
});
