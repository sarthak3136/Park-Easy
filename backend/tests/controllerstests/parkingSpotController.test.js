const parkingSpotController = require('../../controllers/parkingSpotController');
const parkingSpotService = require('../../services/parkingSpotService');

jest.mock('../../services/parkingSpotService');

describe('ParkingSpot Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // describe('createParkingSpot', () => {
  //   it('should create a new parking spot and return status 201 with the created spot', async () => {
  //     const req = {
  //       body: {
  //         address: '123 Main St',
  //         coordinates: { lat: '40.1234', lng: '-74.5678' },
  //         duration: 'daily',
  //         price: '15',
  //         totalSpots: '10',
  //         imgUrl: 'https://example.com/image.jpg',
  //         userName: 'user123',
  //         email: 'user@example.com'
  //       }
  //     };
  //     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

  //     const mockCreatedSpot = {
  //       _id: 'spot123',
  //       address: '123 Main St',
  //       coordinates: { lat: '40.1234', lng: '-74.5678' },
  //       duration: 'daily',
  //       price: '15',
  //       totalSpots: '10',
  //       imgUrl: 'https://example.com/image.jpg',
  //       userName: 'user123',
  //       email: 'user@example.com'
  //     };
  //     parkingSpotService.createParkingSpot.mockResolvedValueOnce(mockCreatedSpot);

  //     await parkingSpotController.createParkingSpot(req, res);

  //     expect(res.status).toHaveBeenCalledWith(201);
  //     expect(res.json).toHaveBeenCalledWith(mockCreatedSpot);
  //     expect(parkingSpotService.createParkingSpot).toHaveBeenCalledWith({
  //       address: '123 Main St',
  //       coordinates: { lat: '40.1234', lng: '-74.5678' },
  //       duration: 'daily',
  //       price: '15',
  //       totalSpots: '10',
  //       imgUrl: 'https://example.com/image.jpg',
  //       userName: 'user123',
  //       email: 'user@example.com'
  //     });
  //   });
      
  // });

  describe('getAllParkingSpots', () => {
    it('should get all parking spots and return status 200 with all spots', async () => {
      const req = {};
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const mockAllParkingSpots = [
        {
          _id: 'spot1',
          address: '456 Elm St',
          coordinates: { lat: '42.5678', lng: '-71.1234' },
          duration: 'hourly',
          price: '10',
          totalSpots: '5',
          imgUrl: 'https://example.com/spot1.jpg',
          userName: 'user456',
          email: 'user456@example.com'
        },
        {
          _id: 'spot2',
          address: '789 Oak St',
          coordinates: { lat: '38.8765', lng: '-79.4321' },
          duration: 'monthly',
          price: '20',
          totalSpots: '8',
          imgUrl: 'https://example.com/spot2.jpg',
          userName: 'user789',
          email: 'user789@example.com'
        }
      ];
      parkingSpotService.getAllParkingSpots.mockResolvedValueOnce(mockAllParkingSpots);

      await parkingSpotController.getAllParkingSpots(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockAllParkingSpots);
      expect(parkingSpotService.getAllParkingSpots).toHaveBeenCalled();
    });
  });
});
