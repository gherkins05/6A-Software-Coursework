import Piece from './piece.js';

class Knight extends Piece {
    constructor(startingTile, piece, color, board, tile, imgPath, symbol) {
        super(startingTile, piece, color, board, tile, imgPath, symbol);
    }

    getPossibleMoves() {
        
    }

    getValidMoves() {
        const possibleMoves = this.getPossibleMoves();
        const validMoves = [];

        

        return validMoves;
    }

    getTilesToTile(targetTile) {
        return [];
    }
}

export default Knight;