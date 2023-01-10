class ThrowAbleObject extends MovableObject {
  IMAGE_BOTTLE_ROTATION = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGE_BOTTLE_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  constructor(x, y) {
    super().loadImage(
      "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png"
    );
    this.loadImages(this.IMAGE_BOTTLE_ROTATION);
    this.loadImages(this.IMAGE_BOTTLE_SPLASH);
    this.x = x;
    this.y = y;
    this.height = 100;
    this.animate();
  }

  animate() {
    this.throw(100, 150);
    this.throwAnimation();
  }

  throw() {
    this.speedY = 10;
    this.applyGravity();
    setInterval(() => {
      this.x += 3.5;
    }, 20);
  }

  throwAnimation() {
    setInterval(() => {
      this.playAnimation(this.IMAGE_BOTTLE_ROTATION);
    }, 60);
  }
}
