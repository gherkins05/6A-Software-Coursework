import Board from './classes/board.js';

function toggleMenu() {
    const menu = document.getElementById('nav-menu');
    menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
}

// FINN ADDED

const chessBoard = new Board(document.querySelector('.chess-board'));
chessBoard.generateBoard();
chessBoard.generatePieces();

/*

function buildChessBoard() {
    

    const container = document.querySelector('.board-container');

    const chessBoard = document.createElement('div');
    chessBoard.classList.add('chess-board');

    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            const tile = document.createElement('div');
            tile.classList.add('chess-tile');
            if ((c + r) % 2 == 0) { tile.classList.add('chess-tile-white'); }
            else { tile.classList.add('chess-tile-black'); }
            //tile.setAttribute('draggable', 'true');
            tile.id = getTileId(r, c);

            chessBoard.appendChild(tile);
        }
    }

    container.appendChild(chessBoard);
}

function getTileId(r, c) {
    const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const rows = ['1', '2', '3', '4', '5', '6', '7', '8'];

    return `${columns[c]}${rows[rows.length - 1 - r]}`;
}

function getTile(tileId) {
    const chessBoard = document.querySelector('.chess-board');
    const tile = chessBoard.querySelector(`#${tileId}`);
    return tile;
}

function populateChessBoard() {
    const chessBoard = document.querySelector('.chess-board');
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
            const tile = getTile(tileId);
            const pieceElement = document.createElement('img');
            pieceElement.src = `assets/images/${piece}.svg`;
            pieceElement.alt = piece;
            pieceElement.classList.add('chess-piece');
            pieceElement.setAttribute('draggable', 'true');
            tile.appendChild(pieceElement);
        }
    }
}

buildChessBoard();
populateChessBoard();

*/