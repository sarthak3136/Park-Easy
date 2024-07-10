const mongoose = require('mongoose');
const Notification = require('../../models/Notification');

describe('Notification Model', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb+srv://parkeasy123:parkeasy123@userparkeasy.olqblp4.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should be defined', () => {
    expect(Notification).toBeDefined();
  });

  it('should have required fields', async () => {
    const notification = new Notification({ Id: 'userId123' });

    let error;
    try {
      await notification.validate();
    } catch (e) {
      error = e;
    }

    expect(error).toBeUndefined();
  });

  it('should not validate if required fields are missing', async () => {
    const notification = new Notification();

    let error;
    try {
      await notification.validate();
    } catch (e) {
      error = e;
    }

    expect(error).toBeDefined();
  });

  it('should have correct data types', async () => {
    const notification = new Notification({ Id: 'userId123' });

    expect(notification.Id).toEqual('userId123');
    expect(typeof notification.Id).toBe('string');
  });
});
