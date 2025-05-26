function updateGameDataQuery(gameId, gameData) {
    const query = {
        text: `
            UPDATE game
            SET
                white = $1,
                black = $2,
                date = $3,
                result = $4,
            WHERE id = $5 
        `,
        values: [
            gameData.white,
            gameData.black,
            gameData.date,
            gameData.result,
            gameId
        ]
    };

    return query;
}

module.exports = updateGameDataQuery;