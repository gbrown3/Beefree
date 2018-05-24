// Written by Gabriel Brown

// Brickwall Class
// Contains data about each brick, so it can determine which bricks should be drawn

const BRICK_SPACING = 6;
const BRICK_WIDTH = 100;
const BRICK_HEIGHT = 25;


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

            var brick = new Brick( j*BRICK_WIDTH, i*BRICK_HEIGHT, BRICK_WIDTH, BRICK_HEIGHT, "white");
            
            if (j !== 0) { 
                brick.x += BRICK_SPACING * j;
            }    
            if (i !== 0) {
                brick.y += BRICK_SPACING * i;
            }

            brick.color = determineBrickColor(i, numColumns);

            bricklist.push(brick);
        }
    }

    return bricklist;
}


function determineBrickColor(i, numRows) {

    if (i === 0) {
        return "blue";
    }
    else {

        var color;

        switch (i % numRows) {
            case 1:
                color = "green";
                break;
            case 2:
                color = "yellow";
                break;
            case 3:
                color = "orange";
                break;
            case 4:
                color = "red";
                break;
            default:
                color = "white";
                break;
        }

        return color;
    }
}













