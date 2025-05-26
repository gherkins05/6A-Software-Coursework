const addGameQuery = require('../database/addGameQuery');
const addMoveQuery = require('../database/addMoveQuery');

async function createNewGame(req, res, pool) {
    try {
        const { gameData } = req.body;
        if (!gameData) {
            res.status(400).json({ error: 'Game data is required' });
            return;
        }

        const client = await pool.connect();

        const gameId = await client.query(addGameQuery(gameData));

        if (!gameId) {
            res.status(500).json({ error: 'Failed to create new game' });
            return;
        }

        gameData.moves.forEach(async (move, index) => {
            move.player = ['white', 'black'][index % 2];
            client.query(addMoveQuery(gameId, move));
        });

        await client.query('COMMIT');

        return res.status(200).json({ message: 'New game created successfully'});
    } catch(err) {
        await pool.query('ROLLBACK');
        console.error('Error creating new game:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
    } finally {
        if (client) {
            client.release();
        }
    }
}

module.exports = createNewGame;