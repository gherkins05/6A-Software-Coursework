const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// AUTHENTICATION TOKEN VALIDATION
function authenticate(errorCode, errorMessage) {
    return function (req, res, next) {
        // Gets the Authorization header
        const authHeader = req.headers.authorization;
        console.log('Auth Header: ' + authHeader);

        // Checks for a valid Authorization header
        if (!authHeader || !authHeader.includes(' ')) {
            return res.status(errorCode || 401).send(errorMessage || 'Unauthorized');
        }

        // Splits the header into an array and gets the token
        const token = authHeader && authHeader.split(' ')[1];

        // Checks for a valid token
        if (token == null) {
            return res.status(errorCode || 401).send(errorMessage || 'Unauthorized');
        }

        // Verifies the token
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) {
                return res.status(errorCode || 403).send(errorMessage || 'Forbidden');
            }

            // Attaches the user object to the request
            req.user = user;

            // Passes control to the next middleware function
            next();
        });
    }
};

module.exports = authenticate;