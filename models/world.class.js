class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new Statusbar();
  coinBar = new Coinbar();
  bottleBar = new Bottlebar();
  throwableObject = [];
  collectedBottle = [];

  background_music = new Audio("audio/background-music.mp3");
  coin_collect_sound = new Audio("audio/coin-collect.mp3");
  bottle_collect_sound = new Audio("audio/collect-bottle.mp3");
  chicken_hit_sound = new Audio("audio/chicken-hit.mp3");

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  /**
   * run all important functions they check in intervals if somethings happens ingame
   */
  run() {
    setInterval(() => {
      this.checkFromWhereColiding();
      this.checkBottleHit();
      this.checkCollectionBottles();
      this.checkCollectionCoins();
      this.coinIsCollected();
      this.checkThrowObject();
      this.checkEndbossHit();
    }, 150);
    if (audioMute == false) {
    }
  }

  /**
   * check if the bottle on ground can collect, when the character does not have the max pieces of bottles
   */
  checkCollectionBottles() {
    this.level.bottle.forEach((bottle) => {
      if (this.character.isColliding(bottle)) {
        this.bottleIsCollected();
        this.character.collectBottle();
        this.collectedBottle = this.collectedBottle.splice(0, 4);
        this.collectedBottle.push(bottle);
        this.bottleBar.setPercentage(this.character.bottle);
      }
    });
    if (this.bottleBar.percentage == 100) {
    }
  }

  /**
   * check if the bottle on ground is collected, plays the bottleCollectSound and splice it from array and screen
   */
  bottleIsCollected() {
    if (this.collectedBottle.length < 5) {
      for (let i = 0; i < this.level.bottle.length; i++) {
        const bottle = this.level.bottle[i];
        if (this.character.isColliding(bottle)) {
          this.bottleCollectSound();
          this.level.bottle.splice(i, 1);
        }
      }
    }
  }

  /**
   * when bottle count is over 0 then able to throw a bottle
   */
  checkThrowObject() {
    if (
      (this.keyboard.ENTER && this.collectedBottle.length > 0) ||
      (this.keyboard.E && this.collectedBottle.length > 0)
    ) {
      let collectedBottle = new ThrowAbleObject(
        this.character.x + 100,
        this.character.y + 100
      );
      this.character.bottle -= 20;
      this.bottleBar.setPercentage(this.character.bottle);
      this.throwableObject = this.throwableObject.splice(0, 1);
      this.throwableObject.push(collectedBottle);
      this.collectedBottle.splice(0, 1);
    }
  }

  /**
   * check if the bottle hits an enemy
   */
  checkBottleHit() {
    this.level.enemies.forEach((enemy, i) => {
      this.throwableObject.forEach((bottle) => {
        if (enemy.isColliding(bottle)) {
          enemy.chickenHit();
          setTimeout(() => {
            // this.level.enemies.splice(i, 1);
          }, 500);
        }
      });
    });
  }

  /**
   * check if the bottle hits the endboss
   */
  checkEndbossHit() {
    this.throwableObject.forEach((bottle) => {
      if (this.level.enemies[7].isColliding(bottle)) {
        this.level.enemies[7].endbossHit();
      }
    });
  }

  /**
   * check if the enemy hits in front/back or from top
   */
  checkFromWhereColiding() {
    if (this.character.isAboveGround()) {
      this.hitChickenfromTop();
    } else {
      this.checkCollisions();
    }
  }

  /**
   * check collision with enemy whos still alive
   */
  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (enemy.chickenEnergy == 50) {
        if (this.character.isColliding(enemy)) {
          this.character.hit();
          this.statusBar.setPercentage(this.character.energy);
        }
      }
    });
  }

  /**
   * if hit the enemy from top, the character dont loose energy, so only the chicken does
   */
  hitChickenfromTop() {
    this.level.enemies.forEach((enemies) => {
      if (
        this.character.isColliding(enemies) &&
        this.character.isAboveGround()
      ) {
        if (enemies.chickenEnergy == 50 || enemies.smallChickenEnergy == 50) {
          this.chickenHitSound();
          enemies.chickenHit();
          this.character.jumpAfterKill();
        }
      }
    });
  }

  /**
   * check if pepe collected the coin and play the coinCollectSound
   */
  checkCollectionCoins() {
    this.level.coins.forEach((coins) => {
      if (this.character.isColliding(coins)) {
        this.character.collectCoins();
        this.coinCollectSound();
        this.coinBar.setPercentage(this.character.coins);
      }
    });
  }

  /**
   *  collect the Coin an move it off screen
   */
  coinIsCollected() {
    for (let i = 0; i < this.level.coins.length; i++) {
      const coin = this.level.coins[i];
      if (this.character.isColliding(coin)) {
        this.level.coins.splice(i, 1);
      }
    }
  }

  /**
   * set the this.character.world to this
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * draws all objects on canvas, and fixes the camera perspective
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addToMap(this.character);
    this.addObjectsToMap(this.throwableObject);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottle);
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar);
    this.addToMap(this.coinBar);
    this.addToMap(this.bottleBar);
    this.ctx.translate(this.camera_x, 0);
    this.ctx.translate(-this.camera_x, 0);
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * plays the coin collect sound
   */
  coinCollectSound() {
    if (audioMute == false) {
      this.coin_collect_sound.currentTime = 0;
      this.coin_collect_sound.playbackRate = 1.8;
      this.coin_collect_sound.play();
    }
  }

  /**
   * plays the bottle collect sound
   */
  bottleCollectSound() {
    if (audioMute == false) {
      this.bottle_collect_sound.currentTime = 0;
      this.bottle_collect_sound.playbackRate = 0.9;
      this.bottle_collect_sound.play();
    }
  }

  /**
   * play the chicken hit sound
   */
  chickenHitSound() {
    if (audioMute == false) {
      this.chicken_hit_sound.currentTime = 0;
      this.chicken_hit_sound.volume = 0.19;
      this.chicken_hit_sound.play();
    }
  }

  /**
   * check if the splash cann happen or not
   */
  checkSplashorNot() {
    setTimeout(() => {
      this.character.splash = false;
    }, 50);
  }

  /**
   * draws each object of the array
   * @param {array} objects array of objects
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * draws the object
   * @param {object} mo movable object
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
