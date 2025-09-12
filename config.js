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

function closeDisplay(e) {
  userEdit.style.display = "none";
  userInput.style.border = "1px solid rgb(204, 204, 204)";
  errorMess.textContent = "";
  userInput.classList.remove("error");
  userInput.value = "";
}
