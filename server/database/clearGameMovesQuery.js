function clearGameMovesQuery(gameId) {
    const query = {
        text: `
            DELETE FROM move
            WHERE game_id = $1
        `,
        values: [gameId],
    };

    return query;
}

module.exports = clearGameMovesQuery;