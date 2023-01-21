class SmallChicken extends MovableObject {
  height = 60;
  width = 60;
  y = 360;
  offset = {
    top: 0,
    bottom: 0,
    left: 10,
    right: 10,
  };
  SMALL_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  SMALL_DEATH = "img/3_enemies_chicken/chicken_small/2_dead/dead.png";

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.x = 1000 + Math.random() * 500; // Zahl zwischen 200 und 700
    this.loadImages(this.SMALL_WALKING);
    this.speed = 0.35 + Math.random() * 0.35;
    this.animate();
  }

  /**
   * animates the small chicken walking
   */
  animate() {
    setInterval(() => {
      this.chickenWalk();
    }, 1000 / 60);

    setInterval(() => {
      if (this.smallChickenEnergy <= 0) {
        this.speed = 0;
        this.loadImage(this.SMALL_DEATH);
      } else {
        this.chickenWalk();
        this.playAnimation(this.SMALL_WALKING);
      }
    }, 200);
  }
}
