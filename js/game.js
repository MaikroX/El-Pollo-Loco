let canvas;
let world;
let keyboard = new Keyboard();
let winGame = false;
let looseGame = false;

let audioMute = true;

/**
 * mute all sound onclick, and show mute button
 */
function audioOff() {
  document.getElementById("muteOn").classList.add("d-none");
  document.getElementById("muteOff").classList.remove("d-none");
  audioMute = true;
  world.background_music.pause();
}

/**
 * unmute all sounds onclick, and show unmute button
 */
function audioOn() {
  document.getElementById("muteOn").classList.remove("d-none");
  document.getElementById("muteOff").classList.add("d-none");
  audioMute = false;
  world.background_music.volume = 0.08;
  world.background_music.play();
}

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  setTimeout(() => {
    document.getElementById("movingKeys").classList.add("display-hidden");
  }, 12000);
}

$(document).ready(function () {
  if (!window.navigator.standalone) {
    $("a").click(function () {
      window.scrollTo(0, 0);
      setTimeout(function () {
        window.scrollTo(0, 1);
      }, 0);
    });
  }
});

function playGame() {
  document.getElementById("canvasContain").classList.remove("d-none");
  document.getElementById("headlineOne").classList.add("d-none");
  document.getElementById("playGame").classList.add("d-none");
  document.getElementById("movingKeys").classList.remove("display-hidden");
  init();
  audioOn();
}

function showInstruction() {
  document.getElementById("headlineOne").classList.add("d-none");
  document.getElementById("targetOfGame").classList.remove("d-none");
}

function backFromHelp() {
  document.getElementById("headlineOne").classList.remove("d-none");
  document.getElementById("targetOfGame").classList.add("d-none");
}
// function showInformations() {
//   document.getElementById("targetOfGame").classList.add("display-visible");
//   document.getElementById("movingKeys").classList.add("display-visible");
// }

function reloadAll() {
  window.location.reload();
}

function endIfDead() {
  if (looseGame) {
    document.getElementById("headlineOne").classList.remove("d-none");
    document.getElementById("canvasContain").classList.add("d-none");
    document.getElementById("looseGame").classList.remove("d-none");
    document.getElementById("information").classList.add("d-none");
    document.getElementById("movingKeys").classList.add("d-none");
    audioOff();
  }
}
