import Tile from './tile.js';
import King from './king.js';
import Queen from './queen.js';
import Rook from './rook.js';
import Bishop from './bishop.js';
import Knight from './knight.js';
import Pawn from './pawn.js';

class Board {
    constructor() {
        this.pieces = [];
        this.grid = [];
        this.boardElement;
        this.selected;
        this.fen;
        this.rows = ['8', '7', '6', '5', '4', '3', '2', '1'];
        this.columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        this.pgn;
    }

    setBoardElement(boardElement) {
        this.boardElement = boardElement;
    }

    async updateSelectedPiece(piece) {
        this.selected = piece;
        const validMoves = await this.selected.getPossibleMoves();
        console.log(validMoves);
    }

    addPGN(pgn) {
        this.pgn = pgn;
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
                if (this.boardElement) {
                    this.boardElement.appendChild(tile.element);
                }
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

    convertIdToIndex(tileId) {
        const column = tileId[0];
        const row = tileId[1];

        return {
            column: this.columns.indexOf(column),
            row: this.rows.indexOf(row),
        }
    }

    convertIndexToId(index) {
        const column = this.columns[index.column];
        const row = this.rows[index.row];

        return `${column}${row}`;
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
    
    // Need to adjust the move logic to account fo castling and promotions etc
    movePiece(piece, newTile) {
        const moveNotation = this.generateMoveNotation(piece, piece.tile, newTile);
        const oldTile = piece.tile;
        piece.tile.removePiece(piece);
        newTile.addPiece(piece);
        this.selected = null;
        // Need to add move notation logic here

        const movedPiece = piece;
        const movedTile = newTile;

        console.log(`Moved Piece: ${movedPiece.symbol}(${movedPiece.color[0].toUpperCase()}) ${oldTile.id} -> ${movedTile.id}`);
        console.log(`Move Notation: ${movedPiece.symbol}${oldTile.id}${newTile.id}`);
    }

    generateMoveNotation(piece, oldTile, newTile) {
        // To be run before the move is technically carried out
        let moveNotation = '';

        // Piece symbol
        if (piece.symbol.toUpperCase() !== 'P') moveNotation += piece.symbol.toUpperCase();
        moveNotation += oldTile.id;

        // Capture
        if (newTile.contains) moveNotation += 'x';

        // Target tile
        moveNotation += newTile.id;

        return moveNotation;
    }

    takePiece(currentPiece, newTile) {
        // Assumes the newTile contains something
        newTile.removePiece(newTile.contains);
        // Keep piece for undo move
        // Needs more logic surely
    }

    isCheck(kingPiece) {
        // Checks if the king is in check
        // Only need to check if a piece can move to the king's tile
        // Ignoring if that puts them in check themselves
    }

    cloneBoard() {
        const tempBoard = new Board();
        tempBoard.pieces = this.pieces;
        tempBoard.grid = this.grid;
        return tempBoard;
    }

    applyMove(moveNotation) {
        
    }
}

export default Board;