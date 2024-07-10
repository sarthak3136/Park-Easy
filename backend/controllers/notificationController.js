const {inAppNotification} = require('../Novu/novu.js')

const Notification = require('../models/Notification.js')

const createNotification = async (req, res) => {
    // const { description } = req.body;
    const { Id } = req.body;
    const newNotif = new Notification({
        Id
    });
    try {
        await newNotif.save();
        await inAppNotification(Id);
        res.status(201).json(newNotif);
    } catch (error) {
        res.status(409).json({ message: error });
    }
}

module.exports = createNotification;