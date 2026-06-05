import { buttons } from "../../ui/buttons.js";
import { THEME } from "../../utils/constants.js";

let currentTheme = localStorage.getItem("theme") || "light";
let selectedTheme = currentTheme;
let isToggleOn = false;

export function themeMode() {
  applyTheme(currentTheme);

  if (!isToggleOn) {
    buttons.themeToggle.addEventListener("click", () => {
      selectedTheme = selectedTheme === "dark" ? "light" : "dark";
      applyTheme(selectedTheme);
    });
    isToggleOn = true;
  }

  return {
    getSelectedTheme: () => selectedTheme,
    getCurrentTheme: () => currentTheme,
    setCurrentTheme: (theme) => currentTheme = theme,
    resetSelectedTheme: () => selectedTheme = currentTheme,
  };
}

export function applyTheme(theme) {
  document.body.classList.toggle("dark", theme === THEME.dark);
  document.body.classList.toggle("light", theme === THEME.light);
}
