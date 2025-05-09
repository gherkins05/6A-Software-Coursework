const getGamesFromFilters = require('../database/getGamesFromFilters');
const getParams = require('../assets/getParams');
const getTotalResults = require('../assets/getTotalResults');

async function gameAnalysis(req, res, pool) {
    try {
        // url: /gameHistory?colour=white&result=white&tags=21
        const params = getParams(req);

        const gameAnalysisGameResult = await pool.query(getGamesFromFilters(params));
        const stats = getTotalResults(gameAnalysisGameResult.rows);

        return res.status(200).send(stats);
    } catch(err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = gameAnalysis;