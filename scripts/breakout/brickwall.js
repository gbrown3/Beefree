// Written by Gabriel Brown

// Brickwall Class
// Contains data about each brick, so it can determine which bricks should be drawn

const BRICK_SPACING = 10;
const BRICK_WIDTH = 100;
const BRICK_HEIGHT = 10;


function Brickwall(canvasContext, numRows, numColumns) {
    this.canvasContext = canvasContext;
    this.bricks = intialBrickList(numRows, numColumns);
}

Brickwall.prototype = {

    constructor:Brickwall,

    draw:function(canvasContext) {
        
        for (var i = 0; i < this.bricks.length; i++) {      // Couldn't find the right foreach loop, but this works!

            this.bricks[i].draw(this.canvasContext);
        }
    }

}

function intialBrickList(numRows, numColumns) {

    var bricklist = [];

    for (var i = 0; i < numRows; i++) {

        for (var j = 0; j < numColumns; j++) {

            var brick = new Brick( (j-1)*BRICK_WIDTH, (i-1)*BRICK_HEIGHT, BRICK_WIDTH, BRICK_HEIGHT, "blue");
            
            if (j !== 0) { 
                brick.x += BRICK_SPACING;
                brick.y += BRICK_SPACING;
            }    // Only add spacing if it's not the first

            bricklist.push(brick);

        }
    }

    return bricklist;
}