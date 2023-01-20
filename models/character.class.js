class Character extends MovableObject {
  height = 350;
  width = 120;
  y = 50;
  speed = 5;
  deadIntervalId = [];
  offset = {
    top: 120,
    bottom: 10,
    left: 40,
    right: 40,
  };

  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
    "img/2_character_pepe/4_hurt/H-41.png",
  ];

  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_LONG_IDLE = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  world;
  walking_sound = new Audio("audio/walk.mp3");
  jump_sound = new Audio("audio/jump.mp3");
  sleep_sound = new Audio("audio/pepe-sleep.mp3");
  hurt_sound = new Audio("audio/pepe-hurt.mp3");

  constructor() {
    super().loadImage("img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.applyGravity();
    this.animate();
  }

  animate() {
    this.moveCharacter();

    let intervalId = setInterval(() => {
      //walk Animation
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
        setTimeout(() => {
          clearInterval(intervalId);
        }, 2000);
        setTimeout(() => {
          looseGame = true;
          endIfDead();
        }, 1500);
      } else if (this.isHurt()) {
        this.hurtSound();
        this.playAnimation(this.IMAGES_HURT);
      } else if (this.isAboveGround()) {
        this.getMoveTimeStamp();
        this.playAnimation(this.IMAGES_JUMPING);
      } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.getMoveTimeStamp();
        this.playAnimation(this.IMAGES_WALKING);
      } else if (this.fallInSleep() && !this.isAboveGround()) {
        this.playAnimation(this.IMAGES_LONG_IDLE);
        this.sleepSound();
      } else {
        this.playAnimation(this.IMAGES_IDLE);
      }
    }, 150);
  }

  moveCharacter() {
    setInterval(() => {
      this.walking_sound.pause();
      // this.jump_sound.pause();
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.moveRight();
        this.playFootSounds();
      }
      if (this.world.keyboard.LEFT && this.x > -600) {
        this.moveLeft();
        this.playFootSounds();
      }
      if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        if (audioMute == false) {
          this.playJumpSound();
        }
        this.jump();
      }
      this.world.camera_x = -this.x + 80;
    }, 1000 / 60);
  }

  // play step Sound only on Ground
  playFootSounds() {
    if (audioMute == false) {
      if (!this.isAboveGround()) {
        this.walking_sound.play();
      }
    }
  }

  playJumpSound() {
    if (audioMute == false) {
      this.jump_sound.volume = 0.4;
      this.jump_sound.play();
    }
  }

  sleepSound() {
    if (audioMute == false) {
      this.sleep_sound.volume = 0.3;
      this.sleep_sound.play();
    }
  }

  hurtSound() {
    if (audioMute == false) {
      this.hurt_sound.volume = 0.35;
      this.hurt_sound.play();
    }
  }
}
