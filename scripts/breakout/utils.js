// Written by Gabriel Brown

// A bunch of utilities

var utils = new Utils();

function Utils() {

    // Draws a rectangle on the canvas
    this.colorRect = function(canvasContext, x, y, width, height, color) {
        canvasContext.fillStyle = color;
        canvasContext.fillRect(x, y, width, height);
    };
}