class SmallChicken extends MovableObject {
  height = 50;
  width = 50;
  y = 375;
  SMALL_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.x = 500 + Math.random() * 500; // Zahl zwischen 200 und 700
    this.loadImages(this.SMALL_WALKING);
    this.speed = 0.65 + Math.random() * 0.35;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.chickenWalk();
    }, 1000 / 60);

    setInterval(() => {
      this.playAnimation(this.SMALL_WALKING);
    }, 200);
  }
}
