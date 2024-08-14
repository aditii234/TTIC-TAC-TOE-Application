const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const status = document.getElementById('status');
const restartButton = document.getElementById('restartButton');

let isXNext = true;
let boardState = Array(9).fill(null);

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const checkWinner = () => {
    for (const [a, b, c] of winningCombinations) {
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            return boardState[a];
        }
    }
    return boardState.includes(null) ? null : 'T';
};

const handleClick = (e) => {
    const cell = e.target;
    const index = Array.from(cells).indexOf(cell);

    if (boardState[index] || checkWinner()) return;

    boardState[index] = isXNext ? 'X' : 'O';
    cell.textContent = boardState[index];
    isXNext = !isXNext;

    const winner = checkWinner();
    if (winner) {
        status.textContent = winner === 'T' ? 'Tie!' : `${winner} Wins!`;
        return;
    }
    status.textContent = `${isXNext ? 'X' : 'O'}'s turn`;
};

const restartGame = () => {
    boardState.fill(null);
    cells.forEach(cell => cell.textContent = '');
    isXNext = true;
    status.textContent = "X's turn";
};

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartButton.addEventListener('click', restartGame);

status.textContent = "X's turn";
