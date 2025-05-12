import Piece from './piece.js';

class Queen extends Piece {
    constructor(startingTile, piece, color, board, tile, imgPath, symbol) {
        super(startingTile, piece, color, board, tile, imgPath, symbol);
    }

    getPossibleMoves() {
        return this.tile.getNeighbours(true, true, 7, 7);
    }

    getValidMoves() {
        const possibleMoves = this.getPossibleMoves();
        const validMoves = [];

        

        return validMoves;
    }
}

export default Queen;