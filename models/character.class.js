class Character extends MovableObject {
  height = 350;
  width = 120;
  y = 50;
  speed = 5;

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

  world;
  walking_sound = new Audio("audio/walk.mp3");

  constructor() {
    super().loadImage("img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.applyGravity();
    this.animate();
  }

  animate() {
    this.walkAnimation();
    this.jumpAnimation();
    this.hurtAnimation();
    this.pepeIsDown();
    this.moveCharacter();
  }

  moveCharacter() {
    setInterval(() => {
      this.walking_sound.pause();
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.moveRight();
        this.playFootSounds();
      }
      if (this.world.keyboard.LEFT && this.x > 0) {
        this.moveLeft();
        this.playFootSounds();
      }
      if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        this.jump();
      }
      this.world.camera_x = -this.x + 80;
    }, 1000 / 60);
  }

  // Pepe ist walking Animation
  walkAnimation() {
    setInterval(() => {
      if (
        (this.world.keyboard.RIGHT && !this.isAboveGround()) ||
        (this.world.keyboard.LEFT && !this.isAboveGround())
      ) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 60);
  }

  // Jumping Pepe
  jumpAnimation() {
    let jump = setInterval(() => {
      if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
        console.log("Jump ID", jump);
      }
    }, 160);
  }

  // Pepe Dead Animation
  deadAnimation(killed) {
    this.playAnimation(this.IMAGES_DEAD);
    console.log("killed ID", killed);
    setTimeout(function () {
      clearInterval(24);
    }, 620);
  }

  // Pepes last dance
  pepeIsDown() {
    let killed = setInterval(() => {
      if (this.isDead()) {
        this.deadAnimation(killed);
      }
    }, 200);
  }

  //hurt Animation
  hurtAnimation() {
    let hurt = setInterval(() => {
      if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
        console.log("interval HURT ID", hurt);
      }
    }, 60);
  }

  // play step Sound only on Ground
  playFootSounds() {
    if (!this.isAboveGround()) {
      this.walking_sound.play();
    }
  }
}
