const addGameQuery = require('../database/addGameQuery');
const addGameTagsQuery = require('../database/addGameTagsQuery');
const addGame_TagQuery = require('../database/addGame_TagQuery');
const addGameMovesQuery = require('../database/addGameMovesQuery');

async function addGameToDatabase(gameData, tags, pool) {
    const client = await pool.connect();
    try {
        // Start a transaction
        await client.query('BEGIN');

        // Add the game to the db
        const gameResult = await pool.query(addGameQuery(gameData));
        const gameId = gameResult.rows[0].id;

        // Add the moves to the db
        const moveResult = await pool.query(addGameMovesQuery(gameData.moves, gameId));

        // Add the tags to the db
        const tagResult = await pool.query(addGameTagsQuery(tags));
        const tagIds = tagResult.rows.map(row => row.id);

        // Add the game_tags to db
        const gameTagResult = await pool.query(addGame_TagQuery(tagIds, gameId));

        await client.query('COMMIT');
    } catch(err) {
        // If an error occurs the rollback any changes
        await client.query('ROLLBACK');
        console.error('Error adding game to database:', err);
        throw err;
    } finally {
        // Release the client back to the pool
        client.release();
    }
}

module.exports = addGameToDatabase;