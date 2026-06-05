export function teleportSnake(head, count, level) {
  if (level === "hard") return;
  if (head.x < 0) {
    head.x = count - 1;
  } else if (head.x >= count) {
    head.x = 0;
  } else if (head.y < 0) {
    head.y = count - 1;
  } else if (head.y >= count) {
    head.y = 0;
  }
}
