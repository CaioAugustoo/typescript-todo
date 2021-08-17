import { STORAGE_KEY } from "../constants/index.js";
export class Task {
    constructor(form, taskWrapper, taskTitle) {
        this.tasks = [];
        this.form = document.querySelector(form);
        this.taskWrapper = document.querySelector(taskWrapper);
        this.taskTitle = document.querySelector(taskTitle);
        this.bindEvents();
        this.events();
        this.getStorageItems();
    }
    create() {
        const task = {
            id: new Date().getTime(),
            title: this.taskTitle.value,
            created_at: new Date(),
        };
        const isTaskTitleValid = this.validateTitle();
        if (!isTaskTitleValid)
            return;
        this.tasks.push(task);
        this.clearTitle();
        this.renderDom(task);
        this.saveInStorage();
    }
    saveInStorage() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tasks));
    }
    validateTitle() {
        if (!this.taskTitle.value.trim().length) {
            return false;
        }
        return true;
    }
    clearTitle() {
        this.taskTitle.value = "";
        this.taskTitle.focus();
    }
    createElement(task) {
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
    deleteTask(e, task) {
        const newTasks = this.tasks.filter(({ id }) => id !== task.id);
        this.tasks = newTasks;
        this.saveInStorage();
        const clickedElement = e.target;
        clickedElement.parentElement.remove();
        return newTasks;
    }
    getStorageItems() {
        const taskInStorage = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        this.tasks = taskInStorage;
        this.tasks.forEach(task => this.renderDom(task));
        return taskInStorage;
    }
    renderDom(task) {
        this.createElement(task);
        this.addToDom(task);
        return task;
    }
    addToDom(task) {
        const createdElement = this.createElement(task);
        this.taskWrapper.appendChild(createdElement);
        return task;
    }
    submitForm(event) {
        event.preventDefault();
        this.create();
    }
    bindEvents() {
        this.submitForm = this.submitForm.bind(this);
    }
    events() {
        this.form.addEventListener("submit", this.submitForm);
    }
}
