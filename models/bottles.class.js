class Bottle extends MovableObject {
  height = 80;
  y = 352;
  offset = {
    top: 15,
    bottom: 0,
    left: 50,
    right: 40,
  };
  IMAGES_BOTTLE_GROUND = ["img/6_salsa_bottle/1_salsa_bottle_on_ground.png"];

  constructor() {
    super().loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
    this.y + Math.floor() * 500;
    this.x = 200 + Math.random() * 2050;
    this.loadImages(this.IMAGES_BOTTLE_GROUND);

    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_BOTTLE_GROUND);
    }, 400);

    setInterval(() => {
      if (this.collectBottle()) {
        loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
      }
    }, 60);
  }
}
