var canvas;
var canvasContext; 

var showingWinScreen = false;

const WINNING_SCORE = 10;
var playerScore = 0;
var cpuScore = 0;
var winText = "";

const BALL_RADIUS = 10;
const INITIAL_BALLSPEEDY = 2;
var ballX;
var ballY;
var ballSpeedX = 4;
var ballSpeedY = 2;

const PADDLE_HEIGHT = 100;
const PADDLE_WIDTH = 10;
const WIGGLE_ROOM = 10;  // This is to make the game a little easier, so players can hit the ball even if it isn't pixel perfect
var playerPaddleY = 210;

const CPU_MOVEMENT_SPEED = 6;
const CPU_REACTION_THRESHOLD = 25; //number of pixels away from the center of the paddle the ball has to be before CPU reacts
var cpuPaddleY = 210;

window.onload = function() {

    canvas = document.getElementById("gameCanvas");
    //canvas.style.width = window.innerWidth + "px";
    //canvas.style.height = window.innerHeight + "px";

    canvasContext = canvas.getContext("2d");
    canvasContext.fillStyle = "black";
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);

    ballX = canvas.width/2;
    ballY = canvas.height/2;

    var framesPerSecond = 60;
    setInterval(draw, 1000/framesPerSecond);

    canvas.addEventListener("mousemove", 
        function(evt) {
            var mousePos = calcMousePos(evt);
            playerPaddleY = mousePos.y - (PADDLE_HEIGHT/2);
        });

    canvas.addEventListener("mousedown", 
        function () {
            if (showingWinScreen) { 

                playerScore = 0;
                cpuScore = 0;
                showingWinScreen = false; 
            }
        });
}    

function draw() {

    // Clear the canvas
    colorRect(0, 0, canvas.width, canvas.height, "black");

    if (showingWinScreen) {
        canvasContext.fillStyle = "green";
        canvasContext.font = '25px Arial';
        canvasContext.fillText(winText, canvas.width/2 - 75, canvas.height/2);
        canvasContext.fillStyle = "white";
        canvasContext.font = '15px Arial';
        canvasContext.fillText("click to continue", canvas.width/2 - 45, canvas.height/2 + 100);

        return;
    }

    // Figure out new ball/paddle positions
    moveStuff();

    // Add in ball at new position
    colorCircle(ballX, ballY, BALL_RADIUS, "red");

    // Left Paddle
    colorRect(0, playerPaddleY, PADDLE_WIDTH, PADDLE_HEIGHT, "white");

    // Right Paddle
    colorRect(canvas.width - PADDLE_WIDTH, cpuPaddleY, PADDLE_WIDTH, PADDLE_HEIGHT, "white");

    // Scores
    canvasContext.fillStyle = "white";
    canvasContext.font = '20px Arial';
    canvasContext.fillText(playerScore, 150, 100);
    canvasContext.fillText(cpuScore, canvas.width - 150, 100);
}

function moveStuff() {
    if (showingWinScreen) { return; }   // Pauses the action to show player they've won
    moveBall();
    moveCPUPaddle();
}

function moveBall() {

    if (ballY < 0 || ballY >= canvas.height) { ballSpeedY = -ballSpeedY; }
    if (ballX < 0 || ballX >= canvas.width) { resetBall(); }

    if (ballX <= PADDLE_WIDTH) {

        if ((ballY < (playerPaddleY - WIGGLE_ROOM)) || (ballY > (playerPaddleY + PADDLE_HEIGHT + WIGGLE_ROOM))) {

            cpuScore++;
            resetBall();

        } else {

            ballSpeedX = -ballSpeedX;

            // Give player more control of ball's direction
            var deltaY = ballY - (playerPaddleY + PADDLE_HEIGHT/2);
            ballSpeedY = deltaY * 0.35;
        }
    }

    if (ballX >= (canvas.width - PADDLE_WIDTH)) {

        if ((ballY < (cpuPaddleY - WIGGLE_ROOM)) || (ballY > (cpuPaddleY + PADDLE_HEIGHT + WIGGLE_ROOM))) {

            playerScore++;
            resetBall();

        } else {

            ballSpeedX = -ballSpeedX;

            // Give cpu more influence on ball's direction
            var deltaY = ballY - (cpuPaddleY + PADDLE_HEIGHT/2);
            ballSpeedY = deltaY * 0.3;
        }
    }

    ballX += ballSpeedX;
    ballY += ballSpeedY;
}

function moveCPUPaddle() {

    // Perfect AI
    //cpuPaddleY = ballY - (PADDLE_HEIGHT/2); 

    // Less perfect AI
    var cpuPaddleCenter = cpuPaddleY + (PADDLE_HEIGHT / 2);

    if (cpuPaddleCenter < ballY - CPU_REACTION_THRESHOLD) {
        cpuPaddleY += CPU_MOVEMENT_SPEED;
    } else if (cpuPaddleY > ballY + CPU_REACTION_THRESHOLD){
        cpuPaddleY -= CPU_MOVEMENT_SPEED;
    }

}

function resetBall() {

    if (playerScore === WINNING_SCORE) {
        winText = "Player wins"
        showingWinScreen = true;
    } else if (cpuScore === WINNING_SCORE) {
        winText = "Computer wins"
        showingWinScreen = true;
    }

    ballX = canvas.width/2;
    ballY = canvas.height/2;

    // put it back to a normal speed
    if (ballSpeedY < 0) {
        ballSpeedY = INITIAL_BALLSPEEDY;   
    } else {
        ballSpeedY = -INITIAL_BALLSPEEDY;
    }
}

function calcMousePos(evt) {

    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;

    // Note: this is a javascript 'Object Literal'. I'm guessing objects in JS are like python objects, basically just a dictionary
    return {
        x:mouseX,
        y:mouseY
    };
}

function colorRect(x, y, width, height, color) {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x, y, width, height);
}

function colorCircle(x, y, radius, color) {
    canvasContext.fillStyle = color;
    canvasContext.beginPath();
    canvasContext.arc(x, y, radius, 0, Math.PI*2, true);
    canvasContext.fill();
}



