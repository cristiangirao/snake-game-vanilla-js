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
    positionSnakeX: 8 * box,
    positionSnakeY: 8 * box
}


function createBackground(){
    context.fillStyle = 'lightgreen';
    context.fillRect(0 , 0, 16 * box, 16 * box);
}

function createSnake(){
    for(let i = 0; i < snake.length; i++){
        context.fillStyle = 'green';
        context.fillRect(snake[i].positionSnakeX , snake[i].positionSnakeY, box, box);
    }
}

function manageMarginCrossing(){
    if(snake[0].positionSnakeX > (15 * box) && direction === "right"){
        snake[0].positionSnakeX = 0;
    }else if(snake[0].positionSnakeX < 0 && direction === "left"){
        snake[0].positionSnakeX = (15 * box);
    }else if(snake[0].positionSnakeY > (15 * box) && direction === "down"){
        snake[0].positionSnakeY = 0;
    }else if(snake[0].positionSnakeY < 0 && direction === "up"){
        snake[0].positionSnakeY = (15 * box);
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

function startGame(){
    manageMarginCrossing();
    createBackground();
    createSnake();
    drawFood();

    let positionSnakeX = snake[0].positionSnakeX;
    let positionSnakeY = snake[0].positionSnakeY;

    if(direction === "right"){
        positionSnakeX += box;
    } else if(direction === "left"){
        positionSnakeX -= box;
    } else if(direction === "up"){
        positionSnakeY -= box;
    } else if(direction === "down"){
        positionSnakeY += box;
    }

    snake.pop();

    const newHead = {
        positionSnakeX,
        positionSnakeY
    };

    snake.unshift(newHead);
}

document.addEventListener('keydown', updateDirection);

let game = setInterval(startGame, 100);