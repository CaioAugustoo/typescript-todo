import { STORAGE_KEY } from "../../constants/index.js";
export function getItemFromStorage() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY));
}
export function setItemInStorage(task) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(task));
}
