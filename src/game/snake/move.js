export function createSnake(count) {
  const center = Math.floor(count/2)
  return [
    { x: center, y: center },
    { x: center-1, y: center },
    { x: center-2, y: center },
  ];
}

export function moveSnake(head, snake, eat) {
  snake.unshift(head);

  if (!eat) {
    snake.pop();
  }
  return head;
}
