export function setActiveLevel(current,next){
  if(current){
    current.classList.remove("active");
  }
  next.classList.add("active");
  return next;
}
