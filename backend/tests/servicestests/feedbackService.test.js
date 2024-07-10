// feedbackService.test.js
const Feedback = require('../../models/Feedback');
const feedbackService = require('../../services/feedbackService');

jest.mock('../../models/Feedback');

describe('FeedbackService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create feedback successfully', async () => {
    const mockFeedback = { name: 'John Doe', comment: 'Great service!', stars: 5, postId: 'postId123' };
    Feedback.create.mockResolvedValueOnce(mockFeedback);

    const createdFeedback = await feedbackService.createFeedback(mockFeedback);

    expect(Feedback.create).toHaveBeenCalledWith(mockFeedback);
    expect(createdFeedback).toEqual(mockFeedback);
  });

  it('should handle create feedback error', async () => {
    const mockError = new Error('Failed to create feedback');
    Feedback.create.mockRejectedValueOnce(mockError);

    await expect(async () => {
      await feedbackService.createFeedback({ name: 'John Doe', comment: 'Great service!', stars: 5, postId: 'postId123' });
    }).rejects.toThrow('Failed to create feedback');

    expect(Feedback.create).toHaveBeenCalledWith({ name: 'John Doe', comment: 'Great service!', stars: 5, postId: 'postId123' });
  });

  it('should get feedback by postId successfully', async () => {
    const mockFeedbackList = [
      { name: 'User1', comment: 'Good', stars: 4 },
      { name: 'User2', comment: 'Excellent', stars: 5 }
    ];
    Feedback.find.mockResolvedValueOnce(mockFeedbackList);

    const fetchedFeedback = await feedbackService.getFeedbackByPostId('postId123');

    expect(Feedback.find).toHaveBeenCalledWith({ postId: 'postId123' });
    expect(fetchedFeedback).toEqual(mockFeedbackList);
  });

  it('should handle get feedback error', async () => {
    const mockError = new Error('Failed to get feedback');
    Feedback.find.mockRejectedValueOnce(mockError);

    await expect(async () => {
      await feedbackService.getFeedbackByPostId('postId123');
    }).rejects.toThrow('Failed to get feedback');

    expect(Feedback.find).toHaveBeenCalledWith({ postId: 'postId123' });
  });
});

