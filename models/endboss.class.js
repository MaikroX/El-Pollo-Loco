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

  constructor() {
    super().loadImage(this.IMAGES_ALERT[0]);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_WALK);
    this.x = 1000; // 2600 soll er starten
    this.animate();
  }

  animate() {
    this.bossWalkAnimation();
    this.alertAnimation();
    this.firstHitAnimation();
    this.secondHitAnimation();
    this.deadAnimation();
    this.bossMove();
  }

  bossMove() {
    setInterval(() => {
      if (this.endBossEnergy >= 1) {
        this.bossWalk();
      }
    }, 1000 / 60);
  }

  bossWalkAnimation() {
    setInterval(() => {
      if (this.endBossEnergy >= 1) {
        this.playAnimation(this.IMAGES_WALK);
      }
    }, 300);
  }

  alertAnimation() {
    let altertInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_ALERT);
      setTimeout(() => {
        clearInterval(altertInterval);
      }, 700);
    }, 300);
    this.loadImage("img/4_enemie_boss_chicken/5_dead/G26.png");
  }

  firstHitAnimation() {
    let hurtInterval = setInterval(() => {
      if (this.endBossEnergy == 100) {
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
        }, 300);
      }
    }, 150);
  }
}
