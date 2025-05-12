class Tile {
    constructor(row, column, color, board) {
        this.row = row;
        this.column = column;
        this.id = `${column}${row}`;
        this.color = color;
        this.board = board;
        this.contains = null;
        this.element = this.createDOMElement();
        this.addEventListeners();
    }

    createDOMElement() {
        const tileElement = document.createElement('div');
        tileElement.classList.add('chess-tile');
        tileElement.classList.add(`chess-tile-${this.color}`);
        tileElement.id = this.id;
        return tileElement;
    }

    addPiece(piece) {
        this.contains = piece;
        this.contains.tile = this;
        this.element.appendChild(piece.element);
    }

    removePiece(piece) {
        if (this.contains) {
            this.element.removeChild(this.contains.element);
            this.contains = null;
        }
    }

    addEventListeners() {
        this.element.addEventListener('dragover', (event) => {
            event.preventDefault();
        });

        this.element.addEventListener('drop', (event) => {
            event.preventDefault();
            const dragged = this.board.dragged;
            // Add extra move checks to next line
            if (dragged && dragged.element.classList.contains('chess-piece')) {
                if (this.contains) {
                    this.board.takePiece(dragged, this);
                }
                this.board.movePiece(dragged, this);
            }
        })
    }

    getNeighbours(straight, diagonal, straightAmount, diagonalAmount) {
        const neighbours = [];
        const row = this.board.rows.indexOf(this.row);
        const col = this.board.columns.indexOf(this.column);

        if (straight) {
            for (let i = 1; i <= straightAmount; i++) {
                if (row - i >= 0) neighbours.push(this.board.getTileFromId(`${col}${row - i}`)); // Up
                if (row + i <= 7) neighbours.push(this.board.getTileFromId(`${col}${row + i}`)); // Down
                if (col - i >= 0) neighbours.push(this.board.getTileFromId(`${col - i}${row}`)); // Left
                if (col + i <= 7) neighbours.push(this.board.getTileFromId(`${col + i}${row}`)); // Right
            }
        }

        if (diagonal) {
            for (let i = 1; i <= diagonalAmount; i++) {
                if (row - i >= 0 && col - i >= 0) neighbours.push(this.board.getTileFromId(`${col - i}${row - i}`)); // Up Left
                if (row - i >= 0 && col + i <= 7) neighbours.push(this.board.getTileFromId(`${col + i}${row - i}`)); // Up Right
                if (row + i <= 7 && col - i >= 0) neighbours.push(this.board.getTileFromId(`${col - i}${row + i}`)); // Down Left
                if (row + i <= 7 && col + i <= 7) neighbours.push(this.board.getTileFromId(`${col + i}${row + i}`)); // Down Right
            }
        }

        return neighbours;
    }
}

export default Tile;