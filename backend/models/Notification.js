const mongoose = require ('mongoose')
const notifSchema = mongoose.Schema(
    {
       // description: { type: String, required: true },
        Id: { type: String, required: true}
    },
    {
        collection: "notif",
    }
);

const Notification = mongoose.model('Notification', notifSchema);

module.exports =  Notification;
