import Piece from './piece.js';

class King extends Piece {
    constructor(startingTile, piece, color, board, tile, imgPath, symbol) {
        super(startingTile, piece, color, board, tile, imgPath, symbol);
        this.hasMoved = false;
        this.shortCastleRook = this.getShortCastleRook();
        this.longCastleRook = this.getLongCastleRook();
    }

    getShortCastleRook() {
        // Used at the start of the game
        const rookLocation = `${this.tile.column}1`;
        return this.board.getTileFromId(rookLocation);
    }

    getLongCastleRook() {
        // Used at the start of the game
        const rookLocation = `${this.tile.column}8`;
        return this.board.getTileFromId(rookLocation);
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

    checkShortCastle() {
        if (this.hasMoved || this.longCastleRook.hasMoved) { return false; }
        const targetTile = this.board.getTileFromId(`${this.tile.column}7`);
    }

    checkLongCastle() {
        if (this.hasMoved || this.longCastleRook.hasMoved) { return false; }
        const targetTile = this.board.getTileFromId(`${this.tile.column}3`);
    }
}

export default King;