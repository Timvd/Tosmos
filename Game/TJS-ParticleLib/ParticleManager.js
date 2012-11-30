function ParticleManager() {
	
	this.particleList = new Array();
	
	this.particleSpawnSpeed = 0;
	var angle = 0;
	this.update = function() {
		for ( var i = 0; i < this.particleList.length; i++) {
			
			if (this.particleList[i].particleGroupType == "default") {
				
			}
			else if (this.particleList[i].particleGroupType == "solidEating") {
				angle += 0.01;
				this.particleList[i].rotate(30);
			}
			
			this.particleList[i].update();
			
			if (!this.particleList[i].alive) {
				this.particleList.splice(i, 1);
				i--;
			}
		}
	};
	
	this.createBubbles = function(x, y, dirX, dirY) {
		var p = new Particle();
		p.createCircle("#CCFFFF",x, y, Math.random() * 3, dirX + Math.random () * 0.70 - 0.35, dirY + Math.random () * 0.70 - 0.35);
		p.fade = true;
		p.scale = true;
		p.lineColor = "#99FFFF";
		p.lineWidth = 2;
		p.fill = false;
		this.particleList.push(p);
	};
	
	this.createSolidEating = function (x, y) {
		for ( var int = 0; int < 2; int++) {
			var p = new Particle();
			
			var number = Math.random() * 2 - 1;
			if (number <= 0) {
				number -= 1;
			}
			else {
				number += 1;
			}
			
			p.createRectangle("#CC9900", x, y, Math.random() * 3 + 1.5,  Math.random() * 3 + 1.5, number, Math.random() * 1 - 0.5);
			p.fade = true;
			//p.accelerationY = 0.01;
			//p.accelerationX = 0;
			p.particleGroupType = "solidEating";
			this.particleList.push(p);
		}
	};
	
	
	this.spawnParticle = function(p) {
		
	};
}