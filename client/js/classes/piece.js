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
    }

    async getPossibleMoves() {
        try {
            const result = await fetch('http://localhost:3000/OTBEditor/getMoves', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: {
                    pgn: this.board.pgn,
                    piece: this.piece.tile.id,
                }
            });

            if (!result.ok) {
                const error = await result.json();
                console.error('Error in getPossibleMoves:', error);
                return;
            }

            const data = await result.json();

            
        } catch (err) {
            console.error('Error in getPossibleMoves:', err);
        }
    }
}

export default Piece;