const createNotification = require('../controllers/notificationController')
const express = require('express');
const router = express.Router();

router.post('/createNotification', createNotification);

module.exports = router;
