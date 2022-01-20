const statusDisplay = document.querySelector('.game--satus');
let gameActive = true;
let currentPlayer = 'X';
let gameState = ["","","","","","","","",""];
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

function handleCellPlayed(clickedCell,clickedCellIndex){
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.innerHTML = currentPlayerTurn();
}

function handleResultValidation() {
    const winningConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];
    let roundWon = false;
    for(let i = 0; i<=7; i+=1){
        let a = gameState[winningConditions[i][0]];
        let b = gameState[winningConditions[i][1]];
        let c = gameState[winningConditions[i][2]];

        if (a===''||b===''||c==='') {
            continue;
        }
        if (a===b && b===c) {
            roundWon = true;
            break;   
        }
    }
    // Check if we won the round, then we can quit the Program
    if (roundWon) {
        gameActive = false;
        statusDisplay.innerHTML = winningMessage();
        return;
    }
    // if that's not the case, we will first check for draw, if that's also not true, then game goes on and we switch players
    let draw = !gameState.includes('');
    if (draw) {
        statusDisplay.innerHTML = drawMessage();
        return;
    }
    //Since it is not a draw yet, we will change player turn
    handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
    // alert(`cell: ${clickedCell}, index: ${clickedCellIndex}`);

    if(gameState[clickedCellIndex]!="" || !gameActive){
        return;
    }

    handleCellPlayed(clickedCell,clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = 'X';
    gameState = ["","","","","","","","",""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click',handleCellClick));
document.querySelector('.game--restart').addEventListener('click',handleRestartGame);
