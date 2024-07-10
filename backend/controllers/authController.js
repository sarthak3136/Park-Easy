const authService = require('../services/authService');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {Novu} = require('@novu/node');

async function register(req, res) {
    const { email, username, password } = req.body;
    try {
        await authService.createUser(email, username, password);
        const novu = new Novu(process.env.NOVU_API_KEY);
        await novu.subscribers.identify(email, {
            firstName: username,
        });
        // await novu.topics.create({
        //     key: 'posting-created',
        //     name: 'user will receive the notification if the posting is created',
        // });

        await novu.topics.addSubscribers('posting-created', {
            subscribers: [email],
        });

        res.status(201).send({ email: email, username: username });
    } catch (error) {
        res.status(500).send('Error registering user');
    }
}

async function login(req, res) {
    const { email, password } = req.body;
    try {
        const user = await authService.findUserByEmail(email);
        console.log(user)
        if (!user) {
            return res.status(404).send('User not found');
        }
        console.log('Input password:', password);
        console.log('Stored password hash:', user.password);

        const validPassword = await bcrypt.compare(password, user.password);
        console.log('Password comparison result:', validPassword);
          
        if (!validPassword) {
            return res.status(401).send('Invalid password');
        }

        const token = jwt.sign({ userId: user._id }, 'your_secret_key');
        res.status(200).json({ email: email, username: user.username, token });
    } catch (error) {
        res.status(500).send('Error logging in');
    }
}

module.exports = {
    register,
    login,
};
