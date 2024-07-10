const Support = require('../models/supportModel');

async function createSupportRequest(email, phone, message) {
    const newSupportRequest = new Support({ email, phone, message });
    return newSupportRequest.save();
}

module.exports = {
    createSupportRequest,
};
