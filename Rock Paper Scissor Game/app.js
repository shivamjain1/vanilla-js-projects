let userScore = 0;
let compScore = 0;
const userScoreElem = document.getElementById("user-score");
const computerScoreElem = document.getElementById("computer-score");
const scoreBoardElem = document.querySelector(".score-board");
const resultElem = document.querySelector(".result > p");
const rockElem = document.getElementById("r");
const paperElem = document.getElementById("p");
const scissorsElem = document.getElementById("s");

function getComputerChoice() {
   const choices = ['r', 'p', 's'];
   const randomNo = Math.floor(Math.random()*3);
   return choices[randomNo];
}

function convertChoices(letter) {
    if(letter === "p") return "Paper";
    if(letter === "r") return "Rock";
    return "Scissors";
}
const user_sub = "user".fontsize(3).sub();
const comp_sub = "comp".fontsize(3).sub();

function win(userChoice, computerChoice) {
    const userChoiceElem = document.getElementById(userChoice);
    userScore++;
    userScoreElem.innerHTML = userScore;
    computerScoreElem.innerHTML = compScore;
    resultElem.innerHTML = `${convertChoices(userChoice)}${user_sub} beats ${convertChoices(computerChoice)}${comp_sub}. You win!`;
    userChoiceElem.classList.add('green-glow');
    setTimeout(()=>userChoiceElem.classList.remove('green-glow'), 300);
}

function lose(userChoice, computerChoice) {
    const userChoiceElem = document.getElementById(userChoice);
    compScore++;
    computerScoreElem.innerHTML = compScore;
    userScoreElem.innerHTML = userScore;
    resultElem.innerHTML = `${convertChoices(userChoice)}${user_sub} loses to ${convertChoices(computerChoice)}${comp_sub}. You lost..`;
    userChoiceElem.classList.add('red-glow');
    setTimeout(()=>userChoiceElem.classList.remove('red-glow'), 300);
}

function draw(userChoice, computerChoice) {
    const userChoiceElem = document.getElementById(userChoice);
    resultElem.innerHTML = `${convertChoices(userChoice)}${user_sub} equals ${convertChoices(computerChoice)}${comp_sub}. Its a draw..`;
    userChoiceElem.classList.add('grey-glow');
    setTimeout(()=>userChoiceElem.classList.remove('grey-glow'), 300);
}
 
function game(userChoice) {
    const computerChoice = getComputerChoice();
    switch(userChoice + computerChoice) {
        case "rs":
        case "pr":
        case "sp":
            win(userChoice, computerChoice);
            break;

        case "rp":
        case "ps":
        case "sr":
            lose(userChoice, computerChoice);
            break;

        case "rr":
        case "pp":
        case "ss":
            draw(userChoice, computerChoice);
            break;
    }
 }

function main() {
  rockElem.addEventListener("click", () => game("r"));

  paperElem.addEventListener("click", () => game("p"));

  scissorsElem.addEventListener("click", () => game("s"));
}

main();