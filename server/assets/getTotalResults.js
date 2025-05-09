function getTotalResults(games) {
    // Outcome of games
    const outcomes = {
        totalCompletedGames: 0,
        wonGames: 0,
        lostGames: 0,
        drawnGames: 0,
    };

    const ownerId = games[0].owner_id;
    games.forEach((game) => {
        if (game.white_id === ownerId && game.result === '1-0' || game.black_id === ownerId && game.result === '0-1') {
            outcomes.wonGames++;
            outcomes.totalCompletedGames++;
        } else if (game.white_id === ownerId && game.result === '0-1' || game.black_id === ownerId && game.result === '1-0') {
            outcomes.lostGames++;
            outcomes.totalCompletedGames++;
        } else if (game.result === '1/2-1/2') {
            outcomes.drawnGames++;
            outcomes.totalCompletedGames++;
        }
    })

    // Most used piece
    const pieceMoves = {
        p: 0,
        r: 0,
        n: 0,
        b: 0,
        q: 0,
        k: 0,
    };

    games.forEach((game) => {
        game.moves.forEach((move) => {
            if (move.id == ownerId) {
                pieceMoves[move.move_notation.charAt(0).toLowerCase()]++;
            }
        })
    })

    return {
        outcomes,
        pieceMoves,
    }
}

module.exports = getTotalResults;