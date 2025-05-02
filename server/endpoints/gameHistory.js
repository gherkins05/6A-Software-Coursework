const generatePGNString = require('../assets/generatePGNString');
const gameHistoryQuery = require('../database/gameHistoryQuery');

async function gameHistory(req, res, pool) {
    // url: /gameHistory?page=1&colour=white&result=white&tags=21
    try {
        
        const page = req.query.page || 1;
        const pageSize = 10;
        const offset = (page - 1) * pageSize;

        const userId = req.user.id;

        const colour = req.query.colour;
        const colours = Array.isArray(colour) ? colour.map(c => c.toLowerCase()) : colour ? [colour.toLowerCase()] : [];
        const whitePlayer = colours.includes('white');
        const blackPlayer = colours.includes('black');

        const result = req.query.result;
        const results = Array.isArray(result) ? result.map(r => r.toLowerCase()) : result ? [result.toLowerCase()] : [];
        const whiteWins = results.includes('white');
        const blackWins = results.includes('black');
        const draws = results.includes('draw');
        const ongoing = results.includes('ongoing');

        const tags = req.query.tags;
        const activeTags = Array.isArray(tags) ? tags : tags ? [tags] : [];

        const queryParams = {
            userId,
            whitePlayer,
            blackPlayer,
            whiteWins,
            blackWins,
            draws,
            ongoing,
            tags,
            page,
            offset,
        };

        const gameHistoryGameResult = await pool.query(gameHistoryQuery(queryParams));
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