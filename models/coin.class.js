class Coins extends MovableObject {
  height = 120;
  y = 115;
  offset = {
    top: 40,
    bottom: 40,
    left: 40,
    right: 40,
  };

  IMAGES_COIN = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];

  constructor() {
    super().loadImage("img/8_coin/coin_1.png");
    this.y + Math.floor() * 500;
    this.x = 200 + Math.random() * 1600; // Zahl zwischen 200 und 700
    this.loadImages(this.IMAGES_COIN);

    this.animate();
  }

  animate() {
    this.collectThisCoin();

    setInterval(() => {
      this.playAnimation(this.IMAGES_COIN);
    }, 200);
    this.collectThisCoin();
  }

  // Muss evtl. mit Timestamp gearbeitet werden //
  // Muss evtl. mit Timestamp gearbeitet werden //
  // Muss evtl. mit Timestamp gearbeitet werden //

  // For Schleife Zugriff auf --- world.level.coins[i] ---

  collectThisCoin() {
    if (this.collectCoins()) {
      this.loadImages(this.IMAGES_COIN[0]);
    }
  }
}
