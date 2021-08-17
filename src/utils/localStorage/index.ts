import { STORAGE_KEY } from "../../constants/index.js";
import { ITask } from "../../types/index";

export function getItemFromStorage(): ITask[] {
  return JSON.parse(localStorage.getItem(STORAGE_KEY));
}

export function setItemInStorage(task: ITask[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(task));
}
