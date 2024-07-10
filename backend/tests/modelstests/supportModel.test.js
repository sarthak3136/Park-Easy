const mongoose = require('mongoose');
const Support = require('../../models/supportModel');

describe('Support Model', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb+srv://parkeasy123:parkeasy123@userparkeasy.olqblp4.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should be defined', () => {
    expect(Support).toBeDefined();
  });

  it('should have required fields', async () => {
    const support = new Support({
      email: 'test@example.com',
      phone: '1234567890',
      message: 'Test message',
    });

    let error;
    try {
      await support.validate();
    } catch (e) {
      error = e;
    }

    expect(error).toBeUndefined();
  });

  it('should not validate if required fields are missing', async () => {
    const support = new Support();

    let error;
    try {
      await support.validate();
    } catch (e) {
      error = e;
    }

    expect(error).toBeDefined();
  });

  it('should have correct data types', async () => {
    const support = new Support({
      email: 'test@example.com',
      phone: '1234567890',
      message: 'Test message',
    });

    expect(support.email).toEqual('test@example.com');
    expect(typeof support.email).toBe('string');
    expect(support.phone).toEqual('1234567890');
    expect(typeof support.phone).toBe('string');
    expect(support.message).toEqual('Test message');
    expect(typeof support.message).toBe('string');
  });
});
