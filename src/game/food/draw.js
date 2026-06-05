export function drawFood(cells, state, count) {
  if (state.lastFood) {
    const lastInd = state.lastFood.y * count + state.lastFood.x;
    const lastCell = cells[lastInd];
    if (lastCell) {
      lastCell.classList.remove("food");
      lastCell.style.removeProperty("animation");
    }
  }

  const ind = state.food.y * count + state.food.x;
  const cell = cells[ind];
  if (cell) {
    cell.classList.add("food");
    cell.style.animation = "none";
    void cell.offsetWidth;
    cell.style.removeProperty("animation");
  }

  state.lastFood = { ...state.food };
}
