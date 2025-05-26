import Piece from './piece.js';

class Knight extends Piece {
    constructor(startingTile, piece, color, board, tile, imgPath, symbol) {
        super(startingTile, piece, color, board, tile, imgPath, symbol);
    }
}

export default Knight;