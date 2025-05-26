import Board from './classes/board.js';

const chessBoardElement = document.querySelector('.chess-board');
const chessBoard = new Board();
chessBoard.setBoardElement(chessBoardElement);
chessBoard.setUp();

main();

async function main() {
    const gameId = getGameIdFromURL();
    let gameData;

    if (gameId) {
        chessBoardElement.setAttribute('game-id', gameId);
        gameData = await getGameData(gameId);
        populateTags(gameData.tags);
        populateInputs({
            white: gameData.white_username,
            black: gameData.black_username,
        });
        document.getElementById('save-game').onclick = saveGame;
    }
}

function getGameIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    const gameId = params.get('gameId');
    return gameId;
}

async function getGameData(gameId) {
    try {
        const response = await fetch(`http://localhost:3000/OTBEditor/${gameId}/loadGame`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('Error fetching game:', error);
            alert('Error fetching game. Please try again.');
            return;
        }

        const data = await response.json();
        return data;
    } catch(err) {
        console.error('Error fetching game data:', err);
        alert('Error fetching game data. Please try again.');
        return;
    }
}

async function saveGame() {
    if (!chessBoardElement.getAttribute('game-id')) {
        createNewGame();
        return;
    }

    const gameId = chessBoardElement.getAttribute('game-id');
    const response = await fetch(`http://localhost:3000/OTBEditor/${gameId}/saveGame`, {
        method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: {}
    });

}

async function createNewGame() {
    if (chessBoardElement.getAttribute('game-id')) {
        saveGame();
        return;
    }


}

function populateTags(tags) {}

function populateInputs(inputs) {
    document.getElementById('whitePlayer').value = inputs.white;
    document.getElementById('blackPlayer').value = inputs.black;
}