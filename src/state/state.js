import { createSnake } from "../game/snake/move.js";
import { loadLevel } from "../settings/levels/storage.js";

export const state = (count) =>( {
  snake: createSnake(count),
  food: { x: 0, y: 0 },
  lastFood: null,
  pos: { x: 1, y: 0 },
  nextPos: { x: 1, y: 0 },
  score: 0,
  paused: false,
  level: loadLevel(),
});
