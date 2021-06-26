// ======ELEMENTS======
const boardElement = $("#board");

// ======STATE======
let state = {
  board: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
  players: [],
  activePlayer: {},
};

// As users playing a two player game we want to:

function startGame(event) {
  enterName(event);

  // have our order chosen for us by the game
  state.activePlayer = state.players[0];
  // state.activePlayer

  renderBoard();
}

// Grabs names from the dom and uses them as our players
function enterName(event) {
  event.preventDefault();
  state.players = [];
  let player1 = $("#player1name").val();
  let player2 = $("#player2name").val();
  createPlayerObj(player1, "X");
  createPlayerObj(player2, "O");
  console.log(state);
}

// Function to render our board to the screen
function renderBoard() {
  boardElement.empty();
  state.board.forEach((row, rowIndex) => {
    row.forEach((col, columnIndex) => {
      const newCell = $("<div class='cell'></div>");
      newCell.text(`${col}`);

      newCell.attr("id", `${rowIndex},${columnIndex}`);
      newCell.click(onCellClick);
      boardElement.append(newCell);
    });
  });
}

function swapTurns() {
  // state.activePlayer === players[0], then swap to players[1]
  if (state.activePlayer.piece === state.players[0].piece)
    state.activePlayer = state.players[1];
  // state.activePlayer === players[1], then swap to players[0]
  else if (state.activePlayer.piece === state.players[1].piece)
    state.activePlayer = state.players[0];
}

// $("#start").click((event) => startGame(event));
$("#start").click(startGame);

function createPlayerObj(name, piece) {
  let player = {
    name,
    piece,
  };
  state.players.push(player);
}

// take turns placing our marks in empty spaces
function onCellClick() {
  let id = $(this).attr("id");
  let idArray = id.split(",");
  let row = idArray[0];
  let col = idArray[1];
  if (state.board[row][col] !== "") {
    return;
  }
  state.board[row][col] = state.activePlayer.piece;
  console.log(state);
  renderBoard();
  swapTurns();
}

// not be able to place our marks in an occupied space
// be told when a move causes a player to win, or to draw
// start the game over without having to reset the browser
// As a user playing a single player game I additionally want to:

// see the name 'Computer' displayed as my opponent
// have the Computer player make moves as if it were a human player with the correct mark in an empty space
// As a user playing a single player game I would be delighted if:

// the Computer made 'better-than-guessing' choices when placing a mark on the board
