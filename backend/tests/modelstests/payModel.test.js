const mongoose = require('mongoose');
const Payment = require('../../models/payModel');

describe('Payment Model', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb+srv://parkeasy123:parkeasy123@userparkeasy.olqblp4.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should be defined', () => {
    expect(Payment).toBeDefined();
  });

  it('should have required fields', async () => {
    const payment = new Payment({
      price: 100,
      address: '123 Main St',
      userName: 'user123',
      to: 'recipient',
    });

    let error;
    try {
      await payment.validate();
    } catch (e) {
      error = e;
    }

    expect(error).toBeUndefined();
  });

  it('should have correct data types', async () => {
    const payment = new Payment({
      price: 100,
      address: '123 Main St',
      userName: 'user123',
      to: 'recipient',
    });

    expect(payment.price).toEqual(100);
    expect(typeof payment.price).toBe('number');
    expect(payment.address).toEqual('123 Main St');
    expect(typeof payment.address).toBe('string');
    expect(payment.userName).toEqual('user123');
    expect(typeof payment.userName).toBe('string');
    expect(payment.to).toEqual('recipient');
    expect(typeof payment.to).toBe('string');
  });
});
