import { Task } from "../types/index";

const form = document.querySelector("form");
const input = document.querySelector("input");
const wrapper = document.querySelector("section");
const quantity = document.querySelector(".tasks__quantity");

const savedTasks: Task[] = JSON.parse(localStorage.getItem("@todos"));

function clearInputValue() {
  input.value = "";
  input.focus();

  return;
}

function saveTaskInLocalStorage(todos: Task[]) {
  return localStorage.setItem("@todos", JSON.stringify(todos));
}

function saveTask(e: { preventDefault: () => void }) {
  e.preventDefault();
  const todos = savedTasks || [];

  if (!input.value.trim().length) return;

  const newTask: Task = {
    id: new Date().getTime(),
    title: input.value,
  };

  todos.push(newTask);

  saveTaskInLocalStorage(todos);
  createTask(newTask);
  clearInputValue();

  return todos;
}

form.addEventListener("submit", saveTask);

function createTask(task: Task) {
  const element = document.createElement("div");
  const taskTitle = document.createElement("h1");

  element.classList.add("task");
  taskTitle.innerHTML = task.title;

  element.appendChild(taskTitle);
  wrapper.appendChild(element);

  quantity.innerHTML = `Suas ${savedTasks.length} tarefas:`;

  return element;
}

function listTasks() {
  if (!savedTasks) return;
  savedTasks.map(task => createTask(task));
}

listTasks();
