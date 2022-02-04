const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");//its to get all grahical property
const ballRadius = 13;
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = 2;//mienute increment in x direction
const numberOfBricks = 30;
let activeBricks = numberOfBricks;
let numberOfColumns = 4;
let numberOfRows = 3;
let bricks = [];//total bricks 
var brickWidth = 100;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var paddleHeight = 10;
var paddleWidth = 100;
var paddleX = canvas.width/2 - (paddleWidth/2);  //210 //150
// var paddley = canvas.height - paddleHeight; //390
var scoreContainer = document.getElementById("score");
scoreContainer.innerText = "Score :- 0";

function updateScore() {
  const score = getScore();

  scoreContainer.innerText = `Score :- ${score}`;
  if (score === numberOfColumns * numberOfRows) {
    // alert("Congratulations you won the game");
    window.location.reload();
    clearInterval(interval);
  }
}

function getScore() {
  var score = 0;
  for (var r = 0; r < numberOfRows; r++) {
    for (var c = 0; c < numberOfColumns; c++) {
      if (bricks[r][c].status === 0) score++;
    }
  }

  return score;
}
//creation of bricks 
function generateAllBricks() {
  for (var r = 0; r < numberOfRows; r++) { //r is row and c is column
    bricks[r] = []; //for each row creation of bricks
    for (var c = 0; c < numberOfColumns; c++) {
      bricks[r][c] = { x: r, y: c, status: 1 }; //status 1 means brick is alive
    }
  }
  console.log(bricks);
}

//drawing the bricks
function drawAllBricks() { //its call in draw
  //this will draw all bricks in our canvas
  for (var r = 0; r < numberOfRows; r++) {
    for (var c = 0; c < numberOfColumns; c++) {
      var brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
      var brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
      if (!bricks[r][c]) bricks[r][c] = { x: brickX, y: brickY };
      else {
        bricks[r][c].x = brickX;
        bricks[r][c].y = brickY;
      }
      if (bricks[r][c].status) { // if brick is alive then print brick
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function checkBoundaryHit() { // its used for touch the paddle and if touches boundary then gameover
  if (x + dx + ballRadius >= canvasWidth || x + dx <= ballRadius) dx = -dx; //make a ball to move backward when the if happens side wall
  if (y + dy <= ballRadius) dy = -dy;
  else if (y + dy > canvasHeight - ballRadius) {
    //check for paddle bounce or not
    if (x > paddleX && x < paddleX + paddleWidth) dy = -dy;//ball should bounce
    else handleGameOver();
  }
}

function handleGameOver() {
  // alert("Game over, your score is " + getScore());
  updateScore();
  updateScore();
  window.location.reload();
  clearInterval(interval);
}

//its for when ball touches bricks
function collisionDetection() { //its call in draw
  for (var r = 0; r < numberOfRows; r++) {
    for (var c = 0; c < numberOfColumns; c++) {
      var b = bricks[r][c];
      //check if ball in a rang of brick
      if (
        y <= b.y + brickHeight &&
        y >= b.y &&
        x >= b.x &&
        x <= b.x + brickWidth &&
        b.status === 1
      ) {
        dy = -dy;
        b.status = 0;//make ball dead
        updateScore();
        //delete bricks[r][c];
      }
    }
  }
}

function draw() {
      //creation of ball
  ctx.beginPath();
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095D";
  ctx.fill();
  ctx.closePath();
  checkBoundaryHit();
  x += dx; //make ball move
  y += dy;
  drawAllBricks();//its create the bricks
  drawPaddle();
  collisionDetection();
}

//creattion of pedall
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

generateAllBricks();
drawAllBricks();
const interval = setInterval(draw, 20);
window.onkeydown = (e) => {
  // if (e.key == "Right" || e.key == "ArrowRight") { //move the paddle to right 
  //   if (paddleX + 10 + paddleWidth <= canvasWidth) paddleX = paddleX + 40;
  // } else if (e.key == "Left" || e.key == "ArrowLeft") { //move the paddle to left
  //   if (paddleX - 10 >= 0) paddleX = paddleX - 40;
  // }
  if (e.key == "Right" || e.key == "ArrowRight") {
    if(paddleX < canvasWidth-paddleWidth){
      paddleX = paddleX + 1000;
    }
 } else if (e.key == "Left" || e.key == "ArrowLeft") {
   if (paddleX > 0 ){
     paddleX = paddleX - 1000;
   }
 }
};
