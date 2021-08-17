import { STORAGE_KEY } from "../constants/index.js";
import { ITask } from "../types/index.js";

export class Task {
  private form: HTMLFormElement;
  private tasks: ITask[] = [];
  private taskWrapper: Element;
  private taskTitle: HTMLInputElement;

  constructor(form: string, taskWrapper: string, taskTitle: string) {
    this.form = document.querySelector(form);
    this.taskWrapper = document.querySelector(taskWrapper);
    this.taskTitle = document.querySelector(taskTitle);

    this.bindEvents();
    this.events();
    this.getStorageItems();
  }

  private create(): void {
    const task: ITask = {
      id: new Date().getTime(),
      title: this.taskTitle.value,
      created_at: new Date(),
    };

    const isTaskTitleValid = this.validateTitle();
    if (!isTaskTitleValid) return;

    this.tasks.push(task);
    this.clearTitle();
    this.renderDom(task);
    this.saveInStorage();
  }

  private saveInStorage(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tasks));
  }

  private validateTitle(): boolean {
    if (!this.taskTitle.value.trim().length) {
      return false;
    }
    return true;
  }

  private clearTitle(): void {
    this.taskTitle.value = "";
    this.taskTitle.focus();
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

    taskButton.addEventListener("click", e => this.deleteTask(e, task));

    return taskWrapper;
  }

  private deleteTask(e: MouseEvent, task: ITask): ITask[] {
    const newTasks = this.tasks.filter(({ id }) => id !== task.id);
    this.tasks = newTasks;

    this.saveInStorage();

    const clickedElement = e.target as HTMLElement;
    clickedElement.parentElement.remove();

    return newTasks;
  }

  private getStorageItems(): ITask[] {
    const taskInStorage: ITask[] =
      JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    this.tasks = taskInStorage;
    this.tasks.forEach(task => this.renderDom(task));

    return taskInStorage;
  }

  private renderDom(task: ITask): ITask {
    this.createElement(task);
    this.addToDom(task);

    return task;
  }

  private addToDom(task: ITask): ITask {
    const createdElement: HTMLDivElement = this.createElement(task);
    this.taskWrapper.appendChild(createdElement);

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
