class Coins extends MovableObject {
  height = 120;
  y = 115;
  IMAGES_COIN = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];

  constructor() {
    super().loadImage("img/8_coin/coin_1.png");
    this.y + Math.floor() * 500;
    this.x = 400 + Math.random() * 1600; // Zahl zwischen 200 und 700
    this.loadImages(this.IMAGES_COIN);

    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_COIN);
    }, 200);
  }
}
