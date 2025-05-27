import Board from './classes/board.js';

const chessBoardElement = document.querySelector('.chess-board');
const chessBoard = new Board();
chessBoard.setBoardElement(chessBoardElement);
chessBoard.setUp();

const whiteInput = document.getElementById('whitePlayer');
const blackInput = document.getElementById('blackPlayer');

whiteInput.addEventListener('input', (event) => {
    const value = event.target.value;
    chessBoard.setWhitePlayer(value);
});

blackInput.addEventListener('input', (event) => {
    const value = event.target.value;
    chessBoard.setBlackPlayer(value);
});

main();

async function main() {
    const saveButtonElement = document.getElementById('save-game');
    saveButtonElement.addEventListener('click', saveButton);

    const gameId = getGameIdFromURL();
    let gameData;

    if (gameId) {
        chessBoardElement.setAttribute('game-id', gameId);
        gameData = await getGameData(gameId);
        populateInputs({
            white: gameData.white_username,
            black: gameData.black_username,
        });
        chessBoard.setGameData(gameData);
    }
    chessBoard.getAllMoves();
}

function getGameIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    const gameId = params.get('gameId');
    return gameId;
}

function saveButton() {
    const gameId = chessBoardElement.getAttribute('game-id');
    if (gameId) saveGame();
    else createNewGame();
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
    console.log('Save game');
    try {
        const gameData = chessBoard.getGameData();
        const gameId = chessBoardElement.getAttribute('game-id');
        const response = await fetch(`http://localhost:3000/OTBEditor/${gameId}/saveGame`, {
            method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    gameData: gameData,
                }),
        });
    } catch(err) {
        console.error('Error saving game:', err);
        alert('Error saving game. Please try again.');
        return;
    }
}

async function createNewGame() {
    console.log('Create new game');
    try {
        const gameData = chessBoard.getGameData();
        console.log(gameData);
        const response = await fetch('http://localhost:3000/OTBEditor/createGame', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
                gameData: gameData,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('New game created successfully:', data);
    } catch(err) {
        console.error('Error creating new game:', err);
        alert('Error creating new game. Please try again.');
        return;
    }
    
}

function populateInputs(inputs) {
    document.getElementById('whitePlayer').value = inputs.white;
    document.getElementById('blackPlayer').value = inputs.black;
}