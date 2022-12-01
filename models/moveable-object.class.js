class MovableObject extends DrawableObject {
  speed = 0.25;
  otherDirection = false;
  speedY = 0;
  acceleration = 1;
  energy = 100;
  chickenEnergy = 100;
  bottle = 0;
  coins = 0;
  lastHit = 0;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ThrowAbleObject) {
      return true;
    } else {
      return this.y < 80;
    }
  }

  // is character.isColliding(chicken)
  isColliding(mo) {
    return (
      this.x + this.width > mo.x &&
      this.y + this.height > mo.y &&
      this.x < mo.x &&
      this.y < mo.y + mo.height
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
    // else {
    //   this.lastHit = new Date().getTime();
    // }
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
    this.chickenEnergy -= 100;
    if (this.chickenEnergy < 0) {
      this.chickenEnergy = 0;
    }
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit; // Differenz in ms
    timepassed = timepassed / 1000; //diefference in s
    return timepassed < 0.35;
  }

  isDead() {
    return this.energy == 0;
  }

  moveRight() {
    this.x += this.speed;
    this.otherDirection = false;
  }

  moveLeft() {
    this.x -= this.speed;
    this.otherDirection = true;
  }

  //If Chicken alive
  chickenWalk() {
    this.x -= this.speed;
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  jump() {
    this.speedY = 18;
  }

  stayGround() {
    this.world.keyboard.UP = false;
  }
}
