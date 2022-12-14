class DrawableObject {
  x = 120;
  y = 280;
  img;
  height = 150;
  width = 100;
  imageCache = {};
  currentImage = 0;

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  // Rahmen um die Objekte
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

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  loadImage(path) {
    this.img = new Image(); // this.img = document.getElementbyId('image') <img id="image" src>
    this.img.src = path;
  }
}
