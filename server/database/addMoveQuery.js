function addMoveQuery(gameId, move) {
    const query = {
        text: `
            INSERT INTO move (
                game_id,
                move_number,
                "to", 
                "from", 
                move_notation, 
                player
            ) VALUES (
                $1,
                $2,
                $3, 
                $4, 
                $5, 
                $6
            )
        `,
        values: [
            gameId,
            move.move_number,
            move.to,
            move.from,
            move.move_notation,
            move.player
        ]
    };

    return query;
}

module.exports = addMoveQuery;