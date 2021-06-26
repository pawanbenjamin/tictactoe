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

// Grabs names from the dom and uses them as our players new names
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
  const { activePlayer, players } = state;
  // state.activePlayer === players[0], then swap to players[1]
  if (activePlayer.piece === players[0].piece) state.activePlayer = players[1];
  // state.activePlayer === players[1], then swap to players[0]
  else if (activePlayer.piece === players[1].piece)
    state.activePlayer = players[0];
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
  const { board, activePlayer } = state;

  let id = $(this).attr("id");
  let idArray = id.split(",");
  let row = idArray[0];
  let col = idArray[1];

  // not be able to place our marks in an occupied space
  if (board[row][col] !== "") return;

  board[row][col] = activePlayer.piece;
  console.log(state);
  renderBoard();
  if (hasPlayerWon()) console.log(activePlayer.piece + " has won!");
  if (didPlayersDraw()) console.log("Both players drawded!");
  swapTurns();
}

function hasPlayerWon() {
  const { board, activePlayer } = state;

  // board: [
  //   ["", "", ""],
  // ["", "", ""],
  //   ["", "", ""],
  // ],

  if (board[0][0] === activePlayer.piece) {
    if (board[0][0] === board[0][1] && board[0][1] === board[0][2]) return true;
    if (board[0][0] === board[1][0] && board[1][0] === board[2][0]) return true;
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) return true;
  }

  if (board[2][0] === activePlayer.piece) {
    if (board[2][0] === board[2][1] && board[2][1] === board[2][2]) return true;
    if (board[2][0] === board[1][1] && board[1][1] === board[0][2]) return true;
  }

  if (board[1][1] === activePlayer.piece) {
    if (board[1][0] === board[1][1] && board[1][1] === board[1][2]) return true;
    if (board[0][1] === board[1][1] && board[1][1] === board[2][1]) return true;
  }

  if (
    board[0][2] === activePlayer.piece &&
    board[0][2] === board[1][2] &&
    board[1][2] === board[2][2]
  )
    return true;
  return false;
}

function didPlayersDraw() {
  let numBlankSpaces = 0;
  for (var row = 0; row < 3; row++) {
    for (var col = 0; col < 3; col++) {
      if (state.board[row][col] === "") numBlankSpaces++;
    }
  }

  // if(numBlankSpaces === 0) return true
  // else return false

  // return numBlankSpaces === 0 ? true : false;

  return numBlankSpaces === 0;
}

// be told when a move causes a player to win, or to draw
// start the game over without having to reset the browser

// As a user playing a single player game I additionally want to:
// see the name 'Computer' displayed as my opponent
// have the Computer player make moves as if it were a human player with the correct mark in an empty space
// As a user playing a single player game I would be delighted if:

// the Computer made 'better-than-guessing' choices when placing a mark on the board
