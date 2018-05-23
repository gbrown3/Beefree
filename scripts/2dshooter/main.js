/*
---------------------------------------
The main script file for Beefree's 2D shooter
Created by Ansel Colby on 05/20/2018
---------------------------------------
*/

// CANVAS VARIABLES //
var canvas;
var ctx;

// FRAMES PER SECOND //
var fps;

// PLAYER VARIABLES //
var player;
var pSize;

/**
 * Waits for the screen to load and then performs the main loop
**/
window.onload = function(){
	init();

	// The main loop of the game
	setInterval(function() {
		updateGame();
		renderGame();
	}, fps/1000);
}

/**
 * Initializes globals and sets up the Canvas
**/
function init() {
	canvas = document.getElementById('gameCanvas');
	ctx = canvas.getContext('2d');

	fps = 60;

	player = new Player();
	pSize = 50;
	player.x = canvas.width/2 - pSize/2;
	player.y = canvas.height - pSize - 10;

	document.addEventListener("keydown", player.keyLogDown);
	document.addEventListener("keyup", player.keyLogUp);
}

/**
 * Updates anything that is not taken care of in renderGame()
**/
function updateGame() {
	// PLAYER
	player.update();
}

/**
 * Draws all elements of the game on the screen including:
 * background, player, enemies
**/
function renderGame() {
	// DRAW BACKGROUND
	ctx.fillStyle ='black';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// PLAYER
	player.render(ctx);
}