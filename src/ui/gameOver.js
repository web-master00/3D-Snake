import { recordScores } from "../settings/levels/recordScore.js";
import { updateRecord } from "../settings/levels/updateRecord.js";

const gameOverScore = document.querySelector(".gameOverScore");
const goRecordMsg = document.querySelector(".goRecordMsg");

export function gameOver(snake) {
  const head = snake[0];
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) return true;
  }
  return false;
}

export function handleGameOver(
  state,
  gameLoop,
  modals,
  records,
  updateLevelButtons,
  recordScore,
) {
  if (!gameOver(state.snake)) return false;

  clearInterval(gameLoop);

  const isNewRecord = state.score > records[state.level];
  gameOverScore.textContent = "Final score: " + state.score;
  if (goRecordMsg) {
    goRecordMsg.textContent = isNewRecord
      ? "✨ New record!"
      : "Best: " + records[state.level];
  }

  updateRecord(records, state.level, state.score);
  recordScores(records, state.level, recordScore);
  updateLevelButtons();
  modals.gameOver.style.display = "flex";

  return true;
}

export function forceGameOver(
  state,
  gameLoop,
  modals,
  records,
  updateLevelButtons,
  recordScore,
) {
  clearInterval(gameLoop);

  const isNewRecord = state.score > records[state.level];
  gameOverScore.textContent = "Final score: " + state.score;
  if (goRecordMsg) {
    goRecordMsg.textContent = isNewRecord
      ? "✨ New record!"
      : "Best: " + records[state.level];
  }

  updateRecord(records, state.level, state.score);
  recordScores(records, state.level, recordScore);
  updateLevelButtons();
  modals.gameOver.style.display = "flex";
}
