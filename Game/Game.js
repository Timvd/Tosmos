Game();
function Game() {
	can = document.getElementById("GameCanvas");
	ctx = can.getContext("2d");
	
	var player = new Player(this);
	var totalBalls = 30;
	var ballList = new Array();
	
	this.particleManager = new ParticleManager();
	
	spawnBalls();
	
	window.requestAnimFrame = (function(){
		return    window.requestAnimationFrame       || 
				  window.webkitRequestAnimationFrame || 
				  window.mozRequestAnimationFrame    || 
				  window.oRequestAnimationFrame      || 
				  window.msRequestAnimationFrame     || 
		function( callback ){
			window.setTimeout(callback, 1000 / 60);
		};
	})();
	
	
	(function animloop(){
		requestAnimFrame(animloop);
		update();
	
	})();
	
	function spawnBalls() {
		for ( var i = 0; i < totalBalls; i++) {
			var ball = new Ball(false);
			if (player.checkCollision(ball, true)) {
				i--;
			}
			else {
				ballList.push(ball);
			}
		}
		var n = Math.floor(Math.random() * (ballList.length - 1));
		ballList[n].target = true;
	}
	
	window.addEventListener("mousedown", function(event) {
		var mouseX = 0;
		var mouseY = 0;

	    if(event.offsetX) {
	        mouseX = event.offsetX;
	        mouseY = event.offsetY;
	    }
	    else if(event.layerX) {
	        mouseX = event.layerX;
	        mouseY = event.layerY;
	    }
		player.setMousePos(mouseX, mouseY);
		player.mouseDown = true;
	},false);
	
	window.addEventListener("mouseup", function(event) {
		player.mouseDown = false;
	},false);
	
	this.spawnBall = function(size, posX, posY, velocityX, velocityY) {
		var ball = new Ball();
		ball.radius = size;
		ball.posX = posX;
		ball.posY = posY;
		ball.velocityX = velocityX;
		ball.velocityY = velocityY;
		ballList.push(ball);
	};
	
	function update() {
		drawBackground();
		//this.particleManager.createSolidEating(100, 100);
		
		for ( var i = 0; i < ballList.length; i++) {
			
			if (player.radius < ballList[i].radius) {
				if (ballList[i].target) {
					ballList[i].color = "brown";
				}
				else {
					ballList[i].color = "red";
				}
			}
			else {
				if (ballList[i].target) {
					ballList[i].color = "green";
				}
				else {
					ballList[i].color = "blue";
				}
			}
			
			//check collisions
			for (var z = 0; z < ballList.length; z++) {
				if(ballList[i] != ballList[z]) {
					ballList[i].checkCollision(ballList[z]);
				}
			}
			
			player.checkCollision(ballList[i], false);
			
			if (ballList[i].destroyed) {
				ballList.splice(i, 1);
				i--;
			}
			
			ballList[i].update();
		}
		
		player.update();
		this.particleManager.update();
	}
	
	function drawBackground() {
		ctx.clearRect(0, 0, this.can.width, this.can.height);
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, this.can.width, this.can.height);
	};
}