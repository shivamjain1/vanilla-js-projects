const canvas = document.getElementById('snakeGame');
const ctx = canvas.getContext("2d");

// creating the box unit
const box = 32;

// load images

const gameArea = new Image();
gameArea.src = "assets/images/ground.png";

const gameObject = new Image();
gameObject.src = "assets/images/food.png";

// loadig audio files
const dead = new Audio();
const eat = new Audio();
const up = new Audio();
const left = new Audio();
const right = new Audio();
const down = new Audio();

dead.src = "assets/audio/dead.mp3";
eat.src = "assets/audio/eat.mp3";
up.src = "assets/audio/up.mp3";
left.src = "assets/audio/left.mp3";
right.src = "assets/audio/right.mp3";
down.src = "assets/audio/down.mp3";

// creating snake

let snake = [];

snake[0] = {
    x: 9 * box,
    y: 10 * box
}

// creating the gameObject i.e. food

let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
}

// creating the score var
let player = { speed: 300, score: 0 };
const levelSpeed = {easy: 300, moderate: 200, difficult: 100};

// adjust game speed as per selected level
const level = document.querySelector('.level');
const startScreen = document.querySelector('.startScreen');
let gamePlay;

level ? level.addEventListener('click', (e)=> {
    startScreen.classList.add('hide');
    player.speed = levelSpeed[e.target.id];

    // calling draw function as per level
    gamePlay = setInterval(draw, player.speed);
}) : null;


// controlling the snake
let dir;
document.addEventListener('keydown', (event) => {
    let key = event.keyCode;
    if(key === 37 && dir != "RIGHT"){
        left.play();
        dir = "LEFT";
    } else if(key === 38 && dir != "DOWN"){
        up.play();
        dir = "UP";
    } else if(key === 39 && dir != "LEFT"){
        right.play();
        dir = "RIGHT";
    } else if(key === 40 && dir != "UP"){
        down.play();
        dir = "DOWN";
    }
});

// check collision function
function onCollision(head, array) {
    for(let i=0; i< array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

// drawing everything to the canvas

function draw() {
    ctx.drawImage(gameArea, 0, 0);
    
    for(let i = 0; i< snake.length; i++) {
        ctx.fillStyle = (i==0) ? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.drawImage(gameObject, food.x, food.y);

    // old snake head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // which direction snake moves
    if(dir === "LEFT") snakeX -= box;
    if(dir === "UP")   snakeY -= box;
    if(dir === "RIGHT") snakeX += box;
    if(dir === "DOWN")  snakeY += box;

    // if the snake eats the food
    if(snakeX === food.x && snakeY === food.y){
        player.score++;
        eat.play();
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        }
    } else {
        // remove the snake's tail
        snake.pop();
    }

    // adding new snake's head
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    // game over
    if(snakeX < box || snakeX > 17 * box || snakeY < 3 * box ||
       snakeY > 17 * box || onCollision(newHead, snake)){
        clearInterval(gamePlay);
        startScreen.classList.remove('hide');
        startScreen.innerHTML = "Game Over <br> Your final score is " + player.score + "<br> Refresh to restart the game.";
        dead.play();
    }

    snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font = "45px sans serif";
    ctx.fillText(player.score, 2*box, 1.6*box);
}