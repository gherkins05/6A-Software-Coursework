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



const gridContainer = document.getElementById('myGrid');
const tray = document.getElementById('tray');
const moveHistory = [];

const pieceSet = ["♖", "♘", "♗", "♕", "♔", "♙", "♜", "♞", "♝", "♛", "♚", "♟"];

pieceSet.forEach(piece => {
    const div = document.createElement('div');
    div.textContent = piece;
    div.classList.add('tray-piece');
    div.setAttribute('draggable', true);
    div.setAttribute('data-from-tray', 'true');

    div.addEventListener('dragstart', e => {
        e.dataTransfer.setData("text/plain", piece);
        e.dataTransfer.setData("from", "tray");
    });

    tray.appendChild(div);
});

for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
        const square = document.createElement('div');
        square.classList.add('grid-item');
        square.classList.add((i + j) % 2 === 0 ? 'white' : 'black');
        square.setAttribute('draggable', true);

        square.addEventListener('dragover', e => e.preventDefault());

        square.addEventListener('drop', e => {
            e.preventDefault();
            const piece = e.dataTransfer.getData("text/plain");
            const fromSquareId = e.dataTransfer.getData("from-square");

            if (fromSquareId) {
                const fromSquare = document.getElementById(fromSquareId);
                const oldPiece = fromSquare.textContent;

                moveHistory.push({
                    from: fromSquareId,
                    to: square.id,
                    piece: oldPiece,
                    captured: square.textContent
                });

            
                fromSquare.textContent = '';
                fromSquare.classList.remove('flip-text');
            }

            square.textContent = piece;
            if (gridContainer.classList.contains('flipped')) {
                square.classList.add('flip-text');
            } else {
                square.classList.remove('flip-text');
            }
        });

        square.addEventListener('dragstart', e => {
            if (!square.textContent.trim()) {
                e.preventDefault();
                return;
            }
            e.dataTransfer.setData("text/plain", square.textContent.trim());
            e.dataTransfer.setData("from-square", square.id);
        });

        // Assign ID
        const squareId = `square-${i}-${j}`;
        square.id = squareId;

        gridContainer.appendChild(square);
    }
}

tray.addEventListener('dragover', e => e.preventDefault());
tray.addEventListener('drop', e => {
    const fromSquareId = e.dataTransfer.getData("from-square");
    if (fromSquareId) {
        const fromSquare = document.getElementById(fromSquareId);
        fromSquare.textContent = '';
        fromSquare.classList.remove('flip-text');
    }
});

function flipBoard() {
    gridContainer.classList.toggle('flipped');
    const squares = gridContainer.querySelectorAll('.grid-item');
    squares.forEach(sq => {
        if (sq.textContent.trim()) {
            sq.classList.toggle('flip-text');
        }
    });
}

function undoMove() {
    if (moveHistory.length === 0) {
        return;
    }

    const lastMove = moveHistory.pop();
    const fromSquare = document.getElementById(lastMove.from);
    const toSquare = document.getElementById(lastMove.to);

    fromSquare.textContent = lastMove.piece;
    toSquare.textContent = lastMove.captured;

    if (gridContainer.classList.contains('flipped')) {
        fromSquare.classList.add('flip-text');
        toSquare.classList.remove('flip-text');
    } else {
        fromSquare.classList.remove('flip-text');
        toSquare.classList.remove('flip-text');
    }
}

function resetBoard() {

    document.querySelectorAll('.grid-item').forEach(square => {
        square.innerHTML = '';
        square.classList.remove('flip-text');
    });

    moveHistory = [];
    gridContainer.classList.remove('flipped');
}
