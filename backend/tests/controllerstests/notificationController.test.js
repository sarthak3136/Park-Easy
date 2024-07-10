const createNotificationController = require('../../controllers/notificationController');
const Notification = require('../../models/Notification');
const { inAppNotification } = require('../../Novu/novu.js');

jest.mock('../../models/Notification');
jest.mock('../../Novu/novu.js');

describe('createNotification Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new notification and return status 201 with the created notification', async () => {
    const req = { body: { Id: 'userId123' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  
    const mockNotification = { _id: 'notificationId123', Id: 'userId123', save: jest.fn().mockResolvedValueOnce() };
    Notification.mockReturnValueOnce(mockNotification);
  
    await createNotificationController(req, res);
  
    expect(Notification).toHaveBeenCalledWith({ Id: 'userId123' });
    expect(mockNotification.save).toHaveBeenCalled();
    expect(inAppNotification).toHaveBeenCalledWith('userId123');
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockNotification);
  });
  

  it('should handle create notification error and return status 409 with an error message', async () => {
    const req = { body: { Id: 'userId123' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  
    const mockError = new Error('Conflict Error');
    Notification.mockReturnValueOnce({ save: jest.fn().mockRejectedValueOnce(mockError) });
  
    await createNotificationController(req, res);
  
    expect(Notification).toHaveBeenCalledWith({ Id: 'userId123' });
    expect(mockError.message).toBe('Conflict Error');
    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({ message: expect.any(Error) });
  });
  
});
