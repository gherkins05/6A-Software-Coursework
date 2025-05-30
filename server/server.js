require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const path = require('path');


const checkLogin = require('./assets/checkLogin');


const login = require('./endpoints/login');
const register = require('./endpoints/register');
const getAllMoves = require('./endpoints/getAllMoves');
const loadGame = require('./endpoints/loadGame');
const saveGame = require('./endpoints/saveGame');
const createNewGame = require('./endpoints/createNewGame');


const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client')));
app.use(cors());

const port = 3000;


const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'chessapp',
    password: process.env.DB_PASSWORD,
    port: 5432,
});

// API Endpoints

// Login / Register Page
app.post('/login', async (req, res) => { login(req, res, pool); });
app.post('/register', async (req, res) => { register(req, res, pool); });

// OTB Editor

app.get('/OTBEditor/:gameId/loadGame', checkLogin, async (req, res) => { loadGame(req, res, pool); });
app.post('/OTBEditor/:gameId/saveGame', checkLogin, async (req, res) => { saveGame(req, res, pool); });
app.post('/OTBEditor/createGame', checkLogin, async (req, res) => { createNewGame(req, res, pool); });
app.post('/OTBEditor/getAllMoves', async (req, res) => { getAllMoves(req, res); });

// Analysis Page

app.post('/analysisPage', checkLogin, async (req, res) => {});

// Game History

app.post('/gameHistory', checkLogin, async (req, res) => {});

// Endpoints for the client-side application
app.get('/', (req, res) => { res.redirect('/login'); });
app.get('/login', (req, res) => { res.sendFile(path.join(__dirname, `../client/login/login.html`)); });
app.get('/register', (req, res) => { res.sendFile(path.join(__dirname, `../client/register/register.html`)); });
app.get('/OTBEditor', (req, res) => { res.sendFile(path.join(__dirname, `../client/OTBEditor/OTBEditor.html`)); });
app.get('/gameHistory', (req, res) => { res.sendFile(path.join(__dirname, `../client/gameHistory/gameHistory.html`)); });
app.get('/analysisPage', (req, res) => { res.sendFile(path.join(__dirname, `../client/analysisPage/analysisPage.html`)); });

// Initiates server
app.listen(port, () => console.log(`Server running on port ${port}`));