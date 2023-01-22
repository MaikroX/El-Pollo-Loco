class ThrowAbleObject extends MovableObject {
  offset = {
    top: 30,
    bottom: 10,
    left: 30,
    right: 30,
  };
  intervalId = [];
  splashinterval = [];
  splash_sound = new Audio("audio/bottle-splash.mp3");
  bottle_throw = new Audio("audio/throw2.mp3");

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

  /**
   * animate the throwing bottles
   */
  animate() {
    this.throw();
    this.splashBottle();
    this.throwBottleSound();
  }

  /**
   * draw the throwing bottle at start throwing and check in wich direction the bottle fly
   */
  throw() {
    this.speedY = 10;
    if (world.character.otherDirection == false) {
      this.x = world.character.x + 70;
      setInterval(() => {
        this.x += 4.5;
      }, 20);
    } else {
      this.x = world.character.x - 30;
      setInterval(() => {
        this.x -= 2.5;
      }, 20);
    }
    this.applyGravity();
  }

  /**
   * animates the img of the bottle rotation
   */
  throwAnimation() {
    setInterval(() => {
      this.throwBottleSound();
      this.playAnimation(this.IMAGE_BOTTLE_ROTATION);
    }, 60);
  }

  /**
   * animates the bottle splash when its on ground or hit enemies
   */
  splashBottle() {
    this.splashinterval = setInterval(() => {
      if (this.y >= 300) {
        this.playAnimation(this.IMAGE_BOTTLE_SPLASH);
        this.soundSplash();
      } else if (world.character.splash == true) {
        this.playAnimation(this.IMAGE_BOTTLE_SPLASH);
        this.soundSplash();
        setTimeout(() => {
          clearInterval(this.splashinterval);
        }, 60);
      } else if (this.y <= 300) {
        this.playAnimation(this.IMAGE_BOTTLE_ROTATION);
      }
    }, 60);
  }

  /**
   * play the bottlesplash sound
   */
  soundSplash() {
    if (audioMute == false) {
      this.splash_sound.volume = 0.5;
      this.splash_sound.play();
    }
    setTimeout(() => {
      this.splash_sound.pause();
      clearInterval(this.splashinterval);
    }, 900);
  }

  /**
   * play the throwBottle sound
   */
  throwBottleSound() {
    if (audioMute == false) {
      this.bottle_throw.volume = 0.3;
      this.bottle_throw.play();
    }
  }
}
