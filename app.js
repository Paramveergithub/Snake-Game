let canvas = document.querySelector("canvas")
let ctx = canvas.getContext('2d')


let cellSize = 50;

let boardHeight = 650;
let boardWidth = 1250;
let direction = "right";
let score = 0;
let gameOver = false;

let snake = [ [0, 0] ];

function foodGenerate(){
  return[
     Math.round((Math.random() * (boardWidth - cellSize)) / cellSize) * cellSize,
     Math.round((Math.random() * (boardHeight - cellSize)) / cellSize) * cellSize
  ]
}

let food = foodGenerate();

function draw(){

  if(gameOver === true){
    clearInterval(intervalId);
    ctx.fillStyle = 'red';
    ctx.font = '90px sans-sarif';
    ctx.fillText('Game Over!!', 300, 250)
    return;
  }

  ctx.clearRect(0, 0, boardWidth, boardHeight)

  //***draw snake  
  for(let cell of snake){
    ctx.fillStyle = 'brown';
    ctx.fillRect(cell[0], cell[1], cellSize, cellSize);
    ctx.strokeStyle = "black";
    ctx.strokeRect(cell[0], cell[1], cellSize, cellSize)
  }

//***** draw food
  ctx.fillStyle = 'yellow'
  ctx.fillRect(food[0], food[1], cellSize, cellSize);

  //*** draw score
  ctx.font = "30px cursive";
  ctx.fillText(`S c o r e : -  _ ${score} _`, 20, 40)
}

function update(){
  let headX = snake[snake.length - 1] [0];
  let headY = snake[snake.length - 1] [1];

  let newHeadX;
  let newHeadY;

  if(direction === 'up'){
   newHeadX = headX;
   newHeadY = headY - cellSize;
   if(newHeadY < 0 || checkmate(newHeadX, newHeadY)){
    gameOver = true;
   }
  }
  else if(direction === "right"){
    newHeadX = headX + cellSize;
    newHeadY = headY;
    if(newHeadX === boardWidth || checkmate(newHeadX, newHeadY)){
      gameOver = true;
    }
  }
  else if(direction === "down"){
    newHeadX = headX;
    newHeadY = headY + cellSize;
    if(newHeadY >= boardHeight || checkmate(newHeadX, newHeadY)){
      gameOver = true;
    }
  }else{
    newHeadX = headX - cellSize;
    newHeadY = headY;
    if(newHeadX < 0 || checkmate(newHeadX, newHeadY)){
      gameOver = true;
    }
  }
  
  snake.push([newHeadX, newHeadY]);

  if(newHeadX === food[0] && newHeadY === food[1]){
    food = foodGenerate();
    score += 1;
  }else{
    snake.shift();
  }
}


document.addEventListener('keydown', function(e){
  if(e.key === "ArrowUp"){
    direction = 'up'
  }
  else if(e.key === "ArrowLeft"){
    direction = 'left'
  }
  else if(e.key === "ArrowDown"){
    direction = 'down'
  }
  else{
    direction = 'right';
  }
})

// khud ko kaatoge to marr jaoge
function checkmate(newHeadX , newHeadY ){
  for(let item of snake){
      if(item[0] === newHeadX && item[1] === newHeadY){
          return true;
      }
  }
  return false;
}

let intervalId =  setInterval(function(){
  update();
  draw();
}, 400);