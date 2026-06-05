import { renderSound, toggleSound } from "../settings/sound/toggle.js";
import { handlePauseKey, togglePause } from "./pause.js";
import { resetGame } from "./restartGame.js";

export function eventsUI({
  buttons,
  modals,
  startGame,
  resumeGame,
  restartGame,
  closeAllModals,
  gameState,
  gameLoop,
  count,
  currentScore,
  setLoop,
  LEVELS,
  game,
  boardBox,
  icon
}) {

  buttons.startGame.addEventListener("click", () => {
    closeAllModals();
    startGame(game, LEVELS, gameState.level, setLoop, gameLoop);
  });

  document.addEventListener("keydown", (event) => handlePauseKey(event, boardBox,icon));


  buttons.pause.addEventListener("click", () => {
    togglePause(startGame,boardBox,icon)
  });

  buttons.resume.addEventListener("click", () => {
    resumeGame(startGame,boardBox,icon);
  });

  buttons.restart.addEventListener("click", () => {
    restartGame(gameState, gameLoop, startGame, count, modals, currentScore,boardBox);
    togglePause(startGame,boardBox,icon)
  });

  buttons.mainMenu.addEventListener("click", () => {
    resetGame(gameState, count, currentScore);
    closeAllModals();
    boardBox.classList.remove('paused');
    togglePause(startGame,boardBox,icon)
    modals.start.style.display = "flex";
  });

  buttons.gameOverRestart.addEventListener("click", () => {
    restartGame(gameState, gameLoop, startGame, count, modals, currentScore,boardBox);
  });

  buttons.gameOverBtnMainMenu.addEventListener("click", () => {
    resetGame(gameState, count, currentScore);
    closeAllModals();
    modals.start.style.display = "flex";
  });

  buttons.settings.addEventListener("click", () => {
    modals.settings.style.display = "flex";
  });

  buttons.btnVolume.addEventListener("click", () => {
    toggleSound();
    renderSound();
  });
}
