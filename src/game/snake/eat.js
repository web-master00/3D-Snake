import { createFood } from "../food/create.js";

export function eatFood(state, count, eat, currentScore) {
  if (!eat) return;
  state.food = createFood(count, state.snake);
  state.score++;
  currentScore.textContent = state.score;
}
