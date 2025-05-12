class Piece {
    constructor(startingTile, piece, color, board, tile, imgPath, symbol) {
        this.startingTile = startingTile;
        this.piece = piece;
        this.color = color;
        this.board = board;
        this.tile = tile;
        this.imgPath = imgPath;
        this.symbol = symbol;
        this.element = this.createDOMElement();
        this.addEventListeners();
    }

    createDOMElement() {
        const pieceElement = document.createElement('img');
        pieceElement.src = this.imgPath;
        pieceElement.alt = this.symbol;
        pieceElement.classList.add('chess-piece');
        pieceElement.setAttribute('draggable', 'true');
        return pieceElement;
    }

    addEventListeners() {
        this.element.addEventListener('dragstart', (event) => {
            this.board.dragged = this;
            event.target.style.opacity = 0.5;
        });

        this.element.addEventListener('dragend', (event) => {
            event.target.style.opacity = "";
        });
    }

    getPossibleMoves() {}

    getValidMoves() {}
}

export default Piece;