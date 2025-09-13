// ===================== GAME.JS =====================
// ===================== TIMER LOGIC =====================
let timer;
let timeLeft = 10;

function startTimer() {
  clearInterval(timer);
  timeLeft = 10;
  document.getElementById("timer").textContent = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      handleTimeout();
    }
  }, 1000);
}

function handleTimeout() {
  if (isGameOver) return;
  // Auto switch turn if time runs out
  switchPlayer();

  // If AI's turn, trigger AI immediately
  if (activeplayer === 1 && !isGameOver) {
    setTimeout(aiMove, 500);
  }
}

function clickedElement(e) {
  if (isGameOver || activeplayer === 1) return; // block clicks on AI turn

  const click = e.target;
  const clickedRow = click.dataset.row - 1;
  const clickedCol = click.dataset.col - 1;

  if (game[clickedRow][clickedCol] > 0) return;

  makeMove(clickedRow, clickedCol, click, activeplayer);

  const winnerId = checkForGameOver();
  if (winnerId !== 0) {
    gameOver(winnerId);
    return;
  }

  switchPlayer();
  startTimer(); // restart timer after human move

  // AI move
  if (!isGameOver && activeplayer === 1) {
    setTimeout(aiMove, 500);
  }

  function makeMove(row, col, cell, playerIndex) {
    currentRound++;
    game[row][col] = playerIndex + 1;
    cell.textContent = player[playerIndex].symbol;
    cell.classList.add("disabled");
  }

  function aiMove() {
  if (isGameOver) return;

  // 1. Try to win immediately
  let winMove = findWinningMove(2);
  if (winMove) {
    makeAiChoice(winMove.i, winMove.j);
    return;
  }

  // 2. Block human's winning move
  let blockMove = findWinningMove(1);
  if (blockMove) {
    makeAiChoice(blockMove.i, blockMove.j);
    return;
  }

  // 3. Opening strategy (center > corners)
  if (currentRound === 1 && game[1][1] === 0) {
    makeAiChoice(1, 1);
    return;
  }

  // 4. Otherwise, minimax
  let bestScore = -Infinity;
  let move;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (game[i][j] === 0) {
        game[i][j] = 2; // AI move
        let score = minimax(game, 0, false, -Infinity, Infinity);
        game[i][j] = 0;
        if (score > bestScore) {
          bestScore = score;
          move = { i, j };
        }
      }
    }
  }

  if (move) makeAiChoice(move.i, move.j);
}


function makeAiChoice(i, j) {
  const cell = document.querySelector(
    `#game-board li[data-row="${i + 1}"][data-col="${j + 1}"]`
  );
  makeMove(i, j, cell, 1);

  const winnerId = checkForGameOver();
  if (winnerId !== 0) {
    gameOver(winnerId);
    return;
  }

  switchPlayer();
  startTimer();
}


  // Minimax algorithm for AI
  function minimax(board, depth, isMaximizing, alpha, beta) {
  const result = checkForGameOver();
  if (result !== 0) {
    if (result === 1) return -10 + depth;  // human wins
    if (result === 2) return 10 - depth;   // AI wins
    if (result === -1) return 0;           // draw
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === 0) {
          board[i][j] = 2;
          let score = minimax(board, depth + 1, false, alpha, beta);
          board[i][j] = 0;
          bestScore = Math.max(score, bestScore);
          alpha = Math.max(alpha, score);
          if (beta <= alpha) return bestScore; // pruning
        }
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === 0) {
          board[i][j] = 1;
          let score = minimax(board, depth + 1, true, alpha, beta);
          board[i][j] = 0;
          bestScore = Math.min(score, bestScore);
          beta = Math.min(beta, score);
          if (beta <= alpha) return bestScore; // pruning
        }
      }
    }
    return bestScore;
  }
}


  function checkWinnerForAI(board) {
    // Rows & Columns
    for (let i = 0; i < 3; i++) {
      if (
        board[i][0] &&
        board[i][0] === board[i][1] &&
        board[i][0] === board[i][2]
      )
        return board[i][0];
      if (
        board[0][i] &&
        board[0][i] === board[1][i] &&
        board[0][i] === board[2][i]
      )
        return board[0][i];
    }
    // Diagonals
    if (
      board[0][0] &&
      board[0][0] === board[1][1] &&
      board[0][0] === board[2][2]
    )
      return board[0][0];
    if (
      board[0][2] &&
      board[0][2] === board[1][1] &&
      board[0][2] === board[2][0]
    )
      return board[0][2];

    // Draw
    let openSpots = 0;
    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++) if (board[i][j] === 0) openSpots++;

    return openSpots === 0 ? "draw" : null;
  }

  function checkForGameOver() {
    return checkWinnerForAI(game) || 0;
  }

  function switchPlayer() {
    activeplayer = activeplayer === 0 ? 1 : 0;
    activePlayerName.textContent = player[activeplayer].name;
  }

  function gameOver(winnerId) {
    isGameOver = true;
    gameWinner.classList.remove("hidden");

    if (winnerId === "draw") {
      gameWinner.children[0].textContent = "It is a Draw!";
    } else {
      player[winnerId - 1].score++;
      gameWinner.children[0].textContent = `${
        player[winnerId - 1].name
      } Won 🎉`;
      document.getElementById(`score-${winnerId}`).textContent =
        player[winnerId - 1].score;
    }
  }
}

function findWinningMove(playerId) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (game[i][j] === 0) {
        game[i][j] = playerId;
        if (checkForGameOver() === playerId) {
          game[i][j] = 0; // reset
          return { i, j };
        }
        game[i][j] = 0;
      }
    }
  }
  return null;
}
