const getGameDataQuery = require("../database/getGameDataQuery");
const generatePGNString = require("../assets/generatePGNString");

async function loadGame(req, res, pool) {
    try {
        const gameId = req.params.gameId;
        if (!gameId) {
            res.status(400).json({ error: 'Game ID is required' });
            return;
        }

        const query = getGameDataQuery(gameId);
        const result = await pool.query(query);

        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Game not found' });
            return;
        }

        const gameData = result.rows[0];
        const pgnString = generatePGNString(gameData);

        return res.status(200).json(gameData);

    } catch(err) {
        console.error('Error loading game:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
    }
}

module.exports = loadGame;