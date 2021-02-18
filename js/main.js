let canvas = document.getElementById('background-game');
let context = canvas.getContext('2d');
let direction = 'right';
let box = 32;
let snake = [];

let food = {
    positionX: Math.floor(Math.random() * 15 + 1 ) * box,
    positionY: Math.floor(Math.random() * 15 + 1 ) * box
}

snake[0] = {
    positionX: 8 * box,
    positionY: 8 * box
}


function createBackground(){
    context.fillStyle = 'lightgreen';
    context.fillRect(0 , 0, 16 * box, 16 * box);
}

function createSnake(){
    for(let i = 0; i < snake.length; i++){
        context.fillStyle = 'green';
        context.fillRect(snake[i].positionX , snake[i].positionY, box, box);
    }
}

function manageMarginCrossing(){
    if(snake[0].positionX > (15 * box) && direction === "right"){
        snake[0].positionX = 0;
    }else if(snake[0].positionX < 0 && direction === "left"){
        snake[0].positionX = (15 * box);
    }else if(snake[0].positionY > (15 * box) && direction === "down"){
        snake[0].positionY = 0;
    }else if(snake[0].positionY < 0 && direction === "up"){
        snake[0].positionY = (15 * box);
    }
}

function updateDirection(event){
    manageMarginCrossing();

    if(event.keyCode === 37 && direction !== "right"){
        direction = "left";
    }else if(event.keyCode === 38 && direction !== "down"){
        direction = "up";
    }else if(event.keyCode === 39 && direction != "left"){
        direction = "right";
    }else if(event.keyCode === 40 && direction !== "up"){
        direction = "down";
    }
}

function drawFood(){
    context.fillStyle = "red";
    context.fillRect(food.positionX, food.positionY,  box, box);
}

function generateNewFood(){
    food.positionX = Math.floor(Math.random() * 15 + 1 ) * box;
    food.positionY = Math.floor(Math.random() * 15 + 1 ) * box;
}

function verifyIfAte(snakePositionX = 0,snakePositionY = 0,foodPositionX = 0,foodPositionY = 0){
    if(snakePositionX !== foodPositionX || snakePositionY != foodPositionY){
        snake.pop();
    } else {
        generateNewFood();
    }
    const newHead = {
        positionX: snakePositionX,
        positionY: snakePositionY
    };
    snake.unshift(newHead);   
}

function manageDirection(){
    let snakePositionX  = snake[0].positionX;
    let snakePositionY  = snake[0].positionY;
    let foodPositionX   = food.positionX;
    let foodPositionY   = food.positionY;

    if(direction === "right"){
        snakePositionX += box;
    } else if(direction === "left"){
        snakePositionX -= box;
    } else if(direction === "up"){
        snakePositionY -= box;
    } else if(direction === "down"){
        snakePositionY += box;
    }

    verifyIfAte(snakePositionX,snakePositionY,foodPositionX,foodPositionY);
}

function startGame(){
    createBackground();
    createSnake();
    drawFood();
    manageMarginCrossing();
    manageDirection();
}

document.addEventListener('keydown', updateDirection);

let game = setInterval(startGame, 100);