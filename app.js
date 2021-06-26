let state = {
  board: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
  players: [],
};

// As users playing a two player game we want to:

// enter our names and have them displayed
function enterName(event) {
  event.preventDefault();
  state.players = [];
  let player1 = $("#player1name").val();
  let player2 = $("#player2name").val();
  createPlayerObj(player1, "X");
  createPlayerObj(player2, "O");
  console.log(state);
}

$("#start").click(enterName);

function createPlayerObj(name, piece) {
  let player = {
    name,
    piece,
    playersTurn: false,
  };
  state.players.push(player);
}

// have our order chosen for us by the game
// take turns placing our marks in empty spaces
// not be able to place our marks in an occupied space
// be told when a move causes a player to win, or to draw
// start the game over without having to reset the browser
// As a user playing a single player game I additionally want to:

// see the name 'Computer' displayed as my opponent
// have the Computer player make moves as if it were a human player with the correct mark in an empty space
// As a user playing a single player game I would be delighted if:

// the Computer made 'better-than-guessing' choices when placing a mark on the board
