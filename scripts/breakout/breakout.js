// Written by Gabriel Brown, 5/20/2018

// Simple Breakout Program

var canvas;
var canvasContext;

var waitingToStart = true;

const NUM_ROWS = 5;
const NUM_COLUMNS = 5;
var brickwall;

const BALL_RADIUS = 10;
const INITIAL_BALLSPEEDY = 2;
var ballX;
var ballY;
var ballSpeedX = 2;
var ballSpeedY = -2;

const PADDLE_HEIGHT = 10;
const PADDLE_WIDTH = 100;
const WIGGLE_ROOM = 10;  // This is to make the game a little easier, so players can hit the ball even if it isn't pixel perfect
var playerPaddleX = 210;

window.onload = function() {

    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext("2d");

    utils.colorRect(canvasContext, 0, 0, canvas.width, canvas.height, "black");  // intialize canvas as black using helper function
    brickwall = new Brickwall(canvasContext, NUM_ROWS, NUM_COLUMNS);

    // Set up main loop
    var framesPerSecond = 60;
    setInterval(draw, 1000/framesPerSecond);

    // React to user input
    canvas.addEventListener("mousemove", 
        function(evt) {
            var mousePos = calcMousePos(evt);
            playerPaddleX = mousePos.x - (PADDLE_WIDTH/2);
        });
    canvas.addEventListener("mousedown", 
        function() {
            if (waitingToStart) {
                waitingToStart = false;
            }
        });
}

function draw() {
    // Clear screen
    utils.colorRect(canvasContext, 0, 0, canvas.width, canvas.height, "black");

    if (waitingToStart) { 
        // Draw in ball and paddle at center position
        utils.colorRect(canvasContext, canvas.width/2 - (PADDLE_WIDTH/2), canvas.height - PADDLE_HEIGHT, PADDLE_WIDTH, PADDLE_HEIGHT, "white");

        ballX = canvas.width/2;
        ballY = canvas.height - PADDLE_HEIGHT - BALL_RADIUS;
        colorCircle(ballX, ballY, BALL_RADIUS, "white");

        canvasContext.fillStyle = "white";
        canvasContext.font = '15px Arial';
        canvasContext.fillText("click to start", canvas.width/2 - 45, canvas.height/2 + 100);

        return;
    }

    moveBall();

    // Draw in player paddle
    utils.colorRect(canvasContext, playerPaddleX, canvas.height - PADDLE_HEIGHT, PADDLE_WIDTH, PADDLE_HEIGHT, "white");

    // Draw ball
    colorCircle(ballX, ballY, BALL_RADIUS, "white");   

    // Draw bricks
    brickwall.draw(canvasContext); 
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

function moveBall() {

    if (ballX <= 0 || ballX >= canvas.width) { ballSpeedX = -ballSpeedX; }

    //if (ballY <= 0 || ballY >= canvas.height) { ballSpeedY = -ballSpeedY; }

    if (ballY >= canvas.height - PADDLE_HEIGHT) {

        if (ballX < playerPaddleX || ballX > (playerPaddleX + PADDLE_WIDTH)) {
            reset();
        } else {
            ballSpeedY = -ballSpeedY;

            // Give player better control of ball direction
            var deltaX = ballX - (playerPaddleX + PADDLE_WIDTH/2);   // distance between ball and center of paddle
            ballSpeedX = deltaX * .35;
        }
    }

    // If ball could be within the brick wall
    if (ballY <= brickwall.bottom) {

        if (brickwall.checkWall(ballX, ballY)) {
            ballSpeedY = -ballSpeedY;
            if (ballY < brickwall.bottom) {
                ballSpeedX = -ballSpeedX;
            }
        }
        else {
            if (ballY <= 0 ) { ballSpeedY = -ballSpeedY; }
        }
    }

    


    ballX += ballSpeedX;
    ballY += ballSpeedY;
}

function reset() {
    waitingToStart = true;
    brickwall = new Brickwall(canvasContext, NUM_ROWS, NUM_COLUMNS);
    ballSpeedX = 2;
    ballSpeedY = -2;

}

// // Draws a rectangle on the canvas
// function colorRect(x, y, width, height, color) {
//     canvasContext.fillStyle = color;
//     canvasContext.fillRect(x, y, width, height);
// }

// Draws a circle on the canvas
function colorCircle(x, y, radius, color) {
    canvasContext.fillStyle = color;
    canvasContext.beginPath();
    canvasContext.arc(x, y, radius, 0, Math.PI*2, true);
    canvasContext.fill();
}












