let canvas;
let world;
let keyboard = new Keyboard();
let winGame = false;
let looseGame = false;
let gameEndSound = false;
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
  world.background_music.volume = 0.03;
  world.background_music.play();
}

/**
 * init the canvas and set the new world
 */
function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  setTimeout(() => {
    document.getElementById("movingKeys").classList.add("display-hidden");
  }, 12000);
}

/**
 * for mobile screens to hide the browser bar onscroll to have a better UX
 */
// $(document).ready(function () {
//   if (!window.navigator.standalone) {
//     $("a").click(function () {
//       window.scrollTo(0, 0);
//       setTimeout(function () {
//         window.scrollTo(0, 1);
//       }, 0);
//     });
//   }
// });

/**
 * hides the start screen, start the game and actually default audio ON
 */
function playGame() {
  document.getElementById("canvasContain").classList.remove("d-none");
  document.getElementById("headlineOne").classList.add("d-none");
  document.getElementById("playGame").classList.add("d-none");
  document.getElementById("movingKeys").classList.remove("display-hidden");
  init();
  audioOn();
  gameEndSound = false;
}

/**
 * shows the little story of Pepe
 */
function showInstruction() {
  document.getElementById("headlineOne").classList.add("d-none");
  document.getElementById("targetOfGame").classList.remove("d-none");
}

/**
 * load the start screen when get back brom help
 */
function backFromHelp() {
  reloadAll();
}

/**
 * loads the whole window & refresh all
 * @returns promise
 */
function reloadAll() {
  return new Promise((resolve) => {
    window.location.reload();
    resolve();
  });
}

/** when gameOver by DEAD the dead message shown and the gameover sound is playing if audioMute = false  */
function endIfDead() {
  if (looseGame) {
    document.getElementById("headlineOne").classList.remove("d-none");
    document.getElementById("looseGame").classList.remove("d-none");
    document.getElementById("canvasContain").classList.add("d-none");
    document.getElementById("information").classList.add("d-none");
    document.getElementById("movingKeys").classList.add("d-none");
    if (audioMute == false) {
      world.looseGameSound.currentTime = 0;
      world.looseGameSound.volume = 0.5;
      world.looseGameSound.play();
      world.background_music.pause();
    }
  }
}

/**
 * when gameOver by WIN the win message shown and the gamewin sound is playing if audioMute = false
 * all other sounds stop, if there are any chicken alive
 */
function endIfWin() {
  if (winGame) {
    document.getElementById("headlineOne").classList.remove("d-none");
    document.getElementById("winGame").classList.remove("d-none");
    document.getElementById("canvasContain").classList.add("d-none");
    document.getElementById("information").classList.add("d-none");
    document.getElementById("movingKeys").classList.add("d-none");
    world.character.energy = 1000;
    if (audioMute == false) {
      winGame = true;
      world.winGameSound.volume = 0.5;
      world.winGameSound.play();
      world.background_music.pause();
      world.character.sleep_sound.pause();
      world.character.hurt_sound.pause();
    }
  }
}
