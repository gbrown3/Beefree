// Written by Gabriel Brown, 5/20/2018

var canvas;
var canvasContext;

const BALL_RADIUS = 10;
const INITIAL_BALLSPEEDY = 2;
var ballX;
var ballY;
var ballSpeedX = 4;
var ballSpeedY = 2;

const PADDLE_HEIGHT = 10;
const PADDLE_WIDTH = 100;
const WIGGLE_ROOM = 10;  // This is to make the game a little easier, so players can hit the ball even if it isn't pixel perfect
var playerPaddleX = 210;

window.onload = function() {

    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext("2d");

    colorRect(0, 0, canvas.width, canvas.height, "black");  // intialize canvas as black using helper function

    // Set up main loop
    var framesPerSecond = 60;
    setInterval(draw, 1000/framesPerSecond);

    // React to user input
    canvas.addEventListener("mousemove", 
        function(evt) {
            var mousePos = calcMousePos(evt);
            playerPaddleX = mousePos.x - (PADDLE_WIDTH/2);
        });
}

function draw() {
    // Clear screen
    colorRect(0, 0, canvas.width, canvas.height, "black");

    // Draw in player paddle
    colorRect(playerPaddleX, canvas.height - PADDLE_HEIGHT, PADDLE_WIDTH, PADDLE_HEIGHT, "white");    
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