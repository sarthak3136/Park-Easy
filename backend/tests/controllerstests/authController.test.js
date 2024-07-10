const authController = require('../../controllers/authController');
const authService = require('../../services/authService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

jest.mock('../../services/authService');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('Auth Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    // it('should register a new user', async () => {
    //   const req = { body: { email: 'test@example.com', username: 'testuser', password: 'password123' } };
    //   const res = { status: jest.fn().mockReturnThis(), send: jest.fn() }; 

    //   authService.createUser.mockResolvedValueOnce();

    //   await authController.register(req, res);

    //   expect(res.status).toHaveBeenCalledWith(201);
    //   expect(res.send).toHaveBeenCalledWith({ email: 'test@example.com', username: 'testuser' });
    //   expect(authService.createUser).toHaveBeenCalledWith('test@example.com', 'testuser', 'password123');
    // });

    it('should handle registration error', async () => {
      const req = { body: { email: 'test@example.com', username: 'testuser', password: 'password123' } };
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() }; 

      authService.createUser.mockRejectedValueOnce();

      await authController.register(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Error registering user');
    });
  });

  describe('login', () => {
    it('should log in a user with valid credentials', async () => {
      const req = { body: { email: 'test@example.com', password: 'password123' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const mockUser = { _id: 'user123', username: 'testuser', password: 'hashedPassword' };
      authService.findUserByEmail.mockResolvedValueOnce(mockUser);
      bcrypt.compare.mockResolvedValueOnce(true);
      jwt.sign.mockReturnValueOnce('mockedToken');

      await authController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ email: 'test@example.com', username: 'testuser', token: 'mockedToken' });
      expect(authService.findUserByEmail).toHaveBeenCalledWith('test@example.com');
      expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword');
      expect(jwt.sign).toHaveBeenCalledWith({ userId: 'user123' }, 'your_secret_key');
    });

    it('should handle user not found during login', async () => {
      const req = { body: { email: 'test@example.com', password: 'password123' } };
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

      authService.findUserByEmail.mockResolvedValueOnce(null);

      await authController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith('User not found');
      expect(authService.findUserByEmail).toHaveBeenCalledWith('test@example.com');
    });

    it('should handle invalid password during login', async () => {
      const req = { body: { email: 'test@example.com', password: 'password123' } };
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

      const mockUser = { _id: 'user123', username: 'testuser', password: 'hashedPassword' };
      authService.findUserByEmail.mockResolvedValueOnce(mockUser);
      bcrypt.compare.mockResolvedValueOnce(false);

      await authController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.send).toHaveBeenCalledWith('Invalid password');
      expect(authService.findUserByEmail).toHaveBeenCalledWith('test@example.com');
      expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword');
    });

    it('should handle login error', async () => {
      const req = { body: { email: 'test@example.com', password: 'password123' } };
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

      authService.findUserByEmail.mockRejectedValueOnce();

      await authController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Error logging in');
      expect(authService.findUserByEmail).toHaveBeenCalledWith('test@example.com');
    });
  });});
