const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const loginQuery = require('../database/loginQuery');
dotenv.config();

async function login(req, res, pool) {
    const {username, password} = req.body;
    // get any info passed through

    // validate the info
    if (!username || !password) {
        return res.status(400).send({ message: 'Please Check Your Inputs!'});
    }

    const query = loginQuery(
        {username, password}
    );

    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const result = await client.query(query);

        await client.query('COMMIT');

        // Process the result
        if (result.rows.length === 0) {
            return res.status(400).send({ message: 'Invalid Username or Password!'});
        }

        const user = result.rows[0];

        // Generate a JWT token
        const token = jwt.sign({ id: user.account_id }, process.env.SECRET_KEY, { expiresIn: '10m' });
        return res.status(200).send({ token: token });

    } catch(err) {
        await client.query('ROLLBACK');
        console.error(err);
        return res.status(500).send({ message: 'Internal Server Error'});
    } finally {
        client.release();
    }
};

module.exports = login;