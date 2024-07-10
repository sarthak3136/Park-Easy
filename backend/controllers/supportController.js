const supportService = require('../services/supportService');

async function createSupportRequest(req, res) {
    const { email, phone, message } = req.body;
    try {
        await supportService.createSupportRequest(email, phone, message);
        res.status(201).send({ email, phone, message });
    } catch (error) {
        res.status(500).send('Error creating support request');
    }
}

module.exports = {
    createSupportRequest,
};
