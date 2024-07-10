// paymentController.test.js
const paymentController = require('../../controllers/payController');
const paymentService = require('../../services/payService');

jest.mock('../../services/payService');

describe('paymentController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle payment and return status 200 or 500 based on paymentService result', async () => {
    const req = { 
      body: { price: 50, address: '123 Main St', userName: 'user123', to: 'receiver123' },
      get: jest.fn().mockReturnValueOnce('http://example.com')
    };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    const mockPaymentResult = { success: true, message: 'Payment successful' };
    paymentService.createPayment.mockResolvedValueOnce(mockPaymentResult);

    await paymentController.payment(req, res);

    expect(req.get).toHaveBeenCalledWith('origin');
    expect(paymentService.createPayment).toHaveBeenCalledWith(50, '123 Main St', 'user123', 'receiver123', 'http://example.com');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockPaymentResult);
  });

  it('should handle payment error and return status 500 with an error message', async () => {
    const req = { 
      body: { price: 50, address: '123 Main St', userName: 'user123', to: 'receiver123' },
      get: jest.fn().mockReturnValueOnce('http://example.com')
    };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    const mockError = new Error('Payment failed');
    paymentService.createPayment.mockRejectedValueOnce(mockError);

    await paymentController.payment(req, res);

    expect(req.get).toHaveBeenCalledWith('origin');
    expect(paymentService.createPayment).toHaveBeenCalledWith(50, '123 Main St', 'user123', 'receiver123', 'http://example.com');
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Payment failed' });
  });

  it('should get payments and return status 200 or 500 based on paymentService result', async () => {
    const req = { params: { userName: 'user123' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    const mockPaymentResult = { success: true, payments: [{ amount: 20, date: '2023-01-01' }] };
    paymentService.getPaymentsByUserName.mockResolvedValueOnce(mockPaymentResult);

    await paymentController.getPayments(req, res);

    expect(paymentService.getPaymentsByUserName).toHaveBeenCalledWith('user123');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockPaymentResult);
  });

  it('should handle get payments error and return status 500 with an error message', async () => {
    const req = { params: { userName: 'user123' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    const mockError = new Error('Failed to retrieve payments');
    paymentService.getPaymentsByUserName.mockRejectedValueOnce(mockError);

    await paymentController.getPayments(req, res);

    expect(paymentService.getPaymentsByUserName).toHaveBeenCalledWith('user123');
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Internal Server Error' });
  });
});
