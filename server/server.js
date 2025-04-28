require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

const authenticate = require('./assets/authenticate');


const login = require('./endpoints/login');
const logout = require('./endpoints/logout');

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


// Login Page
app.get('/login', async(req, res) => { login(req, res); });

// Logout Page
app.get('/logout', authenticate(), async (req, res) => { logout(req, res); });

// Get Username
app.get('/getUserName', async(req, res) => {getUserName(req, res); })

// Get game
app.get('/getGame', async(req,res) => {getGame(req, res); })