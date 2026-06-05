import { buttons } from "../ui/buttons.js";

export function mobileControl(state) {
  buttons.arrowUp.addEventListener("pointerdown", () => {
    if (state.pos.y !== 1) {
      state.nextPos = { x: 0, y: -1 };
    }
  });
  buttons.arrowDown.addEventListener("pointerdown", () => {
    if (state.pos.y !== -1) {
      state.nextPos = { x: 0, y: 1 };
    }
  });
  buttons.arrowLeft.addEventListener("pointerdown", () => {
    if (state.pos.x !== 1) {
      state.nextPos = { x: -1, y: 0 };
    }
  });
  buttons.arrowRight.addEventListener("pointerdown", () => {
    if (state.pos.x !== -1) {
      state.nextPos = { x: 1, y: 0 };
    }
  });
}
