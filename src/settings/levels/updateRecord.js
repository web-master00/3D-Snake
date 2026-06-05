import { saveRecords } from "./records.js";

export function updateRecord(records, level, score) {
  if (score > records[level]) {
    records[level] = score;
    saveRecords(records);
  }
}
