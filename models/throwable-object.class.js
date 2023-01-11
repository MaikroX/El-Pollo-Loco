class ThrowAbleObject extends MovableObject {
  offset = {
    top: 10,
    bottom: 10,
    left: 10,
    right: 10,
  };
  intervalId = [];
  splashinterval = [];

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
    this.throw();
    this.splashBottle();
    // this.throwAnimation();
    // this.bottleAnimation();
  }

  throw() {
    this.speedY = 10;
    this.applyGravity();
    setInterval(() => {
      this.x += 3.5;
    }, 20);
  }

  // bottleAnimation() {
  //   setInterval(() => {
  //     if (!this.chickenHit()) {
  //       this.playAnimation(this.IMAGE_BOTTLE_ROTATION);
  //     } else if (this.y >= 350) {
  //       this.playAnimation(this.IMAGE_BOTTLE_SPLASH);
  //     } else if (this.chickenHit()) {
  //       this.playAnimation(this.IMAGE_BOTTLE_SPLASH);
  //     }
  //   }, 90);
  // }

  throwAnimation() {
    setInterval(() => {
      this.playAnimation(this.IMAGE_BOTTLE_ROTATION);
    }, 60);
  }

  splashBottle() {
    this.splashinterval = setInterval(() => {
      if (this.y >= 300) {
        this.playAnimation(this.IMAGE_BOTTLE_SPLASH);
      } else if (world.character.splash == true) {
        this.playAnimation(this.IMAGE_BOTTLE_SPLASH);
        setTimeout(() => {
          clearInterval(this.splashinterval);
        }, 460);
      }
    }, 60);
  }
}
