const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

async function logout(req, res) {
    res.status(200).send({ message: 'User logged out successfully.' });
    //res.redirect('/login');
}

module.exports = logout;