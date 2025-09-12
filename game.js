function reset() {
  activeplayer = 0;
  currentRound = 0;
  isGameOver = false
  gameWinner.children[0].innerHTML = "<h2>You won</h2>";
  gameWinner.classList.add("hidden")

  for(let i = 0; i<3; i++){
    for(let j = 0; j<3; j++){
      game[i][j] = 0;
    }
  }
  clickedField.forEach(function(li){
    li.classList.remove("disabled");
    li.textContent = ''
  })
}


function startGame() {
  if (player[0].name == "" || player[1].name == "") {
    alert("Input a Player");
    return;
  }
  reset()
  activePlayerName.textContent = player[activeplayer].name;
  document.getElementById("active-game").style.display = "block";
}

function checkForGameOver() {
  for (let i = 0; i < 3; i++) {
    if (
      game[i][0] > 0 &&
      game[i][0] === game[i][1] &&
      game[i][0] === game[i][2]
    ) {
      
      return game[i][0];
    }
  }
  for (let i = 0; i < 3; i++) {
    if (
      game[0][i] > 0 &&
      game[0][i] === game[1][i] &&
      game[0][i] === game[2][i]
    ) {
      return game[0][i];
    }
  }
  if (
    game[0][0] > 0 &&
    game[0][0] === game[1][1] &&
    game[0][0] === game[2][2]
  ) {
    return game[0][0];
  }
  if (
    game[0][2] > 0 &&
    game[0][2] === game[1][1] &&
    game[0][2] === game[2][0]
  ) {
    return game[0][2];
  }
  if (currentRound === 9) {
    return -1;
  }

  return 0;
}


function switchPlayer() {
  if (activeplayer == 0) {
    activeplayer = 1;
  } else {
    activeplayer = 0;
  }
  activePlayerName.textContent = player[activeplayer].name;
}


const gameOver = function(winnerId){
  isGameOver = true;
  if (winnerId > 0) {
    gameWinner.classList.remove("hidden");
    gameWinner.children[0].textContent = `${player[activeplayer].name} Won🎉🎉`;
  } else if (winnerId === -1) {
    gameWinner.classList.remove("hidden");
    gameWinner.children[0].textContent = `It is a Draw`;
  }
}


function clickedElement(e) {
  if(isGameOver){
    return
  }
  const click = e.target;
  const clickedRow = click.dataset.row - 1;
  const clickedCol = click.dataset.col - 1;
  if (game[clickedRow][clickedCol] > 0) {
    return;
  }
  currentRound++;
  click.textContent = player[activeplayer].symbol;
  click.classList.add("disabled");
  game[clickedRow][clickedCol] = activeplayer + 1;

  const winnerId = +checkForGameOver();
  if (winnerId !== 0){
    gameOver(winnerId)
  }
  switchPlayer();
}
