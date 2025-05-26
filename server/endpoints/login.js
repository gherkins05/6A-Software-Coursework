const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const loginQuery = require('../database/loginQuery');
dotenv.config();

async function login(req, res, pool) {
    const {username, password} = req.body;

    if (!username || !password) {
        return res.status(400).send({ message: 'Username and Password Required'});
    }

    try {
        const result = await pool.query(loginQuery(username, password));

        if (result.rows.length === 0) {
            return res.status(400).send({ message: 'Invalid Username or Password!'});
        }

        const user = result.rows[0];

        const token = jwt.sign({ id: user.account_id }, process.env.SECRET_KEY, { expiresIn: '10m' });
        return res.status(200).send({ token: token });
    } catch(err) {
        console.error(err);
        return res.status(500).send({ message: 'Internal Server Error'});
    }
};

module.exports = login;