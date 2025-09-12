let editedPlayer = "0";
let activeplayer = 0;
let currentRound = 0;
let isGameOver = false;

const game = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
const player = [
  {
    name: "",
    symbol: "X",
    score: 0,
  },
  {
    name: "",
    symbol: "O",
    score: 0,
  },
];

const btnEditPlayer1 = document.getElementById("edit-player1");
const btnEditPlayer2 = document.getElementById("edit-player2");
const userEdit = document.querySelector(".edit-user");
const player1 = document.getElementById("player-one-username");
const cancel = document.getElementById("cancel-config");
const userInput = document.getElementById("userInput");
const formElement = document.querySelector("form");
const errorMess = document.getElementById("error-message");
const startGameBtn = document.querySelector("#startGame");
const clickedField = document.querySelectorAll("#game-board li");
const gameWinner = document.getElementById("game-over");
const userName = document.querySelectorAll("#users h2");
const restartGame =  document.getElementById('restart');


const score = document.getElementById("score-1");

const activePlayerName = document.getElementById("activePlayer");

btnEditPlayer1.addEventListener("click", openPlayerConsfig);
btnEditPlayer2.addEventListener("click", openPlayerConsfig);

cancel.addEventListener("click", closeDisplay);
startGameBtn.addEventListener("click", startGame);


restartGame.addEventListener('click', restartFullGame)
formElement.addEventListener("submit", savePlayer);

for (const clicked of clickedField) {
  clicked.addEventListener("click", clickedElement);
}