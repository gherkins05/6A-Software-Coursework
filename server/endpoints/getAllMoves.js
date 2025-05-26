const { Chess } = require('chess.js')

async function getAllMoves(req, res) {
    try {
        const { pgn } = req.body;

        const chess = new Chess();
        
        if (pgn) chess.loadPgn(pgn);

        const moves = chess.moves({
            verbose: true,
        });

        return res.status(200).send({ moves });
    } catch (err) {
        console.error('Error in getMoves:', err);
        return res.status(500).send({ message: 'Internal server error' });
    }
}

module.exports = getAllMoves;