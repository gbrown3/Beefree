// Written by Gabriel Brown, 5/20/2018

// Simple Breakout Program

var canvas;
var canvasContext;

var waitingToStart = true;
var winLoseText = "";


const NUM_ROWS = 6; //6;
const NUM_COLUMNS = 7; //7;
var brickwall;

const BALL_RADIUS = 10;
const INITIAL_BALLSPEEDY = 2;
var ballX;
var ballY;
var ballSpeedX = 2;
var ballSpeedY = -5;  //-2;

const PADDLE_HEIGHT = 10;
const PADDLE_WIDTH = 100;
const WIGGLE_ROOM = 10;  // This is to make the game a little easier, so players can hit the ball even if it isn't pixel perfect
var playerPaddleX = 210;

window.onload = function() {

    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext("2d");

    utils.colorRect(canvasContext, 0, 0, canvas.width, canvas.height, "black");  // intialize canvas as black using helper function
    brickwall = new Brickwall(canvasContext, canvas.width, NUM_ROWS, NUM_COLUMNS);

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
                reset();
            }
        });
}

function draw() {
    // Clear screen
    utils.colorRect(canvasContext, 0, 0, canvas.width, canvas.height, "black");

    // Draw bricks
    brickwall.draw(canvasContext); 

    // Check for win
    if (brickwall.bricks.length === 0) {
        winLoseText = "YOU WIN!";
        waitingToStart = true;
    }

    if (waitingToStart) { 

        // Draw win/lose text if valid
        if (winLoseText === "YOU WIN!") { canvasContext.fillStyle = "green"; }
        else { canvasContext.fillStyle = "red"; }
        
        canvasContext.font = '30px Arial';
        canvasContext.textAlign = 'center';
        canvasContext.fillText(winLoseText, canvas.width/2, canvas.height/2);

        // Draw in ball and paddle at center position
        utils.colorRect(canvasContext, canvas.width/2 - (PADDLE_WIDTH/2), canvas.height - PADDLE_HEIGHT, PADDLE_WIDTH, PADDLE_HEIGHT, "white");

        ballX = canvas.width/2;
        ballY = canvas.height - PADDLE_HEIGHT - BALL_RADIUS;
        colorCircle(ballX, ballY, BALL_RADIUS, "white");

        canvasContext.fillStyle = "white";
        canvasContext.font = '15px Arial';
        canvasContext.textAlign = 'center';
        canvasContext.fillText("click to start", canvas.width/2, canvas.height/2 + 100);

        return;
    }

    moveBall();

    // Draw in player paddle
    utils.colorRect(canvasContext, playerPaddleX, canvas.height - PADDLE_HEIGHT, PADDLE_WIDTH, PADDLE_HEIGHT, "white");

    // Draw ball
    colorCircle(ballX, ballY, BALL_RADIUS, "white");   
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

    if (ballX <= 0 || ballX >= canvas.width) { 
        ballSpeedX = -ballSpeedX; 
        utils.playSound("blip-1");
    }

    //if (ballY <= 0 || ballY >= canvas.height) { ballSpeedY = -ballSpeedY; }

    if (ballY >= canvas.height - PADDLE_HEIGHT) {

        if (ballX < playerPaddleX || ballX > (playerPaddleX + PADDLE_WIDTH)) {

            waitingToStart = true;
            winLoseText = "YOU LOSE";

        } else {
            ballSpeedY = -ballSpeedY;

            // Give player better control of ball direction
            var deltaX = ballX - (playerPaddleX + PADDLE_WIDTH/2);   // distance between ball and center of paddle
            ballSpeedX = deltaX * 0.25;

            utils.playSound("blip-1");
        }
    }

    // If ball could be within the brick wall
    if (ballY <= brickwall.bottom) {

        if (brickwall.checkWall(ballX, ballY)) {

            ballSpeedY = -ballSpeedY;

            if (ballY < brickwall.bottom) {
                ballSpeedX = -ballSpeedX;
            }

            utils.playSound("tap-1");
        }
        else {
            if (ballY <= 0 ) { 

                ballSpeedY = -ballSpeedY; 
                utils.playSound("tap-1");
            }
        }
    }


    ballX += ballSpeedX;
    ballY += ballSpeedY;
}

// Makes a fresh brick wall, normalizes the ball speeds
function reset() {

    brickwall = new Brickwall(canvasContext, canvas.width, NUM_ROWS, NUM_COLUMNS);
    ballSpeedX = 2;
    ballSpeedY = -2;
}

// Draws a circle on the canvas
function colorCircle(x, y, radius, color) {
    canvasContext.fillStyle = color;
    canvasContext.beginPath();
    canvasContext.arc(x, y, radius, 0, Math.PI*2, true);
    canvasContext.fill();
}












