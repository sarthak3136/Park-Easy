// parkingSpotService.test.js
const ParkingSpot = require('../../models/ParkingSpot');
const parkingSpotService = require('../../services/parkingSpotService');

jest.mock('../../models/ParkingSpot');

describe('ParkingSpotService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create parking spot successfully', async () => {
    const mockParkingSpotData = {
      address: '123 Main St',
      coordinates: { lat: '40.1234', lng: '-74.5678' },
      duration: 'daily',
      price: '15',
      totalSpots: '10',
      imgUrl: 'https://example.com/image.jpg',
      userName: 'user123',
      email: 'user@example.com'
    };

    ParkingSpot.prototype.save.mockResolvedValueOnce(mockParkingSpotData);

    const createdParkingSpot = await parkingSpotService.createParkingSpot(mockParkingSpotData);

    expect(ParkingSpot).toHaveBeenCalledWith(mockParkingSpotData);
    expect(ParkingSpot.prototype.save).toHaveBeenCalled();
    expect(createdParkingSpot).toEqual(mockParkingSpotData);
  });

  it('should handle create parking spot error', async () => {
    const mockError = new Error('Error storing parking spot ad');
    ParkingSpot.prototype.save.mockRejectedValueOnce(mockError);

    await expect(async () => {
      await parkingSpotService.createParkingSpot({
        address: '123 Main St',
        coordinates: { lat: '40.1234', lng: '-74.5678' },
        duration: 'daily',
        price: '15',
        totalSpots: '10',
        imgUrl: 'https://example.com/image.jpg',
        userName: 'user123',
        email: 'user@example.com'
      });
    }).rejects.toThrow('Error storing parking spot ad');

    expect(ParkingSpot.prototype.save).toHaveBeenCalled();
  });

  it('should get all parking spots successfully', async () => {
    const mockParkingSpots = [
      { address: 'Location A', duration: 'hourly', price: '10', totalSpots: '5' },
      { address: 'Location B', duration: 'daily', price: '20', totalSpots: '10' }
    ];

    ParkingSpot.getAllParkingSpots.mockResolvedValueOnce(mockParkingSpots);

    const allParkingSpots = await parkingSpotService.getAllParkingSpots();

    expect(ParkingSpot.getAllParkingSpots).toHaveBeenCalled();
    expect(allParkingSpots).toEqual(mockParkingSpots);
  });

  it('should handle get all parking spots error', async () => {
    const mockError = new Error('Error fetching all parking spots');
    ParkingSpot.getAllParkingSpots.mockRejectedValueOnce(mockError);

    await expect(async () => {
      await parkingSpotService.getAllParkingSpots();
    }).rejects.toThrow('Error fetching all parking spots');

    expect(ParkingSpot.getAllParkingSpots).toHaveBeenCalled();
  });
});
