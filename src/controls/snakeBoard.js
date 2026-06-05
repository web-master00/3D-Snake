export function snakeBoard(count, cells, grid,boardBox) {
  grid.classList.add("grid");

  grid.style.gridTemplateColumns = `repeat(${count}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${count}, 1fr)`;

  for (let i = 0; i < count; i++) {
    for (let j = 0; j < count; j++) {
      const position = document.createElement("div");

      position.classList.add("cell");
      cells.push(position);

      grid.append(position);
    }
  }
  boardBox.append(grid);

  return grid;
}
