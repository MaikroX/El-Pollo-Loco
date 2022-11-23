class ThrowAbleObject extends MovableObject {
  constructor(x, y) {
    super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
    this.x = x;
    this.y = y;
    this.height = 100;
    this.throw(100, 150);
  }

  throw(x, y) {
    this.speedY = 10;
    this.applyGravity();
    setInterval(() => {
      this.x += 5.5;
    }, 20);
  }
}
