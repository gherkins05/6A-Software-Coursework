import Piece from './piece.js';

class Rook extends Piece {
    constructor(startingTile, piece, color, board, tile, imgPath, symbol) {
        super(startingTile, piece, color, board, tile, imgPath, symbol);
        this.hasMoved = false;
    }
}

export default Rook; 