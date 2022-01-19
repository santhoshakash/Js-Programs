 let inputDir = {x:0,y:0};//set the snake is which index at the moment
 //fetched the music from folder and store in the variable
 const foodSound = new Audio('music/food.mp3');
 const gameOverSound = new Audio('music/gameover.mp3');
 const moveSound = new Audio('music/move.mp3');
 const musicSound = new Audio('music/music.mp3');
let speed = 8;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {
        x: 13,//grid numbers
        y: 15
    }
]
food = { x: 6, y: 8 };
//Game functions
//its is used for make the game stayed in loop
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) { //it set the speed of snake
        return;
    }

    lastPaintTime = ctime;
    gameEngine();//call this function

}
function isCollide(snake){ //initailY the snake was not collide
     //if snake bumps into itself
     for (let index = 1; index < snakeArr.length; index++) {
        //if snake head index is equal to snake body index then return true
        if (snake[index].x === snake[0].x && snake[index].y === snake[0].y) {
            return true;
        }
    }

    //if snake collides with the boundary of the board,snake of head is enter the 19th grid then its collides
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }
    return false;
}

 
function gameEngine() {
// 1) updating the snake array and food
if(isCollide(snakeArr)){
    gameOverSound.play();
    inputDir = {x:0,y:0};
    alert('Game over,Press refresh to play again');
    snakeArr={x:13,y:15}
    score=0;
}
////if snake has eaten the food, increment the score and regenrate the food
if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();
    //perform the score part
    score += 1; //score = score +1 ;
    if (score > hiScoreVal) {
        hiScoreVal = score;
        localStorage.setItem("hiScore", JSON.stringify(hiScoreVal));
        hiscoreBox.innerHTML = "HiScore: " + hiScoreVal;
    }
    scoreBox.innerHTML = "Score: " + score;
    snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
    let a = 2;
    let b = 16;
    //generate the foof after snake eats food placed on  between the 2 & 16
    food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
}
//moving the snake
for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
}

snakeArr[0].x += inputDir.x;
snakeArr[0].y += inputDir.y;

///////Display the snake head and food...

board.innerHTML = "";
//its iterate over each ele in array
snakeArr.forEach((e, index) => {
    //Display snake
    //its create a div ele
    snakeElement = document.createElement('div');
    //create a style for grid
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
     
    if(index==0){
        snakeElement.classList.add('head');

    }
    else{
        snakeElement.classList.add('snake');
    }
    
    board.appendChild(snakeElement);

});

 //Display food
 foodElement = document.createElement('div');
 foodElement.style.gridRowStart = food.y;
 foodElement.style.gridColumnStart = food.x;
 foodElement.classList.add('food')
 board.appendChild(foodElement);
};



//main content starts here
let hiScore = localStorage.getItem("hiScore");
if (hiScore === null) {
    hiScoreVal = 0;
    localStorage.setItem("hiScore", JSON.stringify(hiScoreVal))
}
else {
    //fetch data from the local storage
    hiScoreVal = JSON.parse(hiScore);
    hiscoreBox.innerHTML = "HiScore: " + hiScore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 };
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
});
 