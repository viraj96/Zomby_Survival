var gamePlay, width, height;
var up = false, down = false, right = false, left = false;

function preload() {
	zombie1_walk_right = loadAnimation("./data/Zombie_1_Walk_Right/frame0.png", "./data/Zombie_1_Walk_Right/frame1.png", "./data/Zombie_1_Walk_Right/frame2.png", "./data/Zombie_1_Walk_Right/frame3.png", "./data/Zombie_1_Walk_Right/frame4.png", "./data/Zombie_1_Walk_Right/frame5.png");
	zombie2_walk_right = loadAnimation("./data/Zombie_2_Walk_Right/frame0.png", "./data/Zombie_2_Walk_Right/frame1.png", "./data/Zombie_2_Walk_Right/frame2.png", "./data/Zombie_2_Walk_Right/frame3.png", "./data/Zombie_2_Walk_Right/frame4.png", "./data/Zombie_2_Walk_Right/frame5.png");
	zombie3_walk_right = loadAnimation("./data/Zombie_3_Walk_Right/frame0.png", "./data/Zombie_3_Walk_Right/frame1.png", "./data/Zombie_3_Walk_Right/frame2.png", "./data/Zombie_3_Walk_Right/frame3.png", "./data/Zombie_3_Walk_Right/frame4.png", "./data/Zombie_3_Walk_Right/frame5.png");
	zombie4_walk_right = loadAnimation("./data/Zombie_4_Walk_Right/frame0.png", "./data/Zombie_4_Walk_Right/frame1.png", "./data/Zombie_4_Walk_Right/frame2.png", "./data/Zombie_4_Walk_Right/frame3.png", "./data/Zombie_4_Walk_Right/frame4.png", "./data/Zombie_4_Walk_Right/frame5.png");
	zombie5_walk_right = loadAnimation("./data/Zombie_5_Walk_Right/frame0.png", "./data/Zombie_5_Walk_Right/frame1.png", "./data/Zombie_5_Walk_Right/frame2.png", "./data/Zombie_5_Walk_Right/frame3.png", "./data/Zombie_5_Walk_Right/frame4.png", "./data/Zombie_5_Walk_Right/frame5.png");
	zombie1_walk_left = loadAnimation("./data/Zombie_1_Walk_Left/frame0.png", "./data/Zombie_1_Walk_Left/frame1.png", "./data/Zombie_1_Walk_Left/frame2.png", "./data/Zombie_1_Walk_Left/frame3.png", "./data/Zombie_1_Walk_Left/frame4.png", "./data/Zombie_1_Walk_Left/frame5.png");
	zombie2_walk_left = loadAnimation("./data/Zombie_2_Walk_Left/frame0.png", "./data/Zombie_2_Walk_Left/frame1.png", "./data/Zombie_2_Walk_Left/frame2.png", "./data/Zombie_2_Walk_Left/frame3.png", "./data/Zombie_2_Walk_Left/frame4.png", "./data/Zombie_2_Walk_Left/frame5.png");
	zombie3_walk_left = loadAnimation("./data/Zombie_3_Walk_Left/frame0.png", "./data/Zombie_3_Walk_Left/frame1.png", "./data/Zombie_3_Walk_Left/frame2.png", "./data/Zombie_3_Walk_Left/frame3.png", "./data/Zombie_3_Walk_Left/frame4.png", "./data/Zombie_3_Walk_Left/frame5.png");
	zombie4_walk_left = loadAnimation("./data/Zombie_4_Walk_Left/frame0.png", "./data/Zombie_4_Walk_Left/frame1.png", "./data/Zombie_4_Walk_Left/frame2.png", "./data/Zombie_4_Walk_Left/frame3.png", "./data/Zombie_4_Walk_Left/frame4.png", "./data/Zombie_4_Walk_Left/frame5.png");
	zombie5_walk_left = loadAnimation("./data/Zombie_5_Walk_Left/frame0.png", "./data/Zombie_5_Walk_Left/frame1.png", "./data/Zombie_5_Walk_Left/frame2.png", "./data/Zombie_5_Walk_Left/frame3.png", "./data/Zombie_5_Walk_Left/frame4.png", "./data/Zombie_5_Walk_Left/frame5.png");
	explosion = loadAnimation("./data/Explosion/frame00.png", "./data/Explosion/frame01.png", "./data/Explosion/frame02.png", "./data/Explosion/frame03.png", "./data/Explosion/frame04.png", "./data/Explosion/frame05.png", "./data/Explosion/frame06.png", "./data/Explosion/frame07.png", "./data/Explosion/frame08.png", "./data/Explosion/frame09.png", "./data/Explosion/frame10.png", "./data/Explosion/frame11.png", "./data/Explosion/frame12.png", "./data/Explosion/frame13.png", "./data/Explosion/frame14.png", "./data/Explosion/frame15.png");
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	width = windowWidth;
	height = windowHeight;
	smooth();
	gamePlay = new Game();
}

function draw() {
	function grass() {
  var x = margin;
  stroke("#000");
  var scale = height/3;
  var xscale = scale/3;
  while (x < width-margin) {
    strokeWeight(random(width/12000,width/3000));
    //Use perlin noise!
    var x2 = x + random(-noise(x)*xscale, noise(x)*xscale);
    var y2 = height/2 - noise(x)*scale;

    line(x,height,x2,y2);
    if(Math.random() > 0.9) {
      fill(255,255,255,random(220,250));
      ellipse(x2,y2 + random(-height/10,height/5),random(width/80,width/20));
    }
    //move...
    x += random(width/800,width/600);
  }
}
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
	else if( keyCode == SHIFT ) {
		slowMod = true;
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
	else if( keyCode == SHIFT ) {
		slowMod = false;
	}
}

this.Player = function(monsterType, size, damageRate, score, R, G, B, takeDamage, border, borderColor, maxHealth, health, speed, regularSpeed) {
	this.monsterType = monsterType;
	this.size = size;
	this.damageRate = damageRate;
	this.score = score;
	this.R = R;
	this.G = G;
	this.B = B;
	this.takeDamage = takeDamage;
	this.border = border;
	this.borderColor = borderColor;
	this.maxHealth = maxHealth;
	this.health = health;
	this.speed = speed;
	this.regularSpeed = regularSpeed;
	this.x = width/2;
	this.y = height/2;
}

Player.prototype.play = function() {
	switch(arguments.length) {
		case 0: gamer.play();
				break;
		case 2: gamer.play(arguments[0], arguments[1]);
				break;
	}
}
Player.prototype.fire = function() {
	gamer.fire();
}
Player.prototype.damage = function(damage) {
	this.health -= damage;
}
Player.prototype.isPlaying = function() {
	return this.health > 0;
}
Player.prototype.healthBar = function() {
	fill(0, 255, 0);
	rect(this.x - (this.maxHealth/4), this.y - this.size, (this.health/2), 2);
	fill(255, 0, 0);
	rect(this.x - (this.maxHealth/4) + (this.health/2), this.y - this.size, (this.maxHealth/2) - (this.health/2), 2);
	noFill();
}
Player.prototype.drawBody = function() {
	stroke(0);
	strokeWeight(this.border);
	fill(this.R, this.G, this.B);
	smooth();
	ellipseMode(CENTER);
	ellipse(this.x, this.y, this.size, this.size);
	noStroke();
}
Player.prototype.getBullets = function() {
	return gamer.getBullets();
}
Player.prototype.setX = function(x) {
	this.x = x;
}
Player.prototype.setY = function(y) {
	this.y = y;
}
Player.prototype.setSpeed = function(speed) {
	this.speed = speed;
}
Player.prototype.setHealth = function(health) {
	this.health = health;
}
Player.prototype.putColor = function(R, G, B) {
	this.R = R;
	this.G = G;
	this.B = B;
}

var bullets = [], lastTime = 0, shot = false;

this.Gamer = function() {
	Player.call(this, null, 50, 100, null, 0, 0, 0, null, 0, null, 100, 100, 2, 2);
	this.weaponX = 0;
	this.weaponY = 0;
	this.weaponMag = 35;
	this.degree = 0;
	this.shot = false;
	this.x = width/2;
	this.y = height/2;
}

Gamer.prototype = Object.create(Player.prototype);
Gamer.prototype.constructor = Gamer;

Gamer.prototype.play = function() {
	Player.prototype.drawBody.call(this);
	this.drawWeapon();
	Player.prototype.healthBar.call(this);
	this.useWeapon();
	this.roam();
	if( mouseIsPressed ) {
		this.fire();
	}
}

Gamer.prototype.drawWeapon = function() {
	var dX = mouseX - this.x, dY = mouseY - this.y;
	this.degree = atan2(dY, dX);
	this.weaponX = round(this.x + (this.weaponMag * cos(this.degree)));
	this.weaponY = round(this.y + (this.weaponMag * sin(this.degree)));
	stroke(0, 0, 0);
	strokeWeight(5);
	strokeCap(ROUND);
	line(this.x, this.y, this.weaponX, this.weaponY);
	noFill();
	noStroke();
}

Gamer.prototype.useWeapon = function() {
	for (var i = 0; i < bullets.length; i++) {
		if( bullets[i].isValid() ) {
			bullets[i].move();
		}
		else {
			bullets.splice(i, 1);
		}
	}
	if( !mouseIsPressed ) {
		this.lastTime = 0;
	}
}

Gamer.prototype.setX = function(x) {
	this.x = x;
}

Gamer.prototype.setY = function(y) {
	this.y = y;
}

Gamer.prototype.fire = function() {
	var bullet = new Bullet(this.weaponX, this.weaponY, this.degree, 0, 5, 5, color(0, 0, 0));
	if( millis() - this.lastTime > bullet.getDelay() ) {
		bullets.push(bullet);
		this.lastTime = millis();
	}
}

Gamer.prototype.getBullets = function() {
	return bullets;
}

Gamer.prototype.roam = function() {
	if( up ) {
		this.y -= this.speed;
	}
	if( down ) {
		this.y += this.speed;
	}
	if( left ) {
		this.x -= this.speed;
	}
	if( right ) {
		this.x += this.speed;
	}
}

this.Monster = function(type) {
	this.start = [ [round(random(0, width)), 0], [round(random(0, width)), height], [0, round(random(0, height))], [width, round(random(0, height))] ];
	if( type == -1 ) {
		Player.call(this, -1, 50, 100, null, 0, 0, 0, null, 0, null, 100, 100, 2, 2);
		var index = round(random(0, 3));
		this.x = this.start[index][0];
		this.y = this.start[index][1];
	}
	else if( type == 0 ) {
		Player.call(this, 0, 30, 10, 5, 255, 0, 0, 10, 5, 0, null, 100, 1, 1);
		var index = round(random(0, 3));
		this.x = this.start[index][0];
		this.y = this.start[index][1];
	}
	else if( type == 1 ) {
		Player.call(this, 1, 50, 30, 10, 132, 34, 168, 5, 7, 0, null, 100, 1, 1);
		var index = round(random(0, 3));
		this.x = this.start[index][0];
		this.y = this.start[index][1];
	}
	else if( type == 2 ) {
		Player.call(this, 2, 50, 40, 15, 245, 237, 2, 3, 10, 0, null, 100, 1.2, 1);
		var index = round(random(0, 3));
		this.x = this.start[index][0];
		this.y = this.start[index][1];
	}
	else if( type == 3 ) {
		Player.call(this, 3, 50, 30, 20, 50, 170, 50, 10, 2, 0, null, 100, 2.2, 2);
		var index = round(random(0, 3));
		this.x = this.start[index][0];
		this.y = this.start[index][1];
	}
	else if( type == 4 ) {
		Player.call(this, 4, 100, 100, 25, 0, 0, 0, 1, 2, 40, null, 100, 0.2, 0.5);
		var index = round(random(0, 3));
		this.x = this.start[index][0];
		this.y = this.start[index][1];
	}
	this.walkDegree = 0;
}

Monster.prototype = Object.create(Player.prototype);
Monster.prototype.constructor = Monster;

Monster.prototype.play = function(gamerX, gamerY) {
	Player.prototype.healthBar.call(this);
	this.drawMonster(gamerX);
	this.walk(gamerX, gamerY);
}

Monster.prototype.walk = function(gamerX, gamerY) {
	var dX = gamerX - this.x, dY = gamerY - this.y;
	this.walkDegree = atan2(dY, dX);
	this.x += this.speed * cos(this.walkDegree);
	this.y += this.speed * sin(this.walkDegree);
}

Monster.prototype.drawMonster = function(gamerX) {
	if( this.monsterType == 0 ) {
		if( gamerX <= this.x ) {
			animation(zombie1_walk_left, this.x, this.y);
		}
		else if( gamerX > this.x ) {
			animation(zombie1_walk_right, this.x, this.y);
		}
	}
	else if( this.monsterType == 1 ) {
		if( gamerX <= this.x ) {
			animation(zombie2_walk_left, this.x, this.y);
		}
		else if( gamerX > this.x ) {
			animation(zombie2_walk_right, this.x, this.y);
		}
	}
	else if( this.monsterType == 2 ) {
		if( gamerX <= this.x ) {
			animation(zombie3_walk_left, this.x, this.y);
		}
		else if( gamerX > this.x ) {
			animation(zombie3_walk_right, this.x, this.y);
		}
	}
	else if( this.monsterType == 3 ) {
		if( gamerX <= this.x ) {
			animation(zombie4_walk_left, this.x, this.y);
		}
		else if( gamerX > this.x ) {
			animation(zombie4_walk_right, this.x, this.y);
		}
	}
	else if( this.monsterType == 4 ) {
		if( gamerX <= this.x ) {
			animation(zombie5_walk_left, this.x, this.y);
		}
		else if( gamerX > this.x ) {
			animation(zombie5_walk_right, this.x, this.y);
		}
	}
}

Monster.prototype.setX = function(x) {
	this.x = x;
}

Monster.prototype.setY = function(y) {
	this.y = y;
}

this.Bullet = function(weaponX, weaponY, degree, increase, damageSize, size, clear) {
	this.weapon = new Gun(weaponX, weaponY, degree);
	this.increase = increase;
	this.damageSize = damageSize;
	this.size = size;
	this.clear = clear;
}

Bullet.prototype.inScreen = function(x, y) {
	return x > 0 && x < width && y > 0 && y < height;
}

Bullet.prototype.isValid = function() {
	return this.weapon.isValid();
}

Bullet.prototype.move = function() {
	this.weapon.move();
}

Bullet.prototype.getDelay = function() {
	return this.weapon.getDelay();
}

Bullet.prototype.getSize = function() {
	return this.weapon.size;
}

Bullet.prototype.getX = function() {
	return this.weapon.getX();
}

Bullet.prototype.getY = function() {
	return this.weapon.getY();
}

Bullet.prototype.getDamage = function() {
	return this.weapon.getDamage();
}


this.Gun = function(weaponX, weaponY, degree) {
	this.delay = 500;
	this.damage = 15;
	this.bulletX = weaponX;
	this.bulletY = weaponY;
	this.speed = 1;
	this.degree = degree;
	this.increase = 0;
	this.damageSize = 5;
	this.size = 5;
	this.clear = color(0, 0, 0);
}

Gun.prototype = Object.create(Bullet.prototype);
Gun.prototype.constructor = Gun;

Gun.prototype.move = function() {
	this.increase += this.speed;
	this.bulletX = round(this.bulletX + (this.increase * cos(this.degree)));
	this.bulletY = round(this.bulletY + (this.increase * sin(this.degree)));
	this.drawBullet();
}

Gun.prototype.drawBullet = function() {
	fill(this.clear);
	ellipse(this.bulletX, this.bulletY, this.size, this.size);
	noFill();
}

Gun.prototype.isValid = function() {
	return Bullet.prototype.inScreen.call(this, this.bulletX, this.bulletY);
}

Gun.prototype.getDamage = function() {
	return this.damage;
}

Gun.prototype.getDelay = function() {
	return this.delay;
}

Gun.prototype.getX = function() {
	return this.bulletX;
}

Gun.prototype.getY = function() {
	return this.bulletY;
}

var level = 1, mode = 0, score = 0, monstersKilled = 0, totalMonstersKilled = 0, nextMonsterDelay = [1000, 2000], createMonster = true, slowMod = false, slowModActive = false, slowModMana = 100, maxSlowModMana = 100, slowModIncreaseSpeed = 0.1, slowModDecreaseSpeed = 0.2, slowModMonsterSpeed = 0.3, slowModPlayerSpeed = 0.8, lastAddTime = 0;
var gamer, monsters = [];

this.Game = function() {
	gamer = new Gamer();
}

Game.prototype.play = function() {
	background(255, 255, 255);
	if( mode == 0 ) {
		this.startScreen();
	}
	else if( mode == 1 ) {
		this.printScoreBoard();
		gamer.play();
		this.playMonster();
		this.createMonster();
		this.slowMod();
		this.collisionDetect();
		this.gamePlay();
	}
	else if( mode == 2 ) {
		this.levelCompleted();
	}
	else if( mode == 3 ) {
		this.death();
	}
}

Game.prototype.startScreen = function() {
	background(255, 255, 255);
	textAlign(CENTER);
	textSize(50);
	fill(0);
	text("Let's Play!!!", width/2, height/2);
	textSize(25);
	text("Instructions", width/2, height/2 + 100);
	textSize(15);
	text("1. Press arrow keys to move around.", width/2, height/2 + 125);
	text("2. Use mouse to shoot and aim.", width/2, height/2 + 150);
	text("3. Press shift key to slow down time.", width/2, height/2 + 175);
	noFill();
	if( mouseIsPressed ) {
		mode = 1;
	}
}

Game.prototype.printScoreBoard = function() {
	textAlign(RIGHT);
	fill(0);
	text("Kills : " + monstersKilled, width - 20, 20);
	text("Score : " + score, width - 20, 40);
}

Game.prototype.levelCompleted = function() {
	background(255, 255, 255);
	createMonster = false;
	this.leaveMonster();
	this.leaveBullets();
	textAlign(CENTER);
	textSize(25);
	fill(0);
	text("Level " + level + " completed!! Press 'n' for next level!", width/2, height/2);
	noFill();
	if( keyIsPressed && (keyCode == 'n' || keyCode == 'N' ) ) {
		totalMonstersKilled += monstersKilled;
		level += 1;
		mode = 1;
		gamer.setHealth(100);
		gamer.setX(width/2);
		gamer.setY(height/2);
	}
}

Game.prototype.gamePlay = function() {
	createMonster = true;
	nextMonsterDelay[0] = 1000/level;
	nextMonsterDelay[1] = nextMonsterDelay[0]*2;
	if( monstersKilled >= level*100 ) {
		mode = 2;
	}
}

Game.prototype.death = function() {
	background(255, 255, 255);
	textAlign(CENTER);
	textSize(25);
	fill(0);
	text("You are dead. Your score is " + score + ". Press 'r' to restart! Press 'q' to go to main screen!", width/2, height/2);
	noFill();
	createMonster = false;
	this.leaveMonster();
	this.leaveBullets();
	if( keyIsPressed && (key == 'r' || key == 'R' ) ) {
		this.restart();
		mode = 1;
	}
	if( keyIsPressed && (key == 'q' || key == 'Q' ) ) {
		this.startScreen();
		mode = 0;
	}
}

Game.prototype.restart = function() {
	gamer.setHealth(100);
	gamer.setX(width/2);
	gamer.setY(height/2);
	gamer.maxHealth = 100;
	score = 0;
	level = 1;
	monstersKilled = 0;
	totalMonstersKilled = 0;
	slowMod = false;
	slowModActive = false;
	maxSlowModMana = 100;
	slowModMana = 100;
}

Game.prototype.slowMod = function() {
	if( slowMod ) {
		if( slowModMana > 0 ) {
			slowModMana -= slowModDecreaseSpeed;
			this.slowDownStart();
		}
		else {
			slowMod = false;
		}
	}
	else {
		if( slowModMana < maxSlowModMana ) {
			slowModMana += slowModIncreaseSpeed;
			if( slowModActive ) {
				this.slowDownEnd();
			}
		}
	}
	this.drawSlowModBar();
}

Game.prototype.slowDownStart = function() {
	gamer.setSpeed(slowModPlayerSpeed);
	for (var i = 0; i < monsters.length; i++) {
		monsters[i].setSpeed(slowModMonsterSpeed);
	}
	slowModActive = true;
}

Game.prototype.slowDownEnd = function() {
	gamer.setSpeed(2);
	for (var i = 0; i < monsters.length; i++) {
		monsters[i].setSpeed(monsters[i].regularSpeed);
	}
	slowModActive = false;
}

Game.prototype.drawSlowModBar = function() {
	fill(25, 137, 179);
	rect(gamer.x - (maxSlowModMana/4), gamer.y - gamer.size + 2, slowModMana/2, 2);
	noFill();
}

Game.prototype.createMonster = function() {
	if( millis() - lastAddTime > round(random(nextMonsterDelay[0], nextMonsterDelay[1])) && createMonster ) {
		for (var i = 0; i < round(random(2)); i++) {
			monsters.push(new Monster(round(random(0, 5))));
		}
		lastAddTime = millis();
	}
}

Game.prototype.leaveMonster = function() {
	for (var i = 0; i < monsters.length; i++) {
		monsters.splice(i, 1);
	}
}

Game.prototype.leaveBullets = function() {
	for (var i = 0; i < gamer.getBullets().length; i++) {
		gamer.getBullets().splice(i, 1)
	}
}

Game.prototype.playMonster = function() {
	for (var i = 0; i < monsters.length; i++) {
		monsters[i].play(gamer.x, gamer.y, monsters[i].monsterType);
	}
}

Game.prototype.collisionDetect = function() {
	for (var i = 0; i < monsters.length; i++) {
		var monsterX = monsters[i].x, monsterY = monsters[i].y;
		if( dist(monsterX, monsterY, gamer.x, gamer.y) <= monsters[i].size/2 + gamer.size/2 ) {
			gamer.damage(monsters[i].damageRate);
			monsters[i].damage(gamer.damageRate);
			this.aliveCheck(monsters[i], i);
		}
		for (var x = 0; x < bullets.length; x++) {
			var bulletX = bullets[x].getX(), bulletY = bullets[x].getY();
			if( monsters[i] !== undefined && bullets[x] !== undefined ) {
				if( dist(monsterX, monsterY, bulletX, bulletY) <= monsters[i].size/2 + bullets[x].damageSize/2 ) {
					this.checkEffectZone(bulletX, bulletY, bullets[x].damageSize, bullets[x].getDamage(), i);
					bullets.splice(x, 1);
				}
			}
		}
		for (var j = 0; j < monsters.length; j++) {
			if( i != j ) {
				var newMonsterX = monsters[j].x, newMonsterY = monsters[j].y;
				if( monsters[i] !== undefined && monsters[j] !== undefined  ) {
					if( dist(monsterX, monsterY, newMonsterX, newMonsterY) <= monsters[i].size/2 + monsters[j].size/2 ) {
						this.monstersCollision(monsters[i], monsters[j]);
					}
				}
			}
		}
	}
}

Game.prototype.checkEffectZone = function(bulletX, bulletY, damageSize, damage, monsterIndex) {
	var bulletSize = damageSize/2;
	for (var i = 0; i < monsters.length; i++) {
		var monsterX = monsters[i].x, monsterY = monsters[i].y;
		if( dist(monsterX, monsterY, bulletX, bulletY) <= monsters[i].size + bulletSize ) {
			monsters[i].damage(damage * monsters[i].takeDamage);
			this.aliveCheck(monsters[i], i);
		}
	}
}

Game.prototype.monstersCollision = function(monster1, monster2) {
	var dX = monster1.x - monster2.x, dY = monster1.y - monster2.y, degree = atan2(dY, dX);
	monster1.setX(monster1.x + cos(degree));
	monster1.setY(monster1.y + sin(degree));
	monster2.setX(monster2.x - cos(degree));
	monster2.setY(monster2.y - sin(degree));
}

Game.prototype.aliveCheck = function(monster, index) {
	if( monster != null && !monster.isPlaying() ) {
		score += monster.score;
		monstersKilled += 1;
		monsters.splice(index, 1);
		animation(explosion, monster.x, monster.y);
		animation(explosion, monster.x, monster.y);
		animation(explosion, monster.x, monster.y);
	}
	if( !gamer.isPlaying() ) {
		mode = 3;
	}
}