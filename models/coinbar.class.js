class Coinbar extends DrawableObject {
  IMAGES_COINS = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png",
  ];

  percentage = 100;

  constructor() {
    super().loadImage(
      "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png"
    );
    this.loadImages(this.IMAGES_COINS);
    this.x = 500;
    this.y = 0;
    this.width = 200;
    this.height = 60;
    this.setPercentage(0);
  }
  /**
   * show the correct img from the statusbar, of its length
   * @param {number} percentage
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_COINS[this.resolveImgIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * returns the percentage for animate the correct statusbar length onscreen
   * @returns {number} to get the percentage
   */
  resolveImgIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage >= 80) {
      return 4;
    } else if (this.percentage >= 60) {
      return 3;
    } else if (this.percentage >= 40) {
      return 2;
    } else if (this.percentage >= 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
