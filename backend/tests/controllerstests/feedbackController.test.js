const feedbackController = require('../../controllers/feedbackController');
const feedbackService = require('../../services/feedbackService');

jest.mock('../../services/feedbackService');

describe('Feedback Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createFeedback', () => {
    it('should create new feedback and return status 201 with the created feedback', async () => {
      const req = { body: { name: 'John Doe', comment: 'Great service!', stars: 5, postId: 'postId123' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const mockCreatedFeedback = { _id: 'feedbackId123', name: 'John Doe', comment: 'Great service!', stars: 5, postId: 'postId123' };
      feedbackService.createFeedback.mockResolvedValueOnce(mockCreatedFeedback);

      await feedbackController.createFeedback(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockCreatedFeedback);
      expect(feedbackService.createFeedback).toHaveBeenCalledWith({
        name: 'John Doe',
        comment: 'Great service!',
        stars: 5,
        postId: 'postId123'
      });
    });

    it('should handle create feedback error and return status 500 with an error message', async () => {
        const req = { body: { name: 'John Doe', comment: 'Great service!', stars: 5, postId: 'postId123' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      
        const mockError = new Error('Internal Server Error');
        feedbackService.createFeedback.mockRejectedValueOnce(mockError);
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      
        await feedbackController.createFeedback(req, res);
      
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
        expect(consoleErrorSpy).toHaveBeenCalledWith(mockError);
      
        consoleErrorSpy.mockRestore();
      });
      
  });

  describe('getFeedbackByPostId', () => {
    it('should get feedback by post ID and return status 200 with simplified feedback', async () => {
        const req = { body: { postId: 'postId123' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      
        const mockFeedback = [
          { _id: 'feedbackId1', name: 'User1', comment: 'Good', stars: 4 },
          { _id: 'feedbackId2', name: 'User2', comment: 'Excellent', stars: 5 }
        ];
        feedbackService.getFeedbackByPostId.mockResolvedValueOnce(mockFeedback);
        const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
      
        await feedbackController.getFeedbackByPostId(req, res);
      
        const simplifiedFeedback = mockFeedback.map(({ name, comment, stars }) => ({ name, comment, stars }));
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(simplifiedFeedback);
        expect(feedbackService.getFeedbackByPostId).toHaveBeenCalledWith('postId123');
        expect(consoleLogSpy).toHaveBeenCalledWith('Response:', simplifiedFeedback);
      
        consoleLogSpy.mockRestore();
      });
      

    it('should handle feedback not found and return status 404 with an error message', async () => {
      const req = { body: { postId: 'postId123' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      feedbackService.getFeedbackByPostId.mockResolvedValueOnce(null);

      await feedbackController.getFeedbackByPostId(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Feedback not found' });
      expect(feedbackService.getFeedbackByPostId).toHaveBeenCalledWith('postId123');
    });

    it('should handle get feedback error and return status 500 with an error message', async () => {
        const req = { body: { postId: 'postId123' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      
        const mockError = new Error('Internal Server Error');
        feedbackService.getFeedbackByPostId.mockRejectedValueOnce(mockError);
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      
        await feedbackController.getFeedbackByPostId(req, res);
      
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
        expect(consoleErrorSpy).toHaveBeenCalledWith(mockError);
        consoleErrorSpy.mockRestore();
      });
      
  });
});
