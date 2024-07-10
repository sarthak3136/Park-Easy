const Support = require('../../models/supportModel');
const supportService = require('../../services/supportService');

jest.mock('../../models/supportModel');

describe('SupportService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a support request successfully', async () => {
    const mockSupportData = {
      email: 'test@example.com',
      phone: '1234567890',
      message: 'This is a test support request.',
    };

    const saveMock = jest.fn().mockResolvedValueOnce(mockSupportData);
    Support.prototype.save.mockImplementationOnce(saveMock);

    const result = await supportService.createSupportRequest(
      mockSupportData.email,
      mockSupportData.phone,
      mockSupportData.message
    );

    expect(Support).toHaveBeenCalledWith(mockSupportData);
    expect(saveMock).toHaveBeenCalled();
    expect(result).toEqual(mockSupportData);
  });

  it('should handle support request creation error', async () => {
    const mockError = new Error('Failed to create support request');
    Support.prototype.save.mockRejectedValueOnce(mockError);

    await expect(
      supportService.createSupportRequest('test@example.com', '1234567890', 'Error test message')
    ).rejects.toThrow('Failed to create support request');
  });
});
