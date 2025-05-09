function addGameMovesQuery(params) {
    const moves = params.moves.map((move) => {
        return [
            move.player,
            move.move_notation,
            move.move_number,
        ];
    });

    const query = {
        text: `
            INSERT INTO move (
                game_id,
                player,
                move_notation,
                move_number
            ) VALUES ${
                moves.
                map((_, i) => `($1, $${2 + i * 3}, $${2 + i * 3 + 1}, $${2 + i * 3 + 2})`)
                .join(', ')
            };
        `,
        values: [params.gameId, ...moves.flat()],
    };

    return query;
}

module.exports = addGameMovesQuery;