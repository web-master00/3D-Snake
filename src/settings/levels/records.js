import { DEFAULT_RECORDS, KEY } from "../../utils/constants.js";

export function loadRecords() {
  const data = JSON.parse(localStorage.getItem(KEY));
  
  if (data) {
    return data;
  } else {
    return DEFAULT_RECORDS;
  }
}

export function saveRecords(records) {
  localStorage.setItem(KEY, JSON.stringify(records));
}
