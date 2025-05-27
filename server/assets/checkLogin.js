const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

function checkLogin(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.includes(' ')) {
        return notLoggedIn(res);
    }

    const token = authHeader.split(' ')[1];

    if (token == null) {
        return notLoggedIn(res);
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch(err) {
        return notLoggedIn(res);
    }
}

function notLoggedIn(res) {
    return res.redirect('/login');
}

module.exports = checkLogin;