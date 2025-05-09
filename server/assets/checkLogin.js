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

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            return notLoggedIn(res);
        }

        req.user = user;
        next();
    });
}

function notLoggedIn(res) {
    return res.sendFile('../client/login.html');
}

module.exports = checkLogin;