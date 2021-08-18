import {
  getItemFromStorage,
  setItemInStorage,
} from "../../utils/localStorage/index.js";

import { ITask } from "../../types/index";
import { validateInput } from "../../utils/validations/input.js";

export class Task {
  private form: HTMLFormElement;
  private title: HTMLInputElement;
  private wrapper: Element;
  private quantity: Element;

  private tasks: ITask[] = [];

  constructor(form: string, wrapper: string, title: string, quantity: string) {
    this.form = document.querySelector(form);
    this.wrapper = document.querySelector(wrapper);
    this.title = document.querySelector(title);
    this.quantity = document.querySelector(quantity);

    this.bindEvents();
    this.events();
    this.getFromStorage();
  }

  private create(): void {
    const task: ITask = {
      id: new Date().getTime(),
      title: this.title.value,
      created_at: new Date(),
    };

    const isTaskTitleValid = validateInput(this.title.value);
    if (!isTaskTitleValid) return;

    this.tasks.push(task);
    this.clearTitle();
    this.renderDom(task);
    this.saveInStorage();
  }

  private clearTitle(): void {
    this.title.value = "";
    this.title.focus();
  }

  private delete(e: MouseEvent, task: ITask): ITask[] {
    const newTasks = this.tasks.filter(({ id }) => id !== task.id);
    this.tasks = newTasks;

    this.saveInStorage();
    this.showQuantity();

    const clickedElement = e.target as HTMLElement;
    clickedElement.parentElement.remove();

    return newTasks;
  }

  private getFromStorage(): ITask[] {
    const taskInStorage = getItemFromStorage() || [];

    this.tasks = taskInStorage;
    this.tasks.forEach(task => this.renderDom(task));

    return taskInStorage;
  }

  private saveInStorage(): void {
    setItemInStorage(this.tasks);
  }

  private showQuantity(): void {
    this.quantity.innerHTML = `Sua(s) ${this.tasks.length} tarefas:`;
  }

  private createElement(task: ITask): HTMLDivElement {
    const taskWrapper = document.createElement("div");
    const taskTitle = document.createElement("h1");
    const taskButton = document.createElement("button");

    taskWrapper.classList.add("task");
    taskButton.classList.add("btn");

    taskWrapper.appendChild(taskTitle);
    taskWrapper.appendChild(taskButton);

    taskTitle.innerHTML = task.title;
    taskButton.innerText = "Deletar";

    taskButton.addEventListener("click", e => this.delete(e, task));

    return taskWrapper;
  }

  private renderDom(task: ITask): ITask {
    this.createElement(task);
    this.addToDom(task);
    this.showQuantity();

    return task;
  }

  private addToDom(task: ITask): ITask {
    const createdElement: HTMLDivElement = this.createElement(task);
    this.wrapper.appendChild(createdElement);

    return task;
  }

  private submitForm(event: Event): void {
    event.preventDefault();
    this.create();
  }

  private bindEvents(): void {
    this.submitForm = this.submitForm.bind(this);
  }

  private events(): void {
    this.form.addEventListener("submit", this.submitForm);
  }
}
