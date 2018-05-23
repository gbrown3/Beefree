// Written by Gabriel Brown

// Brick class
// Written using constructor pattern

function Brick(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
}

Brick.prototype = {

    constructor:Brick,

    draw:function(canvasContext) {
        drawBorder(this);
        utils.colorRect(canvasContext, this.x, this.y, this.width, this.height, this.color);
    },

    containsPoint:function(x, y) {
        return ((x >= this.x) && (x <= this.x + this.width)) && ((y >= this.y) && (y <= this.y + this.height));
    }
}

function drawBorder(brick) {
    var thickness = 1;
    utils.colorRect(canvasContext, brick.x - thickness, brick.y - thickness, brick.width + (thickness * 2), brick.height + (thickness * 2), brick.color);
}

