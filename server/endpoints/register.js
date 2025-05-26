const doesUserExistQuery = require('../database/doesUserExistQuery');
const registerQuery = require('../database/registerQuery');

async function register(req, res, pool) {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            res.status(400).json({ message: 'Username and password are required.' });
            return;
        }

        if (username.length >= 24 || username.length < 8) {
            res.status(400).json({ message: 'Username must be between 8 and 24 characters long.' });
            return;
        }

        if (password.length < 8) {
            res.status(400).json({ message: 'Password must be at least 8 characters long.' });
            return;
        }

        

        const userExist = await pool.query(doesUserExistQuery(username));

        if (parseInt(userExist.rows[0].count, 10) > 0) {
            res.status(400).json({ message: 'Username already exists.' });
            return;
        }

        const result = await pool.query(registerQuery(username, password));

        if (result.rowCount === 0) {
            res.status(500).json({ message: 'Registration failed. Please try again.' });
            return;
        }

        return res.status(200);
    } catch(err) {
        console.error('Registration error:', err);
        res.status(500).json({ message: 'An error occurred while processing your request.' });
        return;
    }
}

module.exports = register;