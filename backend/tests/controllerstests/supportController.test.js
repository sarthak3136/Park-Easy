// createSupportRequest.test.js
const supportController = require('../../controllers/supportController');
const supportService = require('../../services/supportService');

jest.mock('../../services/supportService');

describe('createSupportRequest Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a support request and return status 201 with the request details', async () => {
    const req = { body: { email: 'test@example.com', phone: '1234567890', message: 'Help me!' } };
    const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

    await supportController.createSupportRequest(req, res);

    expect(supportService.createSupportRequest).toHaveBeenCalledWith('test@example.com', '1234567890', 'Help me!');
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith({ email: 'test@example.com', phone: '1234567890', message: 'Help me!' });
  });

  it('should handle create support request error and return status 500 with an error message', async () => {
    const req = { body: { email: 'test@example.com', phone: '1234567890', message: 'Help me!' } };
    const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

    const mockError = new Error('Internal Server Error');
    supportService.createSupportRequest.mockRejectedValueOnce(mockError);

    await supportController.createSupportRequest(req, res);

    expect(supportService.createSupportRequest).toHaveBeenCalledWith('test@example.com', '1234567890', 'Help me!');
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith('Error creating support request');
  });
});
