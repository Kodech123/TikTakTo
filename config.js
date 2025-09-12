// ===================== CONFIG.JS =====================

function openPlayerConsfig(e) {
  editedPlayer = +e.target.dataset.player;
  userEdit.style.display = "block";
}

function savePlayer(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const enteredPlayername = formData.get("playername").toUpperCase().trim();

  if (!enteredPlayername) {
    e.target.firstElementChild.classList.add("error");
    errorMess.textContent = "Please enter a valid name";
    return;
  }

  const playerContent = document.getElementById(
    `player-${editedPlayer}-content`
  );
  playerContent.children[1].textContent = enteredPlayername;

  player[editedPlayer - 1].name = enteredPlayername;
  closeDisplay();
}

function closeDisplay() {
  userEdit.style.display = "none";
  userInput.style.border = "1px solid rgb(204, 204, 204)";
  errorMess.textContent = "";
  userInput.classList.remove("error");
  userInput.value = "";
}

function reset() {
  startTimer();
  activeplayer = 0;
  currentRound = 0;
  isGameOver = false;

  gameWinner.children[0].innerHTML = "<h2>You won</h2>";
  gameWinner.classList.add("hidden");

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      game[i][j] = 0;
    }
  }

  clickedField.forEach(function (li) {
    li.classList.remove("disabled");
    li.textContent = "";
  });

  activePlayerName.textContent = player[activeplayer].name;
}

function startGame() {
  startTimer();

  if (player[0].name === "" || player[1].name === "") {
    alert("Input a Player");
    return;
  }
  reset();
  document.getElementById("active-game").style.display = "block";

  // if Player 2 is computer, skip its config
  if (player[1].name.toLowerCase() === "computer") {
    player[1].symbol = "O";
  }
}

function restartFullGame() {
  reset();
  document.getElementById("score-1").textContent = "0";
  document.getElementById("score-2").textContent = "0";

  player[0].score = 0;
  player[1].score = 0;

  document.querySelector("#player-one-username").textContent = "PLAYER NAME";
  document.querySelector("#player-2-content h3").textContent = "PLAYER NAME";

  document.getElementById("active-game").style.display = "none";
}
