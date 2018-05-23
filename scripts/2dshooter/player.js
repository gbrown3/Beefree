/*
----------------------------------------------
The player class
Created by Ansel Colby, 05/20/2018
----------------------------------------------
*/
function Player() {
	this.x = 0;
	this.y = 0;
	this.vx = 0;
	this.vy = 0;
	this.vMax = 35;
	this.cmds = { l:false, r:false, u:false, d:false, fire:false }
	

	/**
	 * Creates and draws the player object
	**/
	this.render = function(ctx) {
		ctx.fillStyle = 'blue';
		ctx.fillRect(this.x, this.y, pSize, pSize);
	}

	this.update = function() {
		if (player.cmds.l) { 
			if (this.vx > -this.vMax) { this.vx -= 1; }
		}
		if (player.cmds.r) { 
			if (this.vx < this.vMax) { this.vx += 1; } 
		}
		if (player.cmds.u) { 
			if (this.vy > -this.vMax) { this.vy -= 1; }
		}
		if (player.cmds.d) { 
			if (this.vy < this.vMax) { this.vy += 1; }
		}
		if (!(player.cmds.u || player.cmds.d)) { this.vy *= 0.98; }
		if (!(player.cmds.l || player.cmds.r)) { this.vx *= 0.98; }

		if (player.cmds.fire) { 
			null; //--> TODO: IMPLEMENT FIRING 
		} 

		this.x += .05 * this.vx;
		this.y += .05 * this.vy;
	}

	/**
	 * Deals with player input and movement
	**/
	this.keyLogDown = function(e) {
		var key = e.keyCode ? e.keyCode : e.which;
		switch(key) {	
			case 37: // LEFT //
				player.cmds.l = true;
				break;
			case 38: // UP //
				player.cmds.u = true;
				break;
			case 39: // RIGHT //
				player.cmds.r = true;
				break;
			case 40: // DOWN //
				player.cmds.d = true;
				break;
			case 32: // SHOOT //
				player.cmds.fire = true;
				console.log("Firing weapons, captain!");
				break;
		}
	}

	/**
	 * Deals with player input and movement
	**/
	this.keyLogUp = function(e) {
		var key = e.keyCode ? e.keyCode : e.which;
		switch(key) {	
			case 37: // LEFT //
				player.cmds.l = false;
				break;
			case 38: // UP //
				player.cmds.u = false;
				break;
			case 39: // RIGHT //
				player.cmds.r = false;
				break;
			case 40: // DOWN //
				player.cmds.d = false;
				break;
			case 32: // SHOOT //
				player.cmds.fire = false;
				console.log("Weapon systems shutting down.")
				break;
		}
	}
}