class Chicken extends MovableObject {
  height = 120;
  y = 315;
  offset = {
    top: 10,
    bottom: 0,
    left: 0,
    right: 0,
  };
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  IMAGES_DEATH = [
    "img/3_enemies_chicken/chicken_normal/2_dead/dead.png",
    "img/3_enemies_chicken/chicken_normal/2_dead/dead.png",
  ];

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.x = 900 + Math.random() * 2100; // Zahl zwischen 200 und 700
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEATH);
    this.speed = 0.65 + Math.random() * 0.35;
    this.animate();
  }

  /**
   * animate chicken walking & dead animation
   */
  animate() {
    setInterval(() => {
      this.chickenWalk();
    }, 1000 / 60);

    setInterval(() => {
      if (this.chickenEnergy == 0) {
        this.speed = 0;
        this.playAnimation(this.IMAGES_DEATH);
      } else {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 200);
  }
}
