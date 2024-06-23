let score = 0;
let gameOverFlag = false;
let cross = true;

// Assuming you have audio elements for the game and game over sounds
audiogo = new Audio('gameover.mp3');
audio=new Audio('music.mp3');
setTimeout(() => {
    audio.play()
},1000);

document.onkeydown = function (e) {
    if (gameOverFlag) return;

    console.log("Key code is: ", e.keyCode);

    let dino = document.querySelector('.dino');

    if (e.keyCode == 32) {  // Space bar
        if (!dino.classList.contains('animateDino')) {
            dino.classList.add('animateDino');
            setTimeout(() => {
                dino.classList.remove('animateDino');
            }, 1000); // Duration matches CSS animation duration
        }
    }

    if (e.keyCode == 39) {  // Right arrow
        let dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        if (!dino.classList.contains('animateDino')) {
            dino.classList.add('animateDino');
            setTimeout(() => {
                dino.classList.remove('animateDino');
            }, 1000); // Duration matches CSS animation duration
        }
        dino.style.left = (dinoX + 112) + "px";
    }

    if (e.keyCode == 37) {  // Left arrow
        let dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinoX - 112) + "px";
    }
};

setInterval(() => {
    if (gameOverFlag) return;

    let dino = document.querySelector('.dino');
    let gameOver = document.querySelector('.gameOver');
    let obstacle = document.querySelector('.obstacle');

    let dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    let dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('bottom'));

    let ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    let oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('bottom'));

    let offsetX = Math.abs(dx - ox);
    let offsetY = Math.abs(dy - oy);
    console.log(offsetX, offsetY);

    if (offsetX < 73 && offsetY < 52) {
        gameOver.innerHTML = "Game Over - Reload to Play Again";
        obstacle.classList.remove('obstacleAni');
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();
            audio.pause();
        }, 1000);
        gameOverFlag = true; // Set game over flag to true to stop further actions
    } else if (offsetX < 145 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            let aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            let newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';
            console.log('New animation duration: ', newDur);
        }, 500);
    }
}, 100);

function updateScore(score) {
    let scoreCont = document.getElementById('scoreCont');
    scoreCont.innerHTML = "Your Score: " + score;
}
