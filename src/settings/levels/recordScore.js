import { loadRecords } from "./records.js";
import { loadLevel } from "./storage.js";

export function recordScores(records, level, recordScore) {
  recordScore.textContent = records[level];
}

const records = loadRecords();
const savedLevel = loadLevel()
const recordScore = document.querySelector(".recordScoreNum");

if (recordScore) {
  recordScores(records, savedLevel, recordScore);
}