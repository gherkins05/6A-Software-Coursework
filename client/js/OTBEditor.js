function toggleMenu() {
    const menu = document.getElementById("nav-menu");
    menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}

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
