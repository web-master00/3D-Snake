import { buttons } from "../../ui/buttons.js";

export function getSound() {
  return localStorage.getItem("soundOn") === "true";
}

export function toggleSound() {
  const val = !getSound();
  localStorage.setItem("soundOn", val);
  return val;
}

export function renderSound() {
  buttons.btnVolume.classList.toggle("muted", !getSound());
}
renderSound();
