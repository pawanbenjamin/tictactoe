// ======ELEMENTS======
const boardElement = $("#board");
const winElement = $("#winIndicator");
const player1Input = $("#player1name");
const player1Header = $("#player1nameHeader");
const player2Input = $("#player2name");
const player2Header = $("#player2nameHeader");
const startButton = $(".start");

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
  resetGame();
  enterName(event);

  // have our order chosen for us by the game
  state.activePlayer = state.players[0];
  renderBoard();
}

function resetGame() {
  state = {
    board: [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ],
    players: [],
    activePlayer: {},
  };
  winElement.removeClass();
  winElement.addClass("hideWin");
}

// Grabs names from the dom and uses them as our players new names
function enterName(event) {
  event.preventDefault();
  state.players = [];
  let player1 = player1Input.val();
  player1Header.text(player1);
  createPlayerObj(player1, "X");

  let player2 = player2Input.val();
  if (player2) {
    player2Header.text(player2);
    createPlayerObj(player2, "O");
  } else {
    player2Header.text("Hal");
    createPlayerObj("Hal", "🚷");
  }
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

function createPlayerObj(name, piece) {
  let player = {
    name,
    piece,
  };
  state.players.push(player);
}

// take turns placing our marks in empty spaces
function onCellClick() {
  const { activePlayer } = state;

  let id = $(this).attr("id");
  fillCell(id);

  if (state.activePlayer.name === "Hal") takeComputerTurn();
}

/**
 * This is what fillCell does
 * @param id this is an id string to represent ids and stuff
 */
function fillCell(id) {
  const { board, activePlayer } = state;

  const [row, col] = id.split(",");

  if (board[row][col] !== "") return;

  board[row][col] = activePlayer.piece;
  renderBoard();
  checkForEndGame();
  swapTurns();
}

function checkForEndGame() {
  const { activePlayer } = state;

  if (hasPlayerWon()) {
    winElement.removeClass("hideWin");
    winElement.addClass("showWin");
    if (activePlayer.name === "Hal")
      winElement.text(
        `I'm sorry ${state.players[0].name}, I can't let you do that.`
      );
    else winElement.text(`${activePlayer.name} has won!`);
  }
  if (didPlayersDraw()) {
    winElement.removeClass("hideWin");
    winElement.addClass("showWin");
    winElement.text(`Its a draw!`);
  }
}

function swapTurns() {
  const { activePlayer, players } = state;
  // state.activePlayer === players[0], then swap to players[1]
  if (activePlayer.piece === players[0].piece) state.activePlayer = players[1];
  // state.activePlayer === players[1], then swap to players[0]
  else if (activePlayer.piece === players[1].piece)
    state.activePlayer = players[0];
}

/**
 * Parses the board to see if any players have won the game.
 */
function hasPlayerWon() {
  const { board, activePlayer } = state;

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

function takeComputerTurn() {
  // Grab all of the available spaces
  const possibleMoves = [];

  // Loop through our board...
  for (var row = 0; row < 3; row++) {
    for (var col = 0; col < 3; col++) {
      // If board i, j === empty string, add it to possible moves
      if (state.board[row][col] === "") possibleMoves.push(`${row},${col}`);
    }
  }

  // Pick random id in possible moves
  const nextMove = Math.floor(Math.random() * possibleMoves.length);

  // Put a piece in a random spot
  fillCell(possibleMoves[nextMove]);
}

// =====INIT LISTENERS=====
startButton.click(startGame);
