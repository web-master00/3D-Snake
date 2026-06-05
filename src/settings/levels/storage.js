import { DEFAULT_LEVEL } from "../../utils/constants.js";

export function loadLevel() {
  return localStorage.getItem("level") || DEFAULT_LEVEL;
}

export function saveLevel(level) {
  localStorage.setItem("level", level);
}
