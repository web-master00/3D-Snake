import { buttons } from "./buttons.js";
import { modals } from "./modals.js";

let loop = null;
let paused = false;

export function setLoop(newLoop) {
  loop = newLoop;
}

export function pauseGame(boardBox,icon) {
  if (loop === null) return;

  clearInterval(loop);
  boardBox.classList.add('paused');
  icon.classList.remove('fa-pause')
  icon.classList.add('fa-play')
  modals.pause.style.display = "flex";
  paused = true;
}

export function handlePauseKey(event,boardBox,icon) {
  if (event.key === "p") {
    pauseGame(boardBox,icon);
  }
}

export function resumeGame(startGame,boardBox,icon) {
  if (!paused) return;
  boardBox.classList.remove('paused');
  icon.classList.remove('fa-play')
  icon.classList.add('fa-pause')
  modals.pause.style.display = "none";
  startGame();
  paused = false;
}

export function togglePause(startGame, boardBox,icon) {
  if (paused) {
    resumeGame(startGame, boardBox,icon);
  } else {
    pauseGame(boardBox,icon);
  }
}

