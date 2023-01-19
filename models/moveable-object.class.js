class MovableObject extends DrawableObject {
  speed = 0.25;
  otherDirection = false;
  speedY = 0;
  acceleration = 1;
  energy = 100;
  bottle = 0;
  coins = 0;
  lastHit = 0;
  lastChickenHit = 0;
  lastBossHit = 0;
  sleep = false;
  chickenEnergy = 50;
  smallChickenEnergy = 50;
  splash = false;
  pepeLastMove = 0;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 30);
  }

  isAboveGround() {
    if (this instanceof ThrowAbleObject) {
      return true;
    } else {
      return this.y < 80;
    }
  }

  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  isCollidingChickenTop(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  //Coins collect
  collectCoins() {
    if (this.coins < 100) {
      this.coins += 20;
    }
  }

  // bottle collect
  collectBottle() {
    if (this.bottle < 100) {
      this.bottle += 20;
    }
  }

  hit() {
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  chickenHit() {
    this.smallChickenEnergy -= 50;
    this.chickenEnergy -= 50;
    if (this.chickenEnergy <= 0) {
      this.chickenEnergy = 0;
    }
  }

  endbossHit() {
    if (!this.canHit) return;
    if (this.endBossEnergy <= 0) {
      this.endBossEnergy = 0;
    } else {
      this.endBossEnergy -= 50;
    }
    this.canHit = false;
    setTimeout(() => {
      this.canHit = true;
    }, 1500);
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit; // Differenz in ms
    timepassed = timepassed / 1500; //diefference in s
    return timepassed < 0.95;
  }

  isDead() {
    return this.energy == 0;
  }

  bossisDead() {
    return this.endBossEnergy == 0;
  }

  moveRight() {
    this.x += this.speed;
    this.otherDirection = false;
    this.sleep = false;
  }

  moveLeft() {
    this.x -= this.speed;
    this.otherDirection = true;
    this.sleep = false;
  }

  fallInSleep() {
    let timepassed = new Date().getTime() - this.pepeLastMove;
    timepassed = timepassed / 1000;
    return timepassed > 3.0;
  }

  //If Chicken alive
  chickenWalk() {
    this.x -= this.speed;
  }

  bossWalk() {
    this.x -= 1.2;
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  jump() {
    this.speedY = 18;
    // this.speed = 0.5;
  }

  jumpAfterKill() {
    this.speedY = 7;
  }

  stayGround() {
    this.world.keyboard.UP = false;
  }
  getMoveTimeStamp() {
    this.pepeLastMove = new Date().getTime();
  }
}
