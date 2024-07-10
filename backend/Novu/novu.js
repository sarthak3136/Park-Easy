const {Novu} = require('@novu/node')

const inAppNotification = async ( Id) => {
    try{
        const novu = new Novu(process.env.NOVU_API_KEY);
        const topicKey = 'posting-created';
        await novu.trigger('on-boarding-notification', {
            to: [{ type: 'Topic', topicKey: topicKey }],
            payload: {description: `New Posting has been posted by ${Id}`},
            actor: { subscriberId: Id },
        });

    } catch (error){
        console.error("Error in inAppNotification:", error.response?.data || error.message);
        throw error;
    }

}

module.exports = {inAppNotification} ;