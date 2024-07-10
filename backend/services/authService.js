// services/authService.js
const bcrypt = require('bcrypt');
const User = require('../models/User');

async function createUser(email, username, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, username, password: hashedPassword });
    return newUser.save();
}

async function findUserByUsername(username) {
    return User.findOne({ username });
}

async function findUserByEmail(email){
    return User.findOne({ email });
}

module.exports = {
    createUser,
    findUserByUsername,
    findUserByEmail
};
