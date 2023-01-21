class DrawableObject {
  x = 120;
  y = 280;
  img;
  height = 150;
  width = 100;
  imageCache = {};
  currentImage = 0;

  /**
   * drwas the img that are set
   * @param {object} ctx
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * draws a border / for checking the hitboxes of the current img
   * @param {number} ctx
   */
  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof Endboss ||
      this instanceof SmallChicken ||
      this instanceof Coins ||
      this instanceof Bottle
    ) {
      ctx.beginPath();
      // ctx.lineWidth = "3";
      // ctx.strokeStyle = "blue";
      // ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  /**
   * load the array from the img
   * @param {array} arr array of images
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * load images by its relative path
   * @param {string} path path the relative path to the img
   */
  loadImage(path) {
    this.img = new Image(); // this.img = document.getElementbyId('image') <img id="image" src>
    this.img.src = path;
  }
}
