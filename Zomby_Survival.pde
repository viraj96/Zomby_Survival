//main

Animation[] animation;
Game gamePlay;
void settings() {
  fullScreen(P3D); 
  //size(800,600);
}
void setup() {
  frameRate(60);
  gamePlay = new Game();
 // animation[0] = new Animation("Zombie 1 Walk/frame",6);
  //animation[1] = new Animation("Zombie 2 Walk/frame",6);
  //animation[2] = new Animation("Zombie 3 Walk/frame",6);
  //animation[3] = new Animation("Zombie 4 Walk/frame",6);
  //animation[4] = new Animation("Zombie 5 Walk/frame",6);
}
void draw() {
  gamePlay.play();
}
void keyPressed() {
  if(key == 'w' || key == 'W') {
    up = true;
  }
  if(key == 's' || key == 'S') {
    down = true;
  }
  if(key == 'a' || key == 'A') {
    left = true;
  }
  if(key == 'd' || key == 'D') {
    right = true;
  }
  if(key == ' ') {
    slowMod = true;
  }
}
void keyReleased() {
  if(key == 'w' || key == 'W') {
    up = false;
  }
  if(key == 's' || key == 'S') {
    down = false;
  }
  if(key == 'a' || key == 'A') {
    left = false;
  }
  if(key == 'd' || key == 'D') {
    right = false;
  }
  if(key == ' ') {
    slowMod = false;
  }
}


//creature

boolean up = false, down = false, left = false, right = false;

class Player {
  int monType, size, damRate, score,r, g, b, takeDam, border, borderColor, maxHealth = 100, health = 100;
  float x = width/2, y = height/2, speed, regSpeed;
  void play() {
    gamer.play();
  }
  void play(float gamerX, float gamerY) {
    gamer.play(gamerX, gamerY);
  }
  void fire() {
    gamer.fire();
  }
  void damage(int damage) {
    health -= damage;
  }
  boolean isPlaying() {
    return health > 0;
  }
  public ArrayList <bullet> getBullets() {
    return gamer.getBullets();
  }
  void HealthBar() {
    fill(0,255,0);
    rect( x-(maxHealth/4), y-size, (health/2), 2 );
    fill(255,0,0);
    rect( x-(maxHealth/4)+(health/2), y-size, (maxHealth/2)-(health/2), 2 );
    noFill();
  }
  void drawBody() {
    stroke(0);
    strokeWeight(border);
    fill(r,g,b);
    smooth();
    ellipseMode(CENTER);
    ellipse(x,y,size,size);
    noStroke();
  }
  public void setX(int x) {
    this.x = x;
  }
  public void setY(int y) {
    this.y = y;
  }
  public void speed(float speed) {
    this.speed = speed;
  }
  public void health(int health) {
    this.health = health;
  }
  public void putColor(int r, int g, int b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }
}



//bullet


class bullet {
  bullet weapon;
  float inc, damSize;
  int size, clear;
  bullet() {
  }
  bullet(int weaponX, int weaponY, float degree) {
    this.weapon = new gun(weaponX, weaponY, degree);
  }
  boolean inScreen(int x, int y) {
    return x > 0 && x < width && y > 0 && y < height;
  }
  public boolean isValid() {
    return weapon.isValid();
  }
  public void move() {
    weapon.move();
  }
  public int getDelay() {
    return weapon.getDelay();
  }
  public int getSize() {
    return weapon.size;
  }
  public int getX() {
    return weapon.getX(); 
  }
  public int getY() {
    return weapon.getY(); 
  }
  public int getDam() {
    return weapon.getDam();
  }
}






//handgun


class gun extends bullet {
  int delay, damage, bulletX, bulletY, weaponX, weaponY;
  float speed, degree;
  gun(int weaponX, int weaponY, float degree) {
    this.weaponX = weaponX;
    this.weaponY = weaponY;
    this.degree = degree;
    bulletX = weaponX;
    bulletY = weaponY;
    delay = 500;
    damage = 15;
    size = 5;
    damSize = 5;
    speed =  1;
    clear = color(0,0,0);
  }
  public void move() {
    inc += speed;
    bulletX = round(bulletX + (inc * cos(degree)));
    bulletY = round(bulletY + (inc * sin(degree)));
    drawBullet();
  }
  void drawBullet() {
    fill(clear);
    ellipse(bulletX, bulletY, size, size);
    noFill();
  }
  public boolean isValid() {
    return inScreen(bulletX, bulletY);
  }
  public int getDam() {
    return damage;
  }
  public int getDelay() {
    return delay;
  }
  public int getX() {
    return bulletX;
  }
  public int getY() {
    return bulletY;
  }
}


//shooter

final ArrayList <bullet> bullets = new ArrayList <bullet>();
long lastTime = 0;
final boolean shot = false;

class Gamer extends Player {
  private int maxHealth = 100, health = 100, weaponX, weaponY, weaponMag = 35;
  private float degree;
  private boolean shot = false;
  Gamer() {
    size = 50;
    damRate = 100;
    speed = 2;
    regSpeed = 2;
    border = 0;
    r = g = b = 0;
  }
  public void play() {
    drawBody();
    drawWeapon();
    HealthBar();
    useWeapon();
    roam();
    if(mousePressed) {
      fire();
    }
  }
  void drawWeapon() {
    float X = mouseX - x, Y = mouseY - y;
    degree = atan2(Y,X);
    weaponX = round(x + (weaponMag * cos(degree)));
    weaponY = round(y + (weaponMag * sin(degree)));
    stroke(0,0,0);
    strokeWeight(5);
    strokeCap(ROUND);
    line(x, y, weaponX, weaponY);
    noFill();
    noStroke();
  }
  void useWeapon() {
    for(int i = 0; i < bullets.size(); i++) {
      if(bullets.get(i).isValid()) {
        bullets.get(i).move();
      }
      else {
        bullets.remove(i);
      }
    }
    if(!mousePressed) {
      lastTime = 0;
    }
  }
  public void setX(float x) {
    this.x = x;
  }
  public void setY(float y) {
    this.y = y;
  }
  void fire() {
    bullet bulet = new bullet(weaponX, weaponY, degree);
    if((millis() - lastTime) > bulet.getDelay()) {
      bullets.add(bulet);
      lastTime = millis();
    }
  }
  public ArrayList <bullet> getBullets() {
    return bullets;
  }
  void roam() {
    if(up) {
      y -= speed;
    }
    if(down) {
      y += speed;
    }
    if(left) {
      x -= speed;
    }
    if(right) {
      x += speed;
    }
  }
}


int count = 1;
//monster


class Monster extends Player {
  private int leftArmA_X;
  private int leftArmA_Y;
  private int leftArmB_X;
  private int leftArmB_Y;
  private int rightArmA_X;
  private int rightArmA_Y;
  private int rightArmB_X;
  private int rightArmB_Y;
  int[][] start = {{round(random(0,width)), 0} , {round(random(0,width)), height}, {0, round(random(0,height))} , {width, round(random(0,height))}};
  float walkDegree;
  Monster(int type) {
    if(type == -1) {
      size = 0;
      speed = 0;
      x = -100;
      y = -100;
      monType = -1;
    }
    else if(type == 0) {
      size = 30;
      r = 255;
      g = b = 0;
      border = 5;
      borderColor = 0;
      takeDam = 10;
      damRate = 10;
      score = 5;
      health = 100;
      speed = 1;
      regSpeed = 1;
      monType = 0;
      int index = round(random(0,3));
      x = start[index][0];
      y = start[index][1];
    }
    else if(type == 1) {
      size = 50;
      r = 132;
      g = 34; 
      b = 168;
      border = 7;
      borderColor = 0;
      takeDam = 5;
      damRate = 30;
      score = 10;
      health = 100;
      speed = 1;
      regSpeed = 1;
      monType = 1;
      int index = round(random(0,3));
      x = start[index][0];
      y = start[index][1];
    }
    else if(type == 2) {
      size = 50;
      r = 245;
      g = 237;
      b = 2;
      border = 10;
      borderColor = 0;
      takeDam = 3;
      damRate = 40;
      score = 15;
      health = 100;
      speed = 1.2;
      regSpeed = 1;
      monType = 2;
      int index = round(random(0,3));
      x = start[index][0];
      y = start[index][1];
    }
    else if(type == 3) {
      size = 50;
      r = 50;
      g = 170; 
      b = 50;
      border = 2;
      borderColor = 0;
      takeDam = 10;
      damRate = 30;
      score = 20;
      health = 100;
      speed = 2.2;
      regSpeed = 2;
      monType = 3;
      int index = round(random(0,3));
      x = start[index][0];
      y = start[index][1];
    }
    else if(type == 4) {
      size = 100;
      r = g = b = 0;
      border = 2;
      borderColor = 40;
      takeDam = 1;
      damRate = 100;
      score = 25;
      health = 100;
      speed = 0.2;
      regSpeed = 0.5;
      monType = 4;
      int index = round(random(0,3));
      x = start[index][0];
      y = start[index][1];
    }
  }
  void play(float gamerX, float gamerY, int type) {
    HealthBar();
   // drawMon(type);
    drawMonster();
    walk(gamerX, gamerY);
  }
  void walk(float gamerX, float gamerY) {
    float dX = gamerX - x, dY = gamerY- y;
    walkDegree = atan2(dY,dX);
    x = x + (speed*cos(walkDegree));
    y = y + (speed*sin(walkDegree));
  }
  void drawMonster() {
    drawBody();
    drawArms();
  }
   void drawMon(int type) {
    count++;
    println(count);
    if(type == 0) {
      //PImage images;
      //String filename = "Zombie 1 Walk/frame" + 0 + ".png";
      //images = loadImage(filename);
      //image(images,x-images.width,y);
      animation[0].display(x-animation[0].getWidth()/2, y);
    }
    else if(type == 1) {
      //animation = new Animation("Zombie 2 Walk/frame",6);
      animation[1].display(x-animation[1].getWidth()/2, y);
    }
    else if(type == 2) {
      //animation = new Animation("Zombie 3 Walk/frame",6);
      animation[2].display(x-animation[2].getWidth()/2, y);
    }
    else if(type == 3) {
      //animation = new Animation("Zombie 4 Walk/frame",6);
      animation[3].display(x-animation[3].getWidth()/2, y);
    }
    else if(type == 4) {
    //  animation = new Animation("Zombie 5 Walk/frame",6);
      animation[4].display(x-animation[4].getWidth()/2, y);
    }
  }
  void drawArms() {
    float dgrA = 5.6;
    float dgrB = 5.8;
    int armSize = size/2;
    leftArmA_X = round(x + (armSize * cos(walkDegree-dgrA)));
    leftArmA_Y = round(y + (armSize * sin(walkDegree-dgrA)));
    leftArmB_X = round(x + (armSize*2 * cos(walkDegree-dgrB)));
    leftArmB_Y = round(y + (armSize*2 * sin(walkDegree-dgrB)));
    rightArmA_X = round(x + (armSize * cos(walkDegree+dgrA)));
    rightArmA_Y = round(y + (armSize * sin(walkDegree+dgrA)));
    rightArmB_X = round(x + (armSize*2 * cos(walkDegree+dgrB)));
    rightArmB_Y = round(y + (armSize*2 * sin(walkDegree+dgrB)));
    stroke(0, 0, 0);
    strokeWeight(5);
    strokeCap(ROUND);
    line(leftArmA_X, leftArmA_Y, leftArmB_X, leftArmB_Y);
    line(rightArmA_X, rightArmA_Y, rightArmB_X, rightArmB_Y);
    noFill();
    noStroke();
  }
  public void setX(float x) {
    this.x = x;
  }
  public void setY(float y) {
    this.y = y;
  }
}

//game

int level = 1, mode = 0, score = 0, monKilled = 0, totMonKilled = 0;
final float nextMonDelay[] = {
  1000, 2000
};
Player gamer;
boolean createMon = true;
boolean slowMod = false, slowModActive = false;
float slowModMana = 100, maxSlowModMana = 100, slowModIncSpeed = 0.1, slowModDecSpeed = 0.2, slowModMonSpeed = 0.3, slowModPlayerSpeed = 0.8;
int lastAddTime = 0;
ArrayList <Monster> monsters = new ArrayList <Monster>();

class Game {
  Game() {
    gamer = new Gamer();
  }
  void play() {
    background(255,255,255);
    if(mode == 0) {
      startScreen();
    }
    else if(mode == 1) {
      printScoreBoard();
      gamer.play();
      playMon();
      createMon();
      slowMod();
      collisionDetect();
      gamePlay();
    }
    else if(mode == 2) {
      levelCompleted();
    }
    else if(mode == 3) {
      death();
    }
  }
  void startScreen() {
    textAlign(CENTER);
    fill(0);
    text("Let's Play!!!", width/2,height/2);
    noFill();
    if(mousePressed) {
      mode = 1;
    }
  }
  void printScoreBoard() {
    textAlign(RIGHT);
    fill(0);
    text("Kills : " + (monKilled), width-20, 20);
    text("Score : " + score, width-20, 40);
  }
  void levelCompleted() {
    createMon = false;
    leaveMon();
    leaveBullets();
    textAlign(CENTER);
    fill(0);
    text("Level " + level + " completed. Press 'n' for next level", width/2, height/2);
    noFill();
    if(keyPressed && (key == 'n' || key == 'N')) {
      totMonKilled += monKilled;
      level += 1;
      mode = 1;
      gamer.health(100);
      gamer.setX(width/2);
      gamer.setY(height/2);
    }
  }
  void gamePlay() {
    createMon = true;
    nextMonDelay[0] = 1000/level;
    nextMonDelay[1] = nextMonDelay[0] * 2;
    if(monKilled >= level*100) {
      mode = 2;
    }
  }
  void death() {
    textAlign(CENTER);
    fill(0);
    text(" You are dead. Your Score is " + score, width/2, height/2);
    noFill();
    createMon = false;
    leaveMon();
    leaveBullets();
    if(keyPressed && (key == 'r' || key == 'R')) {
      restart();
      mode = 1;
    }
  }
  void restart() {
    gamer.health(100);
    gamer.setX(width/2);
    gamer.setY(height/2);
    gamer.maxHealth = 100;
    score = 0;
    level = 1;
    monKilled = 0;
    totMonKilled = 0;
    slowMod = false;
    slowModActive = false;
    maxSlowModMana = 100;
    slowModMana = 100;
  }
  void slowMod() {
    if(slowMod) {
      if(slowModMana > 0) {
        slowModMana -= slowModDecSpeed;
        slowDownStart();
      }
      else {
        slowMod = false;
      }
    }
    else {
      if(slowModMana < maxSlowModMana) {
        slowModMana += slowModIncSpeed;
        if(slowModActive) {
          slowDownEnd();
        }
      }
    }
    drawSlowModBar();
  }
  void slowDownStart() {
    gamer.speed(slowModPlayerSpeed);
    for(int i = 0; i < monsters.size(); i++) {
      monsters.get(i).speed(slowModMonSpeed);
    }
    slowModActive = true;  
  }
  void slowDownEnd() {
    gamer.speed(2);
    for(int i = 0; i < monsters.size(); i++) {
      Monster mon = monsters.get(i);
      mon.speed(mon.regSpeed);
    }
    slowModActive = false;
  }
  void drawSlowModBar() {
    fill(25,137,179);
    rect(gamer.x - (maxSlowModMana/4), gamer.y - gamer.size + 2, slowModMana/2, 2);
    noFill();
  }
  void createMon() {
    if((millis() - lastAddTime) > round(random(nextMonDelay[0], nextMonDelay[1])) && createMon) {
      for(int i = 0; i < round(random(2)); i++) {
        monsters.add(new Monster(round(random(0,5))));
      }
      lastAddTime = millis();
    }
    //animation.display(x-animation.getWidth()/2, y);
  }
  void leaveMon() {
    for(int i = 0; i < monsters.size(); i++) {
      monsters.remove(i);
    }
  }
  void leaveBullets() {
    for(int i = 0; i < gamer.getBullets().size(); i++) {
      gamer.getBullets().remove(i);
    }
  }
  void playMon() {
    for(int i = 0; i < monsters.size(); i++) {
      monsters.get(i).play(gamer.x, gamer.y, monsters.get(i).monType);
    }
  }
  void collisionDetect() {
    for(int i = 0; i < monsters.size(); i++) {
      Monster mon1 = monsters.get(i);
      float mon1X = mon1.x, mon1Y = mon1.y;
      if(dist(mon1X, mon1Y, gamer.x,gamer.y) <= mon1.size/2 + gamer.size/2) {
        gamer.damage(mon1.damRate);
        //println(gamer.damRate);
        mon1.damage(gamer.damRate);
        aliveCheck(mon1,i);
      }
      for(int x = 0; x < bullets.size(); x++) {
        bullet bulet = bullets.get(x);
        int bulletX = bulet.getX(), bulletY = bulet.getY();
        if(dist(mon1X, mon1Y, bulletX, bulletY) <= mon1.size/2 + bulet.damSize/2) {
          checkEffectZone(bulletX, bulletY, bulet.damSize, bulet.getDam(), i);
          bullets.remove(x);
        }
      }
      for (int j = 0; j < monsters.size(); j++) {
        Monster mon2 = monsters.get(j);
        float mon2X = mon2.x, mon2Y = mon2.y;
        if (dist(mon1X, mon1Y, mon2X, mon2Y) <= (mon1.size/2 + mon2.size/2)) {
          monColl(mon1, mon2);
        }
      }
    }
  }
  void checkEffectZone(int bulletX, int bulletY, float damSize, int damage, int monIndex) {
    float bulletSize = damSize / 2;
    for (int i = 0; i < monsters.size(); i++) {
      Monster mon = monsters.get(i);
      float monX = mon.x, monY = mon.y;
      if (dist(monX, monY, bulletX, bulletY) <= (mon.size + bulletSize)) {
        println("Hello");
        mon.damage(damage * mon.takeDam);
        aliveCheck(mon, i);
      }
    }
  }
}
void monColl(Monster mon1, Monster mon2) {
  float dX = mon1.x - mon2.x, dY = mon1.y - mon2.y, degree = atan2(dY, dX);
  mon1.setX(mon1.x + (1 * cos(degree)));
  mon1.setY(mon1.y + (1 * sin(degree)));
  mon2.setX(mon2.x - (1 * cos(degree)));
  mon2.setY(mon2.y - (1 * sin(degree)));
}
void aliveCheck(Monster mon, int i) {
  if (mon != null && !mon.isPlaying()) {
    score += mon.score;
    monKilled++;
    monsters.remove(i);
  }
  if (!gamer.isPlaying()) {
    mode = 3;
  }
}


//animation

class Animation {
  PImage[] images;
  int imageCount, frame;
  Animation(String imagePrefix, int count) {
    imageCount = count;
    images = new PImage[imageCount];
    for(int i = 0; i < imageCount; i++) {
      String filename = imagePrefix + nf(i,1) + ".png";
      images[i] = loadImage(filename);
    }
  }
  void display(float xpos, float ypos) {
    frame = (frame+1) % imageCount;
    image(images[frame], xpos, ypos);
  }
  int getWidth() {
    return images[0].width;
  }
}