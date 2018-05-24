// Written by Gabriel Brown

// Brickwall Class
// Contains data about each brick, so it can determine which bricks should be drawn

const BRICK_SPACING = 6;
const BRICK_WIDTH = 100;
const BRICK_HEIGHT = 25;


function Brickwall(canvasContext, numRows, numColumns) {
    this.canvasContext = canvasContext;
    this.bricks = intialBrickList(numRows, numColumns);
    this.bottom = determineBottom(numRows);
}

Brickwall.prototype = {

    constructor:Brickwall,

    draw:function(canvasContext) {
        
        for (var i = 0; i < this.bricks.length; i++) {      // Couldn't find the right foreach loop, but this works!

            this.bricks[i].draw(this.canvasContext);
        }
    }, 

    // // Out of all the bricks intersecting with the ball, determine which gets hit
    // determineHitBrick:function(hitBricks, ballX, ballY) {

    //     console.log("Ball radius: " + BALL_RADIUS);

    //     if (hitBricks.length === 1) {
    //         return this.bricks.indexOf(hitBricks[0]);
    //     }
    //     else {
    //         // TODO: deal with multiple bricks
    //     }
    // },

    // Check if any brick was hit, and if so remove the one closest to ball from brickwall
    checkWall:function(ballX, ballY) {

        //var hitBricks = [];
        var hitBrick = 0;

        for (var i = 0; i < this.bricks.length; i++) {

            if (this.bricks[i].containsPoint(ballX, ballY)) {

                //hitBricks.push(this.bricks[i]);
                hitBrick = this.bricks[i];
            }
        }

        // if (hitBricks.length === 0) {
        //     return false;
        // }
        if (hitBrick === 0) {
            return false;
        }
        else {
            // var indexOfHitBrick = this.determineHitBrick(hitBricks, ballX, ballY);
            // this.bricks.splice(indexOfHitBrick);
            // return true;

            var indexOfHitBrick = this.bricks.indexOf(hitBrick);

            this.bricks.splice(indexOfHitBrick, 1);
            return true;
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




// Returns the y value for the very bottom edge of the brick wall;
function determineBottom(numRows) {

    var bottom = 0;

    for (var i = 0; i < numRows; i++) {

        bottom += BRICK_HEIGHT + BRICK_SPACING;
    }

    //bottom += BRICK_HEIGHT;
    return bottom;
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













