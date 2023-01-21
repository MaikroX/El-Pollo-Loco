class Keyboard {
  LEFT = false;
  RIGHT = false;
  UP = false;
  DOWN = false;
  SPACE = false;
  E = false;
  ENTER = false;

  rightToggle = document.getElementById("moveRight");
  leftToggle = document.getElementById("moveLeft");
  jumpToggle = document.getElementById("jumping");
  shootToggle = document.getElementById("shoot");

  constructor() {
    this.moveWithKeyboard();
    this.moveTouch();
  }

  /**
   * they Keyboard settings for not mobile Devices
   * setting true at keydown
   * setting false at keyup
   */
  moveWithKeyboard() {
    window.addEventListener("keydown", (e) => {
      if (e.keyCode == 68) {
        keyboard.RIGHT = true;
        this.rightToggle.classList.add("filter-toggle");
      }

      if (e.keyCode == 39) {
        keyboard.RIGHT = true;
        this.rightToggle.classList.add("filter-toggle");
      }

      if (e.keyCode == 65) {
        keyboard.LEFT = true;
        this.leftToggle.classList.add("filter-toggle");
      }

      if (e.keyCode == 37) {
        keyboard.LEFT = true;
        this.leftToggle.classList.add("filter-toggle");
      }

      if (e.keyCode == 38) {
        keyboard.SPACE = true;
        this.jumpToggle.classList.add("filter-toggle");
      }

      if (e.keyCode == 32) {
        keyboard.SPACE = true;
        this.jumpToggle.classList.add("filter-toggle");
      }
      if (e.keyCode == 69) {
        keyboard.E = true;
        this.shootToggle.classList.add("filter-toggle");
      }

      if (e.keyCode == 13) {
        keyboard.ENTER = true;
        this.shootToggle.classList.add("filter-toggle");
      }
    });

    window.addEventListener("keyup", (e) => {
      if (e.keyCode == 68) {
        keyboard.RIGHT = false;
        this.rightToggle.classList.remove("filter-toggle");
      }

      if (e.keyCode == 39) {
        keyboard.RIGHT = false;
        this.rightToggle.classList.remove("filter-toggle");
      }

      if (e.keyCode == 65) {
        keyboard.LEFT = false;
        this.leftToggle.classList.remove("filter-toggle");
      }

      if (e.keyCode == 37) {
        keyboard.LEFT = false;
        this.leftToggle.classList.remove("filter-toggle");
      }
      if (e.keyCode == 38) {
        keyboard.SPACE = false;
        this.jumpToggle.classList.remove("filter-toggle");
      }

      if (e.keyCode == 32) {
        keyboard.SPACE = false;
        this.jumpToggle.classList.remove("filter-toggle");
      }
      if (e.keyCode == 69) {
        keyboard.E = false;
        this.shootToggle.classList.remove("filter-toggle");
      }

      if (e.keyCode == 13) {
        keyboard.ENTER = false;
        this.shootToggle.classList.remove("filter-toggle");
      }
    });
  }

  /**
   * the settings for mobile device
   * setting true at touchstart
   * setting false at tochend
   */
  moveRightArrow = document.querySelector(".right-arrow");
  moveLeftArrow = document.querySelector(".left-arrow");
  jumpButton = document.querySelector(".jump");
  fireButton = document.querySelector(".fire");

  moveTouch() {
    setTimeout(() => {
      this.moveRightArrow.addEventListener(
        "touchstart",
        (e) => {
          e.preventDefault();
          keyboard.RIGHT = true;
        },
        { passive: false }
      );
      this.moveRightArrow.addEventListener("touchend", (e) => {
        keyboard.RIGHT = false;
      });
      this.moveLeftArrow.addEventListener(
        "touchstart",
        (e) => {
          e.preventDefault();
          keyboard.LEFT = true;
        },
        { passive: false }
      );
      this.moveLeftArrow.addEventListener("touchend", (e) => {
        keyboard.LEFT = false;
      });
      this.jumpButton.addEventListener(
        "touchstart",
        (e) => {
          e.preventDefault();
          keyboard.SPACE = true;
        },
        { passive: false }
      );
      this.jumpButton.addEventListener("touchend", (e) => {
        keyboard.SPACE = false;
      });
      this.fireButton.addEventListener(
        "touchstart",
        (e) => {
          e.preventDefault();
          keyboard.E = true;
        },
        { passive: false }
      );
      this.fireButton.addEventListener("touchend", (e) => {
        keyboard.E = false;
      });
      this.fireButton.addEventListener(
        "touchstart",
        (e) => {
          e.preventDefault();
          keyboard.ENTER = true;
        },
        { passive: false }
      );
      this.fireButton.addEventListener("touchend", (e) => {
        keyboard.ENTER = false;
      });
    }, 200);
  }
}
