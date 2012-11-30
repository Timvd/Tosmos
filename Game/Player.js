function Player(game) {
	this.game = game;
	this.can = document.getElementById("GameCanvas");
	this.ctx = this.can.getContext("2d");
	
	this.velocityX = 0;
	this.velocityY = 0;
	
	this.posX = this.can.width * 0.5;
	this.posY = this.can.height * 0.5;
	
	this.thrusterX;
	this.thrusterY;
	this.friction = 0.997;
	this.speed = 1;
	this.maxSpeed = 4;
	
	this.radius = Math.random() * 20 + 20;
	this.color = "cyan";
	
	this.mouseDown = false;
	this.mouseIncremental = 0.001;
	this.mouseDownTime = this.mouseIncremental;
	this.mouseX = 0;
	this.mouseY = 0;
	
	this.decreaseRatio = 0.2;
	this.increaseRatio = 0.02;
	
	this.setMousePos = function(mx, my) {
		this.mouseX = mx;
		this.mouseY = my;
	};
	
	this.checkCollision = function(ball, justCheck) {
		var dx = this.posX - ball.posX;
		var dy = this.posY - ball.posY;
		var length = Math.sqrt(dx * dx + dy * dy);
		
		if (length - ball.radius < this.radius) {
			if (justCheck){
				return true;
			}
			if (this.radius >= ball.radius) {
				if (ball.target) {
					this.radius = 100;
					ball.destroyed = true;
				}
				else {
					this.radius += this.increaseRatio;
					ball.radius -= this.decreaseRatio;
				}
			}
			else {
				if (!this.destroyed) {
					ball.radius += this.increaseRatio;
					this.radius -= this.decreaseRatio;
				}
			}
		}
		else if(justCheck){
			return false;
		}
	};
	
	this.checkMouse = function() {
		if (this.mouseDown) {
			
			if (!this.destroyed) {
				this.mouseDownTime += this.mouseIncremental;
				
				var dx = this.posX - this.mouseX;
				var dy = this.posY - this.mouseY;
				var length = Math.sqrt(dx * dx + dy * dy);
				
				this.thrusterX = (dx / length) * this.mouseDownTime;
				this.thrusterY = (dy / length) * this.mouseDownTime;
				
				this.velocityX += this.thrusterX;
				this.velocityY += this.thrusterY;
				
				this.radius -= this.mouseDownTime;
				
				//eureka!
				var spawnValue = Math.floor((this.mouseDownTime * 1000)) % 5;
				
				this.game.particleManager.createBubbles(this.posX, this.posY, -this.thrusterX * 10, -this.thrusterY * 10);
				
				if (spawnValue == 0) {
					var particleSize = (this.mouseDownTime * 1.5) * this.radius;
					
					this.game.spawnBall(particleSize,
										this.posX,
										this.posY,
										-this.thrusterX * 10, 
										-this.thrusterY * 10);
				}
			}
			else {
				this.mouseDownTime = 0.1;
			}
		}
	};
	
	this.checkBoundaries = function() {
		if (this.posY > (this.can.height - this.radius) && this.velocityY > 0) {
			this.velocityY *= -1;
		}else if (this.posY < this.radius && this.velocityY < 0) {
			this.velocityY *= -1;
		};
		
		if (this.posX > (this.can.width - this.radius) && this.velocityX > 0) {
			this.velocityX *= -1;
		}else if (this.posX < this.radius && this.velocityX < 0) {
			this.velocityX *= -1;
		};
	};
	
	this.update = function() {
		this.checkMouse();
		this.checkBoundaries();
		
		this.velocityX *= this.friction;
		this.velocityY *= this.friction;
		
		this.posX += this.velocityX;
		this.posY += this.velocityY;
		
		if (this.radius < 5) {
			this.destroyed = true;
		}
		
		this.draw();
	};
	
	this.draw = function() {
		this.ctx.fillStyle = this.color;
		this.ctx.beginPath();
		this.ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, true);
		this.ctx.closePath();
		this.ctx.fill();
	};
}