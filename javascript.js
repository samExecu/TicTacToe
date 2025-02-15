let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

let currentPlayer = "X"; //Player "X" starts
let gameOver = false; //track if the game is over or not
let clickAllowed = true; // Add a flag to control click allowance
//Handle click event on each cell
function handleCellClick(event) {
  if (!clickAllowed || gameOver) return; // If click is not allowed, do nothing
  //Don't do anything if the game is over

  clickAllowed = false; // Temporarily disable further clicks

  const row = event.target.getAttribute("data-row");
  const col = event.target.getAttribute("data-col");

  // If the cell is already filled, don't do anything
  if (board[row][col] !== "") {
    clickAllowed = true; // Re-enable clicks before returning
    return;
  }

  //Fill the cell with current players symbol
  board[row][col] = currentPlayer;
  event.target.textContent = currentPlayer; //Update Screen

  //Applying color to X or O
  if (currentPlayer === "X") {
    event.target.style.color = "red";
  } else if (currentPlayer === "O") {
    event.target.style.color = "blue";
  }

  //check if there is a winner
  if (checkWinner()) {
    setTimeout(() => {
      displayWinnerMessage(`${currentPlayer} wins!`);
      gameOver = true;
      disableInput();
      clickAllowed = true;
    }, 250);
    return;
  }

  if (draw()) {
    setTimeout(() => {
      displayWinnerMessage("It's a draw!");
      gameOver = true;
      disableInput();
      clickAllowed = true;
    }, 250);
    return;
  }

  //Change player
  currentPlayer = currentPlayer === "X" ? "O" : "X";

  clickAllowed = true;
}

function checkWinner() {
  for (let i = 0; i < 3; i++) {
    //Check horizintal
    if (
      board[i][0] === board[i][1] &&
      board[i][1] === board[i][2] &&
      board[i][0] !== ""
    ) {
      return true;
    }

    //Check vertical
    if (
      board[0][i] === board[1][i] &&
      board[1][i] === board[2][i] &&
      board[0][i] !== ""
    ) {
      return true;
    }
  }

  //check diagonals
  if (
    board[0][0] === board[1][1] &&
    board[1][1] === board[2][2] &&
    board[0][0] !== ""
  ) {
    return true;
  }

  if (
    board[0][2] === board[1][1] &&
    board[1][1] === board[2][0] &&
    board[0][2] !== ""
  ) {
    return true;
  }

  return false;
}

function draw() {
  //return draw if all cells are filled and no winner
  return board.flat().every((cell) => cell !== "") && !checkWinner();
}

function resetBoard() {
  board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.textContent = ""; //clearing the boards
    cell.style.color = ""; //reset color of cell
    cell.style.backgroundColor = "";
  });
  displayWinnerMessage(""); //clear winner message
  gameOver = false;
  clickAllowed = true;
  enableInput(); //re-enable user input

  const modal = document.getElementById("modal");
  const overlay = document.getElementById("modal-overlay");
  modal.classList.remove("show");
  modal.style.display = "none"; // hide the modal when resetting the game
  overlay.style.display = "none"; //hide the overlay when resetting the game

  // Log the reset state
  console.log("Game reset: board cleared, modal hidden");
}

//function to disble user input
function disableInput() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.removeEventListener("click", handleCellClick);
  });
}

//function to enable user input
function enableInput() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.addEventListener("click", handleCellClick);
  });
}

//Display the winners message on the screen
function displayWinnerMessage(message) {
  if (!message) return; //Ensure the message is valid

  const winnerMessageDiv = document.getElementById("winner-message");
  const modal = document.getElementById("modal");
  const modalContent = document.getElementById("modal-content");

  winnerMessageDiv.textContent = message; //Update the message

  modalContent.classList.remove("red", "blue", "gray");

  if (message.includes("X")) {
    //"X wins" will be in red
    modalContent.classList.add("red");
  } else if (message.includes("O")) {
    //"O wins" will be in blue
    modalContent.classList.add("blue");
  } else if (message === "It's a draw!") {
    //"Draw" will be in gray
    modalContent.classList.add("gray");
  }

  // Log the message to verify when it should be displayed
  console.log("Displaying modal with message:", message);

  setTimeout(() => {
    // Show the modal
    modal.classList.add("show");
    modal.style.display = "flex";
    modalContent.classList.add("show");

    // Display overlay
    const overlay = document.getElementById("modal-overlay");
    overlay.style.display = "block";
    // Log to verify that the modal is being shown
    console.log("Modal displayed");
  }, 250); // Adjust the delay time as needed
}

// Close the modal when the close button is clicked

document.getElementById("close").addEventListener("click", function () {
  const modal = document.getElementById("modal");
  const modalContent = document.querySelector(".modal-content");

  // Hide the modal with fade-out effect
  modal.classList.remove("show");
  modalContent.classList.remove("show");

  // Hide the overlay
  const overlay = document.getElementById("modal-overlay");
  overlay.style.display = "none";

  // Log to verify that the modal is being closed
  console.log("Modal closed");
});

//setting up event listner for each cell
const cells = document.querySelectorAll(".cell");
cells.forEach((cell) => {
  cell.addEventListener("click", handleCellClick);
  console.log("Cell event listener added"); // Log to verify event listeners
});

//setting up event listner for reset button
const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", resetBoard);
console.log("Reset button event listener added"); // Log to verify event listener
