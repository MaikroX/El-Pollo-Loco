class Cloud extends MovableObject {
  y = 20;
  width = 500;
  height = 250;

  constructor() {
    super().loadImage("img/5_background/layers/4_clouds/1.png");
    this.x = 100 + Math.random() * 2200;
    this.animate();
  } // Zahl zwischen 200 und 700

  animate() {
    this.moveLeft();
  }
}
