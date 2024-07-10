const express = require('express');
const supportController = require('../controllers/supportController');

const router = express.Router();

router.post('/create', supportController.createSupportRequest);

module.exports = router;
