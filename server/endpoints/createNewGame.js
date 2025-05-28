const addGameQuery = require('../database/addGameQuery');
const addMoveQuery = require('../database/addMoveQuery');

async function createNewGame(req, res, pool) {
    const client = await pool.connect();
    try {
        const { gameData } = req.body;
        if (!gameData) {
            res.status(400).json({ error: 'Game data is required' });
            return;
        }
        gameData.owner = req.user.id;        

        const gameIdRes = await client.query(addGameQuery(gameData));

        if (!gameIdRes || !gameIdRes.rows || gameIdRes.rows.length === 0) {
            res.status(500).json({ error: 'Failed to create new game' });
            return;
        }

        const gameId = gameIdRes.rows[0].id;

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