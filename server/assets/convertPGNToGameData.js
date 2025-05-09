function convertPGNToGameData(pgn) {
    const splitPGN = pgn.split('\n');
    const event = splitPGN[0].match(/"(.*?)"/);
    const site = splitPGN[1].match(/"(.*?)"/);
    const date = splitPGN[2].match(/"(.*?)"/);
    const round = splitPGN[3].match(/"(.*?)"/);
    const white = splitPGN[4].match(/"(.*?)"/);
    const black = splitPGN[5].match(/"(.*?)"/);
    const result = splitPGN[6].match(/"(.*?)"/);
    const moveData = splitPGN[splitPGN.length - 1].replace(/\{[^}]*\}/g, '').split(/ ?\d+\. ?/).filter(Boolean);

    const moves = moveData.map((move, index) => {
        let moves = move.split(' ');
        return {
            white: {
                player: white,
                move_notation: moves[0],
                move_number: index + 1,
            },
            black: {
                player: black,
                move_notation: moves[1],
                move_number: index + 1,
            }
        };
    });

    return {
        event,
        site,
        date,
        round,
        white,
        black,
        result,
        moves,
    };
}

module.exports = convertPGNToGameData;