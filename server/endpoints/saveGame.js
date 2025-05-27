const clearGameMovesQuery = require('../database/clearGameMovesQuery');
const addMoveQuery = require('../database/addMoveQuery');
const updateGameDataQuery = require('../database/updateGameDataQuery');

async function saveGame(req, res, pool) {
    const client = await pool.connect();
    try {
        const gameId = req.params.gameId;
        if (!gameId) {
            res.status(400).json({ error: 'Game ID is required' });
            return;
        }

        const { gameData } = req.body;
        if (!gameData) {
            res.status(400).json({ error: 'Game data is required' });
            return;
        }

        // Clear all the moves
        await pool.query(clearGameMovesQuery(gameId));
        // Add all the moves
        gameData.moves.forEach(async (move, index) => {
            move.player = ['white', 'black'][index % 2];
            pool.query(addMoveQuery(gameId, move));
        });

        console.log(gameData);
        // Update game data
        await pool.query(updateGameDataQuery(gameId, gameData));

        await client.query('COMMIT');

        return res.status(200).json({ message: 'Game saved successfully' });
        
    } catch(err) {
        await pool.query('ROLLBACK');
        console.error('Error saving game:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
    } finally {
        if (client) {
            client.release();
        }
    }
}

module.exports = saveGame;