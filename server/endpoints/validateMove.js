const { Chess } = require('chess.js')

async function validateMoves(req, res) {
    try {
        const { pgn, piece, move } = req.body;

        if (!pgn || !piece) return res.status(400).send({ message: 'Invalid request' });

        const chess = new Chess();
        chess.loadPgn(pgn);
        const moves = chess.moves({
            square: piece.tile.id,
        });

        if (moves.contains(move)) return res.status(200).send({ message: 'Valid move' });
        return res.status(400).send({ message: 'Invalid move' });
    } catch (err) {
        console.error('Error in validateMoves:', err);
        return res.status(500).send({ message: 'Internal server error' });
    }
}

module.exports = validateMoves;