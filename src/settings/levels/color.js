export function setLevelColor(current,next,grid){
  if(current){
    grid.classList.remove("level-" + current)
  }
  grid.classList.add("level-" + next)
}