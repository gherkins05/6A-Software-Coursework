require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

const authenticate = require('./assets/authenticate');


const login = require('./endpoints/login');
const logout = require('./endpoints/logout');
const register = require('./endpoints/register');
const gameHistory = require('./endpoints/gameHistory');

const app = express();
app.use(express.json());
app.use(express.static('client'));

const port = 3000;




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

// Default route
app.get('/', (req, res) => { res.sendFile('../client/index.html'); });

// Login Page
app.get('/login', async(req, res) => { login(req, res); });

// Logout Page
app.get('/logout', authenticate(), async (req, res) => { logout(req, res); });

// Register Page
app.post('/register', async (req, res) => { register(req, res); });

// Game History
app.post('/gameHistory', authenticate(), async (req, res) => { gameHistory(req, res); });

// Initiates server
app.listen(port, () => console.log(`Server running on port ${port}`));
