class Piece {
    constructor(startingTile, piece, color, board, tile, imgPath, symbol) {
        this.startingTile = startingTile;
        this.piece = piece;
        this.color = color;
        this.board = board;
        this.tile = tile;
        this.imgPath = imgPath;
        this.symbol = symbol;
        this.taken = false;
        this.moves = [];
        this.element = this.board.boardElement ? this.createDOMElement() : null;
        if (this.element) { this.addEventListeners(); }
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
            this.board.updateSelectedPiece(this);
            event.target.style.opacity = 0.5;
        });

        this.element.addEventListener('dragend', (event) => {
            event.target.style.opacity = "";
        });

        this.element.addEventListener('click', () => {
            this.board.updateSelectedPiece(this);
            this.board.selected = this;
        });
    };

    clearMoves() {
        this.moves = [];
    }

    getPossibleMoves() {
        const moves = this.moves.map(move => {
            return move.to;
        })
        return moves;
    }

    isMoveValid(targetTile) {
        const validMoves = this.getPossibleMoves();
        return validMoves.includes(targetTile.id);
    }

    getMoveFromTargetTile(targetTile) {
        return this.moves.find(move => move.to === targetTile.id);
    }
}

export default Piece;