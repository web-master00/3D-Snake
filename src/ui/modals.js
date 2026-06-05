export const modals = {
  start: document.querySelector(".startGameModal"),
  pause: document.querySelector(".pauseModal"),
  gameOver: document.querySelector(".gameOverModal"),
  settings: document.querySelector(".settingsModal"),
};

export function closeAllModals() {
  Object.values(modals).forEach((modal) => {
    if (modal) modal.style.display = "none";
  });
}