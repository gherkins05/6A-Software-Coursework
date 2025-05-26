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
        this.pgnTags = {
            'Event': '6A Chess',
            'Site': '6A Chess',
            'Date': new Date().toISOString().slice(0, 10).replace(/-/g, '.'),
            'Round': '0',
            'White': '',
            'Black': '',
            'Result': '*',
        };
        this.pgnMoves = [[]];
        this.getAllMoves();
    }

    setBoardElement(boardElement) {
        this.boardElement = boardElement;
    }
    
    setUp() {
        this.generateBoard();
        this.generatePieces();

        if (this.pgnMoves[0].length !== 0) {
            this.pgnMoves.forEach(moveSet => {
                this.processMove(moveSet[0]);
                this.processMove(moveSet[1]);
            });
        }
    }

    getPGNString() {
        let pgn = '';
        for (const tag in this.pgnTags) {
            if (this.pgnTags[tag]) {
                pgn += `[${tag} "${this.pgnTags[tag]}"]\n`;
            }
        }
        pgn += '\n';

        this.pgnMoves.forEach((moveSet, moveNumber) => {
            if (moveSet.length > 0) {
                pgn += `${moveNumber + 1}.${moveSet[0].san} ${moveSet[1] ? moveSet[1].san : ''} `;
            }
        })
        pgn += this.pgnTags['Result'];
        return pgn;
    }

    async updateSelectedPiece(piece) {
        this.removeHighlightedTiles();
        this.selected = piece;
        const validMoves = this.selected.getPossibleMoves();
        this.highlightTiles(validMoves);
    }

    highlightTiles(tiles) {
        tiles.forEach(tile => {
            this.boardElement.querySelector(`#${tile}`).classList.add('highlighted');
        })
    }

    removeHighlightedTiles() {
        this.boardElement.querySelectorAll('.highlighted').forEach(tile => {
            tile.classList.remove('highlighted');
        }) 
    }

    async getAllMoves() {
        try {
            const result = await fetch('http://localhost:3000/OTBEditor/getAllMoves', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    pgn: this.getPGNString(),
                }),
            });

            if (!result.ok) {
                const error = await result.json();
                console.error('Error in getAllmoves:', error);
                return;
            }

            const data = await result.json();

            this.processAllMoves(data.moves);
        } catch (err) {
            console.error('Error in getAllmoves:', err);
            return;
        }
    }

    processMove(move) {
        const fromTile = this.getTileFromId(move.from);
        const toTile = this.getTileFromId(move.to);
        const pieceToMove = fromTile.contains;

        fromTile.removePiece(pieceToMove);
        toTile.addPiece(pieceToMove);
    }

    processAllMoves(moves) {
        this.pieces.forEach(piece => {
            piece.clearMoves();
        })
        moves.forEach(move => {
            const fromTile = this.getTileFromId(move.from);
            const piece = move.piece.toUpperCase();
            const color = move.color;
            if (
                fromTile.contains &&
                fromTile.contains.symbol.toUpperCase() === piece &&
                fromTile.contains.color[0] === color
            ) {
                fromTile.contains.moves.push(move);
            }
        });
    }

    addPGN(pgn) {
        const splitPGN = pgn.split('\n');
        const event = splitPGN[0].match(/"(.*?)"/);
        const site = splitPGN[1].match(/"(.*?)"/);
        const date = splitPGN[2].match(/"(.*?)"/);
        const round = splitPGN[3].match(/"(.*?)"/);
        const white = splitPGN[4].match(/"(.*?)"/);
        const black = splitPGN[5].match(/"(.*?)"/);
        const result = splitPGN[6].match(/"(.*?)"/);
        const moveData = splitPGN[splitPGN.length - 1].replace(/\{[^}]*\}/g, '').split(/ ?\d+\. ?/).filter(Boolean);

        this.pgnTags['Event'] = event ? event[1] : '';
        this.pgnTags['Site'] = site ? site[1] : '';
        this.pgnTags['Date'] = date ? date[1] : new Date().toISOString().slice(0, 10).replace(/-/g, '.');
        this.pgnTags['Round'] = round ? round[1] : '0';
        this.pgnTags['White'] = white ? white[1] : '';
        this.pgnTags['Black'] = black ? black[1] : '';
        this.pgnTags['Result'] = result ? result[1] : '*';
        this.pgnMoves = [[]];
        moveData.forEach(moveSet => {
            const moves = moveSet.split(' ');
            if (moves.length > 0) {
                this.pgnMoves.push(moves);
            }
        });
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
                    `../assets/images/${piece}.svg`,
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
    
    movePiece(piece, newTile, move) {
        this.removeHighlightedTiles();
        newTile.removePiece();
        piece.tile.removePiece(piece);
        newTile.addPiece(piece);
        this.selected = null;

        console.log(`Moved Piece: ${move.san}`);
        this.addMoveToPGN(move);
        console.log(this.getPGNString());
        console.log(this.pgnMoves);

        this.getAllMoves();
    }

    addMoveToPGN(move) {
        if (this.pgnMoves[this.pgnMoves.length - 1].length === 2) this.pgnMoves.push([]);
        this.pgnMoves[this.pgnMoves.length - 1].push(move);
    }
}

export default Board;