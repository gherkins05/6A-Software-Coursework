import Piece from './piece.js';

class Rook extends Piece {
    constructor(startingTile, piece, color, board, tile, imgPath, symbol) {
        super(startingTile, piece, color, board, tile, imgPath, symbol);
        this.hasMoved = false;
    }

    getPossibleMoves() {
        return this.tile.getNeighbours(true, false, 7, 0);
    }

    getValidMoves() {
        const possibleMoves = this.getPossibleMoves();
        const validMoves = [];

        

        return validMoves;
    }
}

export default Rook; 