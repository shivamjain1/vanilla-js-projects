const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
const WINNING_POS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const cellElements = document.querySelectorAll("[data-cell]");
const boardElement = document.getElementById("board");
const winningMsgTextElement = document.querySelector(
  "[data-winning-text-message]"
);
const winningDivElement = document.getElementById("winning-message");
const restartBtn = document.getElementById('restartBtn');

let circleTurn;

// start game logic
startGame();

function startGame() {
  circleTurn = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener('click', handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });

  setBoardHoverClass();
  winningDivElement.classList.remove('show');
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    // switch turns
    swapTurns();
    // set hover class on board
    setBoardHoverClass();
  }
}

restartBtn.addEventListener('click', startGame);

const endGame = (draw) => {
  if (draw) {
      winningMsgTextElement.innerHTML = 'Draw!';
  } else {
    winningMsgTextElement.innerHTML = `${circleTurn ? "O's" : "X's"} Wins!`;
  }
  winningDivElement.classList.add("show");
};

const placeMark = (cell, currentClass) => {
  cell.classList.add(currentClass);
};

const swapTurns = () => {
  circleTurn = !circleTurn;
};

function setBoardHoverClass() {
  boardElement.classList.remove(X_CLASS);
  boardElement.classList.remove(CIRCLE_CLASS);
  circleTurn
    ? boardElement.classList.add(CIRCLE_CLASS)
    : boardElement.classList.add(X_CLASS);
}

function checkWin(currentClass) {
  return WINNING_POS.some((combination) => {
    return combination.every((ind) => {
      return cellElements[ind].classList.contains(currentClass);
    });
  });
}

const isDraw = () => {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
    });
}
