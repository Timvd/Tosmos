function Particle() {
	this.can = document.getElementById("GameCanvas");
	this.ctx = this.can.getContext("2d");
	
	this.initiated = false;
	this.friction = 1;
	
	this.fade = false;
	this.fadeRatio = 0.01;
	this.fadeValue = 1;
	
	this.scale = false;
	this.scaleValue = 1.02;
	
	this.alive = true;
	this.timeAlive = 100;
	this.timeCount = 0;
	
	this.lineColor = "black";
	this.lineWidth = 0;
	this.fill = true;
	
	this.rotation = 1;
	
	this.accelerationX = 0;
	this.accelerationY = 0;
	
	this.particleGroupType = "default";
	
	this.createRectangle = function(color, x, y, w, h, vx, vy) {
		this.type = "rectangle";
		this.color = color;
		this.posX = x;
		this.posY = y;
		this.width = w;
		this.height = h;
		this.velX = vx;
		this.velY = vy;
		this.initiated = true;
	};
	
	this.createCircle = function(color, x, y, r, vx, vy) {
		this.type = "circle";
		this.color = color;
		this.posX = x;
		this.posY = y;
		this.radius = r;
		this.velX = vx;
		this.velY = vy;
		this.initiated = true;
	};
	
	this.update = function() {
		if (this.initiated) {
			this.velX *= this.friction;
			this.velY *= this.friction;
			
			this.posX += this.velX += this.accelerationX;
			this.posY += this.velY += this.accelerationY;
			
			if (this.fade) {
				this.fadeOut();
			}
			
			if (this.scale) {
				this.scaleOut();
			}
			
			this.checkAlive();
			this.draw();
		}
		else {
			console.log("Particle has not been intialized yet");
		}
	};
	
	this.rotate = function(angle) {
		var virtualX = Math.cos(angle);
		var virtualY = Math.sin(angle);

		this.velX *= virtualX;
		this.velY *= virtualY;
	};
	
	this.draw = function() {
		if (this.type == "circle") {
			this.ctx.save();
			this.ctx.globalAlpha = this.fadeValue;
			if (this.lineWidth > 0) {
				this.ctx.strokeStyle = this.lineColor;
				this.ctx.lineWidth = this.lineWidth;
			}
			this.ctx.fillStyle = this.color;
			this.ctx.beginPath();
			this.ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, true);
			this.ctx.closePath();
			if (this.fill) {
				this.ctx.fill();
			}
			if (this.lineWidth > 0) {
				this.ctx.stroke();
			}
			this.ctx.restore();
		} 
		else if (this.type == "rectangle") {
			this.ctx.save();
			this.ctx.globalAlpha = this.fadeValue;
			if (this.lineWidth > 0) {
				this.ctx.strokeStyle = this.lineColor;
				this.ctx.lineWidth = this.lineWidth;
			}
			this.ctx.fillStyle = this.color;
			this.ctx.beginPath();
			this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
			this.ctx.closePath();
			if (this.fill) {
				this.ctx.fill();
			}
			if (this.lineWidth > 0) {
				this.ctx.stroke();
			}
			this.ctx.restore();
		}
	};
	
	this.checkAlive = function() {
		this.timeCount++;
		
		if (this.timeCount >= this.timeAlive || this.fadeValue <= 0.01) {
			this.alive = false;
		}
	};
	
	this.scaleOut = function() {
		if (this.type == "circle") {
			this.radius *= this.scaleValue;
		}
		else if (this.type == "rectangle") {
			this.width *= this.scaleValue;
			this.height *= this.scaleValue;
		}
	};
	
	this.fadeOut = function() {
		this.fadeValue -= this.fadeRatio;
	};
};