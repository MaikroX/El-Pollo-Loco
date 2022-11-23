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
      this.checkCollisions();
      this.checkThrowObject();
      this.checkCollectionBottles();
      this.checkCollectionCoins();
    }, 200);
  }

  checkThrowObject() {
    if (this.keyboard.D) {
      let bottle = new ThrowAbleObject(
        this.character.x + 100,
        this.character.y + 100
      );
      this.throwableObject.push(bottle);
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
  checkCollectionBottles() {
    this.level.bottle.forEach((bottle) => {
      if (this.character.isColliding(bottle)) {
        this.character.collectBottle();
        this.bottleBar.setPercentage(this.character.bottle);
        console.log("Collect Bottle", this.character.bottle);
      }
    });
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
        console.log("Colission with Character", this.character.energy);
      }
    });
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
