var gamePlay;
var up = false, down = false, right = false, left = false;


function setup() {
	createCanvas(710, 400);
	gamePlay = new Game();
}

function draw() {
	background(50, 89, 100);
	gamePlay.play();
}

function keyPressed() {
	if( keyCode == LEFT_ARROW ) {
		left = true;
	}
	else if( keyCode == RIGHT_ARROW ) {
		right = true;
	}
	else if( keyCode == UP_ARROW ) {
		up = true;
	}
	else if( keyCode == DOWN_ARROW ) {
		down = true;
	}
}

function keyReleased() {
	if( keyCode == LEFT_ARROW ) {
		left = false;
	}
	else if( keyCode == RIGHT_ARROW ) {
		right = false;
	}
	else if( keyCode == UP_ARROW ) {
		up = false;
	}
	else if( keyCode == DOWN_ARROW ) {
		down = false;
	}
}

function Player() {
	var monsterType, size, damageRate, score, R, G, B, takeDamage, border, borderColor, maxHealth = 100, health = 100, x = width/2, y = height/2, speed, regSpeed;
	this.play = function() {
		
	}
}