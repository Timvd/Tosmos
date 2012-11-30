function Ball() {
	
	this.can = document.getElementById("GameCanvas");
	this.ctx = this.can.getContext("2d");
	
	this.decreaseRatio = 0.2;
	this.increaseRatio = 0.02;
		
	this.radius = Math.random() * 40 + 5;
		
	this.posX = Math.random() * (this.can.width - this.radius * 2) + this.radius;
	this.posY = Math.random() * (this.can.height - this.radius * 2) + this.radius;
	
	r = Math.random() * 2;
	if (r > 1) {
		this.velocityX = Math.random() * 0.5 - 0.25;
		this.velocityY = Math.random() * 0.5 - 0.25;
	}
	else if (r < 1) {
		this.velocityX = 0;
		this.velocityY = 0;
	}
	
	this.target = false;
	this.destroyed = false;
	this.color = "blue";
	
	this.checkCollision = function(ball) {
		var dx = this.posX - ball.posX;
		var dy = this.posY - ball.posY;
		var length = Math.sqrt(dx * dx + dy * dy);
		
		if (length - ball.radius < this.radius) {
			
			if (this.radius >= ball.radius) {
				this.radius += ball.increaseRatio;
				ball.radius -= this.decreaseRatio;
			}
			else {
				ball.radius += this.increaseRatio;
				this.radius -= ball.descreaseRatio;
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
		this.checkBoundaries();
		
		this.posX += this.velocityX;
		this.posY += this.velocityY;
		
		if (this.radius < 0.5) {
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