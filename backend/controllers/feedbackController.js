const feedbackService = require('../services/feedbackService');

const feedbackController = {
  createFeedback: async (req, res) => {
    try {
      const { name, comment, stars, postId } = req.body;
    

      const newFeedback = await feedbackService.createFeedback({ name, comment, stars, postId });
      res.status(201).json(newFeedback);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  
  getFeedbackByPostId: async (req, res) => {
    try {
      const { postId } = req.body;

      const feedback = await feedbackService.getFeedbackByPostId(postId);

      if (!feedback) {
        return res.status(404).json({ message: 'Feedback not found' });
      }

      const simplifiedFeedback = feedback.map(({ name, comment, stars }) => ({ name, comment, stars }));
      console.log('Response:', simplifiedFeedback);
      
      res.status(200).json(simplifiedFeedback);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

};

module.exports = feedbackController;
