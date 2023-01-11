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

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  run() {
    setInterval(() => {
      this.checkFromWhereColiding();
      // this.checkCollisions();
      // this.hitChickenfromTop();
      this.checkBottleHit();
      this.checkCollectionBottles();
      this.checkCollectionCoins();
      this.coinIsCollected();
      this.checkThrowObject();
      this.checkEndbossHit();
      this.checkSplashorNot();
      // this.checkIfBossSeePepe();
    }, 150);
  }

  // checkIfBossSeePepe() {
  //   if (this.character.x >= 2000) {
  //     this.character.seen = true;
  //     this.bossWalk();
  //   }
  //   console.log("Hier bin ich :" + ` ` + this.character.seen);
  // }

  checkCollectionBottles() {
    this.level.bottle.forEach((bottle) => {
      if (this.character.isColliding(bottle)) {
        this.bottleIsCollected();
        this.character.collectBottle();
        this.collectedBottle = this.collectedBottle.splice(0, 4);
        this.collectedBottle.push(bottle);
        this.bottleBar.setPercentage(this.character.bottle);
        console.log("Collect Bottle", this.character.bottle);
      }
    });
    if (this.bottleBar.percentage == 100) {
    }
  }

  //Collect the Bottle an move it off screen
  bottleIsCollected() {
    if (this.collectedBottle.length < 5) {
      for (let i = 0; i < this.level.bottle.length; i++) {
        const bottle = this.level.bottle[i];
        if (this.character.isColliding(bottle)) {
          this.level.bottle.splice(i, 1);
        }
      }
    }
  }

  // When bottle count is over 0 then able to throw a bottle
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
      // HIER MUSS FALSE REIN
    }
  }

  checkBottleHit() {
    this.level.enemies.forEach((enemy, i) => {
      this.throwableObject.forEach((bottle) => {
        if (enemy.isColliding(bottle)) {
          enemy.chickenHit();
          this.character.splash = true;
          setTimeout(() => {
            // this.level.enemies.splice(i, 1);
          }, 500);
          console.log("Height of Bottle", this.level.enemies.chickenEnergy);
        }
      });
    });
  }

  checkEndbossHit() {
    this.throwableObject.forEach((bottle) => {
      if (this.level.enemies[7].isColliding(bottle)) {
        this.level.enemies[7].endbossHit();
        console.log("Endboss Energy", this.level.enemies[7].endBossEnergy);
      }
    });
  }

  checkFromWhereColiding() {
    if (this.character.isAboveGround()) {
      this.hitChickenfromTop();
    } else {
      this.checkCollisions();
    }
  }

  // check collision with enemy
  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (enemy.chickenEnergy == 50) {
        if (this.character.isColliding(enemy)) {
          this.character.hit();
          this.statusBar.setPercentage(this.character.energy);
          console.log("Colission with Character", this.character.energy);
        }
      }
    });
  }

  hitChickenfromTop() {
    this.level.enemies.forEach((enemies) => {
      if (
        this.character.isColliding(enemies) &&
        this.character.isAboveGround()
      ) {
        if (enemies.chickenEnergy == 50 || enemies.smallChickenEnergy == 50) {
          enemies.chickenHit();
          this.character.jumpAfterKill();
          // setTimeout(() => {
          //   // this.level.enemies.splice(i, 1);
          // }, 500);
        }
      }
    });
  }

  checkCollectionCoins() {
    this.level.coins.forEach((coins) => {
      if (this.character.isColliding(coins)) {
        this.character.collectCoins();
        this.coinBar.setPercentage(this.character.coins);
        console.log("Collect Coins", this.character.coins);
      }
    });
  }

  //Collect the Coin an move it off screen
  coinIsCollected() {
    for (let i = 0; i < this.level.coins.length; i++) {
      const coin = this.level.coins[i];
      if (this.character.isColliding(coin)) {
        this.level.coins.splice(i, 1);
      }
    }
  }

  setWorld() {
    this.character.world = this;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    // Zeichnet Objekte auf das Canvas
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addToMap(this.character);
    this.addObjectsToMap(this.throwableObject);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottle);
    // Zeichnet Statusbar
    // --- Space for fixed Objects ---
    this.ctx.translate(-this.camera_x, 0); // back
    this.addToMap(this.statusBar);
    this.addToMap(this.coinBar);
    this.addToMap(this.bottleBar);
    this.ctx.translate(this.camera_x, 0); // forwards
    this.ctx.translate(-this.camera_x, 0);
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  checkSplashorNot() {
    setTimeout(() => {
      this.character.splash = false;
    }, 50);
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

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
