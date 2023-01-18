class Endboss extends MovableObject {
  height = 400;
  width = 250;
  y = 50;
  hurtInterval = [];
  altertInterval = [];
  walkInterval = [];
  canHit = true;
  endBossEnergy = 150;
  offset = {
    top: 30,
    bottom: 0,
    left: 15,
    right: 0,
  };

  IMAGES_WALK = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  boss_sound = new Audio("audio/chicken-sound.mp3");

  constructor() {
    super().loadImage(this.IMAGES_ALERT[0]);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_WALK);
    this.x = 2300; // 2600 soll er starten
    this.animate();
  }

  animate() {
    this.bossWalkAnimation();
    // this.alertAnimation();
    this.firstHitAnimation();
    this.secondHitAnimation();
    // this.deadAnimation();
    this.bossMove();
  }

  bossMove() {
    setInterval(() => {
      if (this.endBossEnergy <= 101 && this.endBossEnergy >= 1) {
        this.bossWalk();
      }
    }, 1000 / 60);
  }

  bossWalkAnimation() {
    let hurtInterval = setInterval(() => {
      if (this.endBossEnergy <= 101 && this.endBossEnergy >= 1) {
        this.playAnimation(this.IMAGES_WALK);
      } else if (this.endBossEnergy >= 101) {
        this.playAnimation(this.IMAGES_ALERT);
      } else if (this.bossisDead()) {
        this.playAnimation(this.IMAGES_DEAD);
        setTimeout(() => {
          clearInterval(hurtInterval);
        }, 1050);
      }
    }, 250);
  }

  firstHitAnimation() {
    let hurtInterval = setInterval(() => {
      if (this.endBossEnergy == 100) {
        this.boss_sound.volume = 0.5;
        this.boss_sound.play();
        this.playAnimation(this.IMAGES_HURT);
        setTimeout(() => {
          clearInterval(hurtInterval);
        }, 700);
      }
    }, 150);
  }

  secondHitAnimation() {
    let hurtInterval = setInterval(() => {
      if (this.endBossEnergy == 50) {
        this.playAnimation(this.IMAGES_HURT);
        setTimeout(() => {
          clearInterval(hurtInterval);
        }, 700);
      }
    }, 150);
  }

  deadAnimation() {
    let hurtInterval = setInterval(() => {
      if (this.endBossEnergy == 0) {
        this.speed = 0;
        this.playAnimation(this.IMAGES_DEAD);
        setTimeout(() => {
          clearInterval(hurtInterval);
        }, 1050);
      }
    }, 250);
  }
}
