const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  name: String,
  comment: String,
  stars: Number,
  postId: String,
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
