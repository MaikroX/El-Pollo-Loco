let canvas;
let world;
let keyboard = new Keyboard();

let audioMute = false;

function audioOff() {
  document.getElementById("muteOn").classList.add("d-none");
  document.getElementById("muteOff").classList.remove("d-none");
  audioMute = true;
  world.background_music.pause();
}
function audioOn() {
  document.getElementById("muteOn").classList.remove("d-none");
  document.getElementById("muteOff").classList.add("d-none");
  audioMute = false;
  world.background_music.play();
}

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  console.log("My Character is", world.character);
}

window.addEventListener("keydown", (e) => {
  if (e.keyCode == 68) {
    keyboard.RIGHT = true;
  }

  if (e.keyCode == 39) {
    keyboard.RIGHT = true;
  }

  if (e.keyCode == 65) {
    keyboard.LEFT = true;
  }

  if (e.keyCode == 37) {
    keyboard.LEFT = true;
  }

  if (e.keyCode == 38) {
    keyboard.SPACE = true;
  }

  if (e.keyCode == 83) {
    keyboard.DOWN = true;
  }

  if (e.keyCode == 40) {
    keyboard.DOWN = true;
  }

  if (e.keyCode == 32) {
    keyboard.SPACE = true;
  }
  if (e.keyCode == 69) {
    keyboard.E = true;
  }

  if (e.keyCode == 13) {
    keyboard.ENTER = true;
  }
});

window.addEventListener("keyup", (e) => {
  if (e.keyCode == 68) {
    keyboard.RIGHT = false;
  }

  if (e.keyCode == 39) {
    keyboard.RIGHT = false;
  }

  if (e.keyCode == 65) {
    keyboard.LEFT = false;
  }

  if (e.keyCode == 37) {
    keyboard.LEFT = false;
  }

  if (e.keyCode == 38) {
    keyboard.SPACE = false;
  }

  if (e.keyCode == 83) {
    keyboard.DOWN = false;
  }

  if (e.keyCode == 40) {
    keyboard.DOWN = false;
  }

  if (e.keyCode == 32) {
    keyboard.SPACE = false;
  }
  if (e.keyCode == 69) {
    keyboard.E = false;
  }

  if (e.keyCode == 13) {
    keyboard.ENTER = false;
  }
});
