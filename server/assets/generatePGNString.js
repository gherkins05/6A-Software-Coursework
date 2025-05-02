async function generatePGNString(data) {
    const PGNTags = `
        [Event "${data.event}"]
        [Site "${data.site}"]
        [Date "${data.date}"]
        [Round "${data.round}"]
        [White "${data.white_username}"]
        [Black "${data.black_username}"]
        [Result "${data.result}"]
    `;

    const whiteMoves = data.moves.filter(move => move.player === data.white_id).sort((a, b) => a.move_number - b.move_number);
    const blackMoves = data.moves.filter(move => move.player === data.black_id).sort((a, b) => a.move_number - b.move_number);

    let PGNMoves = ``;

    for (let i = 0; i < whiteMoves.length; i++) {
        const currentMove = `${whiteMoves[i].move_number}. ${whiteMoves[i].move_notation} ${blackMoves[i] ? blackMoves[i].move_notation : ''} `;
        PGNMoves += currentMove;
    }
    
    const PGNString = `${PGNTags}\n\n${PGNMoves}${data.result}`;

    return PGNString;
}

module.exports = generatePGNString;