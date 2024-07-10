const bcrypt = require('bcrypt');
const authService = require('../../services/authService');
const User = require('../../models/User');

jest.mock('bcrypt');

describe('AuthService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new user with hashed password', async () => {
    const mockUser = { email: 'test@example.com', username: 'testuser', password: 'hashedPassword' };
    const mockHashedPassword = 'hashedPassword123';
    bcrypt.hash.mockResolvedValueOnce(mockHashedPassword);

    const mockUserSave = jest.fn().mockResolvedValueOnce(mockUser);
    jest.spyOn(User.prototype, 'save').mockImplementationOnce(mockUserSave);

    jest.spyOn(User, 'findOne').mockResolvedValueOnce(null);

    const newUser = await authService.createUser('test@example.com', 'testuser', 'password123');

    expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
    expect(User.prototype.save).toHaveBeenCalled();
    expect(newUser).toEqual(mockUser);
  });
});
