let canvas = document.getElementById('background-game');
let context = canvas.getContext('2d');
let direction = 'right';
let box = 32;
let snake = [];

snake[0] = {
    x: 8 * box,
    y: 8 * box
}


function createBackground(){
    context.fillStyle = 'lightgreen';
    context.fillRect(0 , 0, 16 * box, 16 * box);
}

function createSnake(){
    for(let i = 0; i < snake.length; i++){
        context.fillStyle = 'green';
        context.fillRect(snake[i].x , snake[i].y, box, box);
    }
}

function startGame(){
    if(snake[0].x > (15 * box) && direction === "right"){
        snake[0].x = 0;
    }else if(snake[0].x < 0 && direction === "left"){
        snake[0].x = (16 * box);
    }else if(snake[0].y > (15 * box) && direction === "right"){
        snake[0].y = 0;
    }else if(snake[0].x < 0 && direction === "right"){
        snake[0].y = (16 * box);
    }
    
    createBackground();
    createSnake();

    let positionSnakeX = snake[0].x;
    let positionSnakeY = snake[0].y;

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
        x:  positionSnakeX,
        y: positionSnakeY
    };

    snake.unshift(newHead);
}

function updateDirection(event){
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

document.addEventListener('keydown', updateDirection);

let game = setInterval(startGame, 100);