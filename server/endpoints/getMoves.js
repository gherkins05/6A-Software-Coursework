const { Chess } = require('chess.js')

async function getMoves(req, res) {
    try {
        const { pgn, tile } = req.body;

        if (!tile) return res.status(400).send({ message: 'Invalid request' });

        const chess = new Chess();
        
        if (pgn) chess.loadPgn(pgn);

        const moves = chess.moves({
            square: tile,
        });

        return res.status(200).send({ moves });
    } catch (err) {
        console.error('Error in getMoves:', err);
        return res.status(500).send({ message: 'Internal server error' });
    }
}

module.exports = getMoves;