const Feedback = require('../models/Feedback');

const feedbackService = {
  createFeedback: async ({ name, comment, stars, postId }) => {
    try {
      const newFeedback = await Feedback.create({ name, comment, stars, postId });
      return newFeedback;
    } catch (error) {
      //console.error(error);
      throw new Error('Failed to create feedback');
    }
  },
  
  getFeedbackByPostId: async (postId) => {
    try {
      const feedback = await Feedback.find({ postId });
      // console.log(feedback);
      return feedback;
    } catch (error) {
      //console.error(error);
      throw new Error('Failed to get feedback');
    }
  },

};

module.exports = feedbackService;
