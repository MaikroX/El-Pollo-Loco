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

  /**
   * apply that character & objects can fallen back to ground
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 30);
  }

  /**
   * check if the character is on ground or on air
   * @returns boolean
   */
  isAboveGround() {
    if (this instanceof ThrowAbleObject) {
      return true;
    } else {
      return this.y < 80;
    }
  }

  /**
   * check if the moveable objects are colliding each other
   * @param {object} mo moveable object
   * @returns parameter from with, height & offsets
   */
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  /**
   * calculate if the chicken was hit from the top
   * @param {object} mo moveableobject
   * @returns parameter from with, height & offsets
   */
  isCollidingChickenTop(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  /**
   * when coin is collectable, add 20 to this.coin
   */
  collectCoins() {
    if (this.coins < 100) {
      this.coins += 20;
    }
  }

  /**
   * when bottle is collectable, add 20 to this.bottle
   */
  collectBottle() {
    if (this.bottle < 100) {
      this.bottle += 20;
    }
  }

  /**
   * when hit by enemy subtract 5 from this.energy
   * is the energy 0 then this.energy = 0
   */
  hit() {
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * when the enemies are hitet, subtract 50
   */
  chickenHit() {
    this.smallChickenEnergy -= 50;
    this.chickenEnergy -= 50;
    if (this.chickenEnergy <= 0) {
      this.chickenEnergy = 0;
    }
  }

  /**
   * checks if the endboss can hit
   * @returns number of this.endBoss.Energy
   */
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

  /**
   * checks if Pepe can hurt again in a period of time
   * @returns the time passed after last hurt
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit; // Differenz in ms
    timepassed = timepassed / 1500; //diefference in s
    return timepassed < 0.95;
  }

  /**
   * pepe is dead
   * @returns this.energy
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * endBoss is dead
   * @returns this.endBoss.Energy
   */
  bossisDead() {
    return this.endBossEnergy == 0;
  }

  /**
   * moving right an check if pepe is in otherDirection
   */
  moveRight() {
    this.x += this.speed;
    this.otherDirection = false;
    this.sleep = false;
  }

  /**
   * moving left an check if pepe is in otherDirection
   */
  moveLeft() {
    this.x -= this.speed;
    this.otherDirection = true;
    this.sleep = false;
  }

  /**
   * set the time when pepe falls to sleep
   * @returns time left when Pepe falls to sleep
   */
  fallInSleep() {
    let timepassed = new Date().getTime() - this.pepeLastMove;
    timepassed = timepassed / 1000;
    return timepassed > 3.0;
  }

  /**
   * sets the chicken walk/speed
   */
  chickenWalk() {
    this.x -= this.speed;
  }

  /**
   * sets the endboss walk/speed
   */
  bossWalk() {
    this.x -= 1.2;
  }

  /**
   * set the height of the jump
   */
  jump() {
    this.speedY = 18;
    // this.speed = 0.5;
  }

  /**
   * the the height of the jump after kill
   */
  jumpAfterKill() {
    this.speedY = 7;
  }

  /**
   * when pepe is not on the ground he can´t jump again
   */
  stayGround() {
    this.world.keyboard.UP = false;
  }

  /**
   * check pepes last moving an get the timestamp
   */
  getMoveTimeStamp() {
    this.pepeLastMove = new Date().getTime();
  }

  /**
   * loop throw the images so it can add to the animations
   * @param {number} images in array
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }
}
