require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

const authenticate = require('./assets/authenticate');
const checkLogin = require('./assets/checkLogin');


const login = require('./endpoints/login');
const logout = require('./endpoints/logout');
const register = require('./endpoints/register');
const gameHistory = require('./endpoints/gameHistory');
const gameAnalysis = require('./endpoints/gameAnalysis');
const OTBEditorLoad = require('./endpoints/OTBEditorLoad');
const OTBEditorSave = require('./endpoints/OTBEditorSave');
const OTBEditorDelete = require('./endpoints/OTBEditorDelete');
const getMoves = require('./endpoints/getMoves');

const app = express();
app.use(express.json());
app.use(express.static('client'));

const port = 3000;

const path = '/client';




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
app.get('/', (req, res) => { res.sendFile('../client/login.html'); });

// Login Page
app.get('/login', async(req, res) => { login(req, res); });

// Logout Page
app.get('/logout', checkLogin(), async (req, res) => { logout(req, res); });

// Register Page
app.post('/register', async (req, res) => { register(req, res); });

// Game History
app.post('/gameHistory', checkLogin(), async (req, res) => { gameHistory(req, res); });

// Game Analysis
app.post('/gameAnalysis', checkLogin(), async (req, res) => { gameAnalysis(req, res); });

// OTB Editor
app.get('/OTBEditor/:gameId/loadGame', checkLogin(), async (req, res) => { OTBEditorLoad(req, res); });
app.get('/OTBEditor/:gameId/saveGame', checkLogin(), async (req, res) => { OTBEditorSave(req, res); });
app.get('/OTBEditor/:gameId/deletaGame', checkLogin(), async (req, res) => { OTBEditorDelete(req, res); });

// API Endpoints

// Login / Register Page
app.post('/login', async (req, res) => { login(req, res); });
app.post('/register', async (req, res) => { register(req, res); });

// OTB Editor

app.get('/OTBEditor', checkLogin(), async (req, res) => {});
app.get('/OTBEditor/:gameId/loadGame', checkLogin(), async (req, res) => {});
app.post('/OTBEditor/:gameId/saveGame', checkLogin(), async (req, res) => {});
app.get('/OTBEditor/:gameId/deleteGame', checkLogin(), async (req, res) => {});
app.response('/OTBEditor/createGame', checkLogin(), async (req, res) => {});
// Can add call to get all moves for all pieces and store them
app.post('/OTBEditor/getMoves', checkLogin(), async (req, res) => { getMoves(req, res); });
app.post('/OTBEditor/validateMove', checkLogin(), async (req, res) => {});

// Analysis Page

app.post('/analysisPage', checkLogin(), async (req, res) => {});

// Game History

app.post('/gameHistory', checkLogin(), async (req, res) => {});

// Endpoints for the client-side application
app.get('/', (req, res) => { res.redirect('/login'); });
app.get('/login', (req, res) => { res.sendFile(`${path}/login/login.html`); });
app.get('/OTBEditor', (req, res) => { res.sendFile(`${path}/OTBEditor/OTBEditor.html`); });
app.get('/gameHistory', (req, res) => { res.sendFile(`${path}/gameHistory/gameHistory.html`); });
app.get('/analysisPage', (req, res) => { res.sendFile(`${path}/analysisPage/analysisPage.html`); });

// Initiates server
app.listen(port, () => console.log(`Server running on port ${port}`));