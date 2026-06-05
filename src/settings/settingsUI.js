import { applyTheme, themeMode } from "./theme/mode.js";
import { setActiveLevel } from "./levels/active.js";
import { setLevelColor } from "./levels/color.js";
import { recordScores } from "./levels/recordScore.js";
import { loadLevel, saveLevel } from "./levels/storage.js";

export function settingsUI({
  buttons,
  gameState,
  records,
  isUnlocked,
  recordScore,
  grid,
  modals,
}) {

  let selectedLevel = gameState.level;
  const savedLevel = loadLevel();
  gameState.level = savedLevel;
  let activeButton = savedLevel === "medium" ? buttons.medium : savedLevel === "hard"  ? buttons.hard : buttons.easy;
  setActiveLevel(null, activeButton);
  const theme = themeMode();

  function updateLevelButtons() {
    buttons.medium.disabled = !isUnlocked("medium", records);
    buttons.hard.disabled = !isUnlocked("hard", records);
  }
  updateLevelButtons();


  buttons.easy.addEventListener("click", () => {
    activeButton = setActiveLevel(activeButton,buttons.easy);
    selectedLevel = "easy";

  });

  buttons.medium.addEventListener("click", () => {
    if (!isUnlocked("medium", records)) return;
    activeButton = setActiveLevel(activeButton,buttons.medium);
    selectedLevel = "medium";
  });

  buttons.hard.addEventListener("click", () => {
    if (!isUnlocked("hard", records)) return;
    activeButton = setActiveLevel(activeButton,buttons.hard);
    selectedLevel = "hard";
  });

  buttons.ok.addEventListener("click", () => {
    setLevelColor(gameState.level,selectedLevel, grid);
    gameState.level = selectedLevel;
    saveLevel(gameState.level);
    recordScores(records, gameState.level, recordScore);
    const newTheme = theme.getSelectedTheme();
    applyTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    theme.setCurrentTheme(newTheme);
    modals.settings.style.display = 'none'
  });

  buttons.settingsModalBackBtn.addEventListener("click", () => {
    selectedLevel = gameState.level
    const inLevel = selectedLevel
    const btn = inLevel === "medium" ? buttons.medium : gameState.level === "hard" ? buttons.hard : buttons.easy;
    activeButton = setActiveLevel(activeButton,btn)
    const savedTheme = theme.getCurrentTheme();
    applyTheme(savedTheme);
    modals.settings.style.display = "none";
    modals.start.style.display = "flex";
  });

  return { updateLevelButtons };
}
