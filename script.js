const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const btnRestart = document.querySelector("#btnRestart");
 
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

let gameCells = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X"; // Tracks which player is playing (X | O)
let running = false; // Tracks if game is running

initializeGame();

function initializeGame(){ // Sets up game functions
  cells.forEach(cell => cell.addEventListener("click", cellClicked));
  btnRestart.addEventListener("click", restartGame);
  statusText.textContent = `Player ${currentPlayer}'s turn!`;
  running = true;
}

function cellClicked() { // When a cell is clicked
  const cellIndex = this.getAttribute("cellIndex");

  // If selected game cell is not empty or game is not running, nothing happens
  // Else, update current game cell and check if current player wins
  if(gameCells[cellIndex] != "" || !running){
    return;
  }
  else {
    updateCell(this, cellIndex);
    checkWinner();
  }
}

// Game cell selected is inputted by the current player
function updateCell(cell, index){
  gameCells[index] = currentPlayer;
  cell.textContent = currentPlayer;
}

// Change player when this function called
function changePlayer() {
  if(currentPlayer == "X"){
    currentPlayer = "O"
  }
  else{
    currentPlayer = "X"
  }

  statusText.textContent = `Player ${currentPlayer}'s turn!`;
}

function checkWinner() {
  let gameWon = false;

  // Loop check through each array in winConditions
  for(let i = 0; i < winConditions.length; i++){
    const condition = winConditions[i]; // Current array in winConditions
    const cellA = gameCells[condition[0]]; // Current array in winConditions: [x, 0, 0]
    const cellB = gameCells[condition[1]]; // Current array in winConditions: [0, x, 0]
    const cellC = gameCells[condition[2]]; // Current array in winConditions: [0, 0, x]

    // If any of cell options being checked is blank, continue since no winner
    if(cellA == "" || cellB == "" || cellC == ""){
      continue;
    }

    // If all 3 game cells being checked is not blank and has similar values, declare winner
    if(cellA == cellB && cellB == cellC){
      gameWon = true;
      break;
    }
  }

  // If gameWon is true, declare current player as winner and stop game from running
  if(gameWon){
    statusText.textContent = `Player ${currentPlayer} is the winner!`;
    running = false;
  }
  // If all game cells are filled and gameWon is still false, declare draw and stop game from running
  else if(!gameCells.includes("")){
    statusText.textContent = `The match is a Draw!`;
    running = false;
  }
  // Else change player and let game continue running
  else{
    changePlayer();
  }
}

// Set game back to default start
function restartGame(){
  currentPlayer = "X";
  gameCells = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = `Player ${currentPlayer}'s turn!`;
  cells.forEach(cell => cell.textContent = "");
  running = true;
}