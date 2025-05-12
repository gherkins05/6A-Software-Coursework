import Piece from './piece.js';

class King extends Piece {
    constructor(startingTile, piece, color, board, tile, imgPath, symbol) {
        super(startingTile, piece, color, board, tile, imgPath, symbol);
        this.hasMoved = false;
    }

    getPossibleMoves() {
        return this.tile.getNeighbours(true, true, 1, 1);
    }

    getValidMoves() {
        const possibleMoves = this.getPossibleMoves();
        const validMoves = [];

        for (const move of possibleMoves) {
            if (!move.contains || move.contains.color !== this.color) {
                validMoves.push(move);
            }
        }

        // Need to add castling logic

        return validMoves;
    }
}

export default King;