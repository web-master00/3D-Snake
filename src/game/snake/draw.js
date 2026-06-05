export function drawSnake(cells, snake, count, direction) {
  cells.forEach((cell) => {
    cell.classList.remove(
      "snake",
      "snakeHead",
      "head-up",
      "head-down",
      "head-left",
      "head-right",
    );
    cell.style.removeProperty("opacity");
    cell.style.removeProperty("transform");
    cell.style.removeProperty("filter");
  });

  const len = snake.length;

  snake.forEach((item, index) => {
    const ind = item.y * count + item.x;
    const cell = cells[ind];

    if (!cell) return;

    cell.classList.add("snake");

    if (index === 0) {
      cell.classList.add("snakeHead");

      if (direction.x === 1) cell.classList.add("head-right");
      else if (direction.x === -1) cell.classList.add("head-left");
      else if (direction.y === -1) cell.classList.add("head-up");
      else if (direction.y === 1) cell.classList.add("head-down");
    } else {
      const progress = index / (len - 1);
      const opacity = 1 - progress * 0.45;
      const scale = 1 - progress * 0.18;

      cell.style.opacity = opacity.toFixed(3);
      cell.style.transform = `scale(${scale.toFixed(3)})`;
    }
  });
}
