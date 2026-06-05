import { LEVELS } from "./data.js";

export function isUnlocked(level,records){
  switch(level){
    case "easy" : 
      return true;
    case "medium" : 
      return records.easy >= LEVELS.medium.unlockScore;
    case "hard" : 
      return records.medium >= LEVELS.hard.unlockScore
  }
}
