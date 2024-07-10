const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

// Define feedback routes
router.post('/create', feedbackController.createFeedback);


router.post('/getFeedback', feedbackController.getFeedbackByPostId);

module.exports = router;
