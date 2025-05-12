import Piece from './piece.js';

class Bishop extends Piece {
    constructor(startingTile, piece, color, board, tile, imgPath, symbol) {
        super(startingTile, piece, color, board, tile, imgPath, symbol);
    }

    getPossibleMoves() {
        return this.tile.getNeighbours(false, true, 0, 7);
    }

    getValidMoves() {
        const possibleMoves = this.getPossibleMoves();
        const validMoves = [];

        

        return validMoves;
    }
}

export default Bishop;