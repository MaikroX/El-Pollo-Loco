let canvas;
let world;
let keyboard = new Keyboard();

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
