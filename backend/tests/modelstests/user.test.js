// tests/modelsTests/userModel.test.js
const mongoose = require('mongoose');
const User = require('../../models/User');

describe('User Model', () => {
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
    expect(User).toBeDefined();
  });

  it('should have required fields', async () => {
    const user = new User({
      email: 'test543210@example.com',
      username: 'testuser543210',
      password: 'password123',
    });

    const savedUser = await user.save();

    expect(savedUser._id).toBeDefined();
    expect(savedUser.email).toBe('test543210@example.com');
    expect(savedUser.username).toBe('testuser543210');
    expect(savedUser.password).toBe('password123');
  });

  it('should not validate if required fields are missing', async () => {
    const user = new User({});

    let validationError;
    try {
      await user.validate();
    } catch (error) {
      validationError = error;
    }

    expect(validationError).toBeDefined();
    expect(validationError.errors.email).toBeDefined();
    expect(validationError.errors.username).toBeDefined();
    expect(validationError.errors.password).toBeDefined();
  });

  
});
