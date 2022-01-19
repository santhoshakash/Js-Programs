score = 0;
audiogo = new Audio('gameover.mp3');
cross = true;

document.onkeydown = function (e) { //used to find the keycode of wht btn we pressed in keyboard
    console.log("Key Code is: ", e.keyCode);
    if (e.keyCode == 38) {
         //fetch the dino tag
        dino = document.querySelector(".dino");
         //create a new class with dino
        dino.classList.add('animateDino');
        setTimeout(() => {
             //remove the process after 700ms
            dino.classList.remove('animateDino');
        }, 700);
    }
    if (e.keyCode == 39) { //if we presses rightarrow it move right 
        dino = document.querySelector(".dino");
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue("left"));
        dino.style.left = (dinoX + 112) + "px";
    }
    if (e.keyCode == 37) { //if we presses leftarrow it move left
        dino = document.querySelector(".dino");
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue("left"));
        dino.style.left = (dinoX - 112) + "px";
    }

}

setInterval(() => {
    dino = document.querySelector('.dino');
    gameOver = document.querySelector(".gameOver");
    obstacle = document.querySelector(".obstacle");
    //Its get the about x axis and y axis
    //Its select the dino from anbove line 18 and fetch the style property from css dino prop
    //dino coordinates
    //parse is converting a string into integer
    //dino coordinates
    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));


    //obstacle coordinates
    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    //math.abs return when value is negative it coverted into positive absolute value
    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);
    console.log(offsetX, offsetY);

    if (offsetX < 73 && offsetY < 52) {
        gameOver.innerHTML = "Game Over - Reload to start over";
        obstacle.classList.remove('obstacleAni');
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();
        }, 1000);
    }
    else if (offsetX < 145 && cross) {
        score += 1;  //score=score+1;
        updateScore(score);//after score returns
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => { //the speed of monsters is get increases for everytime the dino jumps over it
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';
        }, 500);
    }

}, 10);

function updateScore(score) {
    scoreCont.innerHTML = "Your Score: " + score;
}