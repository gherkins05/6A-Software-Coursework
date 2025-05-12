import Tile from './tile.js';
import King from './king.js';
import Queen from './queen.js';
import Rook from './rook.js';
import Bishop from './bishop.js';
import Knight from './knight.js';
import Pawn from './pawn.js';

class Board {
    constructor(boardElement) {
        this.pieces = [];
        this.grid = [];
        this.boardElement = boardElement;
        this.dragged = null;
        this.rows = ['8', '7', '6', '5', '4', '3', '2', '1'];
        this.columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    }

    generateBoard() {
        for (let r = 0; r < 8; r++) {
            const row = [];
            for (let c = 0; c < 8; c++) {
                const color = (c + r) % 2 === 0 ? 'white' : 'black';
                const tile = new Tile(
                    this.rows[r], 
                    this.columns[c], 
                    color, 
                    this);
                row.push(tile);
                this.boardElement.appendChild(tile.element);
            }
            this.grid.push(row);
        }
    }

    generatePieces() {
        const pieces = {
            'white_rook': ['a1', 'h1'],
            'white_knight': ['b1', 'g1'],
            'white_bishop': ['c1', 'f1'],
            'white_queen': ['d1'],
            'white_king': ['e1'],
            'white_pawn': ['a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2'],
            
            'black_rook': ['a8', 'h8'],
            'black_knight': ['b8', 'g8'],
            'black_bishop': ['c8', 'f8'],
            'black_queen': ['d8'],
            'black_king': ['e8'],
            'black_pawn': ['a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7'],
        };

        for (const piece in pieces) {
            for (const tileId of pieces[piece]) {
                const params = [
                    this.getTileFromId(tileId),
                    piece,
                    piece.split('_')[0],
                    this,
                    this.getTileFromId(tileId),
                    `assets/images/${piece}.svg`,
                    this.getPieceSymbol(piece.split('_')[1]),
                ];
                const pieceObj = this.createPieceObj(params);
                this.pieces.push(pieceObj);
                this.getTileFromId(tileId).addPiece(pieceObj);
            }
        }
    }

    createPieceObj(params) {
        if (params[1].split('_')[1] === 'king') return new King(...params);
        if (params[1].split('_')[1] === 'queen') return new Queen(...params);
        if (params[1].split('_')[1] === 'rook') return new Rook(...params);
        if (params[1].split('_')[1] === 'bishop') return new Bishop(...params);
        if (params[1].split('_')[1] === 'knight') return new Knight(...params);
        if (params[1].split('_')[1] === 'pawn') return new Pawn(...params);
    }

    getTileFromId(tileId) {
        const column = tileId[0];
        const row = tileId[1];

        const colIndex = this.columns.indexOf(column);
        const rowIndex = this.rows.indexOf(row);

        return this.grid[rowIndex][colIndex];
    }

    getPieceSymbol(piece) {
        const symbols = {
            'king': 'K',
            'queen': 'Q',
            'rook': 'R',
            'bishop': 'B',
            'knight': 'N',
            'pawn': 'P',
        };
        return symbols[piece];
    }

    movePiece(piece, newTile) {
        piece.tile.removePiece(piece);
        newTile.addPiece(piece);
        this.dragged = null;
        // Need to add move notation logic here
    }

    takePiece(currentPiece, newTile) {
        // Assumes the newTile contains something
        newTile.removePiece(newTile.contains);
        // Keep piece for undo move
        // Needs more logic surely
    }

    isCheck(kingPiece) {
        // Checks if the king is in check
    }
}

export default Board;