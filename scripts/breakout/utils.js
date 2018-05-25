// Written by Gabriel Brown

// A bunch of utilities

var utils = new Utils();

function Utils() {

    // Draws a rectangle on the canvas
    this.colorRect = function(canvasContext, x, y, width, height, color) {
        canvasContext.fillStyle = color;
        canvasContext.fillRect(x, y, width, height);
    };

    // Returns ideal brick width based on canvas size; 
    this.getBrickWidth = function(numColumns, canvasWidth, spacing) {
        
        // This assumes constant spacing. Hopefully it won't be an issue
        return Math.floor( (canvasWidth - ((numColumns - 1)*spacing) ) / numColumns);
    };

    // Returns what color a brick should be based on its row
    this.determineBrickColor = function(i, numRows) {

        if (i === 0) {
            return "purple";
        }
        else {

            var color;

            switch (i % numRows) {
                case 1:
                    color = "blue";
                    break;
                case 2:
                    color = "green";
                    break;
                case 3:
                    color = "yellow";
                    break;
                case 4:
                    color = "orange";
                    break;
                case 5:
                    color = "red";
                    break;
                default:
                    color = "white";
                    break;
            }

            return color;
        }
    }
}

function determineBrickColor(i, numRows) {

    
}