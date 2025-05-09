const generatePGNString = require('../assets/generatePGNString');
const getGamesFromFilters = require('../database/getGamesFromFilters');
const getParams = require('../assets/getParams');

async function gameHistory(req, res, pool) {
    // url: /gameHistory?page=1&colour=white&result=white&tags=21
    try {
        const params = getParams(req);

        const gameHistoryGameResult = await pool.query(getGamesFromFilters(queryParams));
        const gameHistoryGames = gameHistoryGameResult.rows;

        if (gameHistoryGames.length === 0) {
            return res.status(404).send({ message: 'No games found' });
        }

        const gameHistoryPGN = gameHistoryGames.map(game => generatePGNString(game));

        return res.status(200).send({ games: gameHistoryPGN });

    } catch(err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}