let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameOver = false;

const cells = document.querySelectorAll('.cell');
const turnElement = document.getElementById('turn');
const resetButton = document.getElementById('reset');

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        if (gameOver || board[index] !== '') return;

        board[index] = currentPlayer;
        cell.textContent = currentPlayer;

        checkWin();
        checkDraw();

        if (!gameOver) {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            turnElement.textContent = `Player ${currentPlayer}'s turn`;
        }
    });
});

resetButton.addEventListener('click', () => {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameOver = false;
    cells.forEach(cell => cell.textContent = '');
    turnElement.textContent = `Player ${currentPlayer}'s turn`;
});

function checkWin() {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const condition of winConditions) {
        if (board[condition[0]] === board[condition[1]] &&
            board[condition[1]] === board[condition[2]] &&
            board[condition[0]] !== '') {
            gameOver = true;
            turnElement.textContent = `Player ${board[condition[0]]} wins!`;
            break;
        }
    }
}

function checkDraw() {
    if (!board.includes('') && !gameOver) {
        gameOver = true;
        turnElement.textContent = 'It\'s a draw!';
    }
}