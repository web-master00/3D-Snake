export function createFood(count, snake) {
  const freeCells = [];

  for (let y = 0; y < count; y++) {
    for (let x = 0; x < count; x++) {
      const isOnSnake = snake.some(item => item.x === x && item.y === y);

      if (!isOnSnake) {
        freeCells.push({ x, y });
      }
    }
  }
  const index = Math.floor(Math.random() * freeCells.length);
  return freeCells[index];
}
