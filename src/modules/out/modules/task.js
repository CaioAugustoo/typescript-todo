import { STORAGE_KEY } from "../constants/index.js";
export class Task {
    constructor(form, wrapper, title, quantity) {
        this.tasks = [];
        this.form = document.querySelector(form);
        this.wrapper = document.querySelector(wrapper);
        this.title = document.querySelector(title);
        this.quantity = document.querySelector(quantity);
        this.bindEvents();
        this.events();
        this.getFromStorage();
    }
    create() {
        const task = {
            id: new Date().getTime(),
            title: this.title.value,
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
        if (!this.title.value.trim().length) {
            return false;
        }
        return true;
    }
    clearTitle() {
        this.title.value = "";
        this.title.focus();
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
        this.tasksQuantity();
        const clickedElement = e.target;
        clickedElement.parentElement.remove();
        return newTasks;
    }
    getFromStorage() {
        const taskInStorage = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        this.tasks = taskInStorage;
        this.tasks.forEach(task => this.renderDom(task));
        return taskInStorage;
    }
    tasksQuantity() {
        this.quantity.innerHTML = `Sua(s) ${this.tasks.length} tarefas:`;
    }
    renderDom(task) {
        this.createElement(task);
        this.addToDom(task);
        this.tasksQuantity();
        return task;
    }
    addToDom(task) {
        const createdElement = this.createElement(task);
        this.wrapper.appendChild(createdElement);
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
