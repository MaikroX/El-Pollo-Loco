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
      this.checkThrowObject();
      this.checkCollisions();
      this.checkCollectionBottles();
      this.checkCollectionCoins();
      // this.checkBottleHit();
      this.coinIsCollected();
      this.bottleIsCollected();
    }, 250);
  }

  checkCollectionBottles() {
    this.level.bottle.forEach((bottle) => {
      if (this.character.isColliding(bottle)) {
        this.character.collectBottle();
        this.collectedBottle = this.collectedBottle.splice(0, 4);
        this.collectedBottle.push(bottle);
        this.bottleBar.setPercentage(this.character.bottle);
        console.log("Collect Bottle", this.character.bottle);
      }
    });
  }

  // When bottle count is over 0 then able to throw a bottle
  checkThrowObject() {
    if (this.keyboard.D && this.collectedBottle.length > 0) {
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

  //Collect the Bottle an move it off screen
  bottleIsCollected() {
    for (let i = 0; i < this.level.bottle.length; i++) {
      const bottle = this.level.bottle[i];
      if (this.character.isColliding(bottle)) {
        this.level.bottle.splice(i, 1);
      }
    }
  }

  // check collision with enemy
  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
        console.log("Colission with Character", this.character.energy);
      }
    });
  }

  // check if the bottle hits chicken
  // checkBottleHit() {
  //   this.level.enemies.forEach((enemy) => {
  //     if (this.level.throwableObject.isColliding(enemy)) {
  //       // this.character.hit();
  //       // this.statusBar.setPercentage(this.character.energy);
  //       console.log("Chicken Hit");
  //     }
  //   });
  // }

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
