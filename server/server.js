require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

const app = express();

const port = 3000;


app.listen(port, () => console.log(`Server running on port ${port}`));


// Middleware to enforce JSON Accept header
app.use((req, res, next) => {
    if (req.headers.accept.indexOf('application/json') === -1) {
        return res.status(406).send({ message: 'Not Acceptable'});
    }
    next();
});

// Middleware to enforce JSON Content-Type header
app.use((req, res, next) => {
    if (req.method === 'POST' || req.method === 'PUT') {
        if (!req.is('application/json')) {
            return res.status(415).send({ message: 'Unsupported Media Type' });
        }
    }
    next();
});




/*
app.METHOD('endpoint', async (req, res) => {
    const client = await pool.connect();
    // get any info passed through

    // validate the info

    const query = {
        text: `
            SELECT 
                *
            FROM
                table
            WHERE
                column = $1;
        `,
        values: [1, 2, 3, 4, 5]
    };
    try {
        await client.query('BEGIN');

        const result = await client.query(query);

        await client.query('COMMIT');

        // Process the result

        // send a response
        return res.status(201).send({ data: data });
    } catch(err) {
        await client.query('ROLLBACK');
        console.error(err);
        return res.status(500).send({ message: 'Internal Server Error'});
    } finally {
        client.release();
    }
})


*/

app.get('/login', async (req, res) => {
    const {username, password} = req.body;
    // get any info passed through

    // validate the info
    if (!username || !password) {
        return res.status(400).send({ message: 'Please Check Your Inputs!'});
    }

    const query = {
      text: `
            SELECT 
                account_id
            FROM
                account
            WHERE
                username = $1 
                AND password = $2;
        `,
      values: [username, password],
    };

    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const result = await client.query(query);

        await client.query('COMMIT');

        // Process the result
        if (result.rows.length === 0) {
            return res.status(400).send({ message: 'Invalid Username or Password!'});
        }


        // send a response
        return res.status(200);
    } catch(err) {
        await client.query('ROLLBACK');
        console.error(err);
        return res.status(500).send({ message: 'Internal Server Error'});
    } finally {
        client.release();
    }
})