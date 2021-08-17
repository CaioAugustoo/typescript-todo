import { getItemFromStorage, setItemInStorage, } from "../../utils/localStorage/index.js";
import { validateInput } from "../../utils/validations/input.js";
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
        const isTaskTitleValid = validateInput(this.title.value);
        if (!isTaskTitleValid)
            return;
        this.tasks.push(task);
        this.clearTitle();
        this.renderDom(task);
        this.saveInStorage();
    }
    clearTitle() {
        this.title.value = "";
        this.title.focus();
    }
    delete(e, task) {
        const newTasks = this.tasks.filter(({ id }) => id !== task.id);
        this.tasks = newTasks;
        this.saveInStorage();
        this.showQuantity();
        const clickedElement = e.target;
        clickedElement.parentElement.remove();
        return newTasks;
    }
    getFromStorage() {
        const taskInStorage = getItemFromStorage() || [];
        this.tasks = taskInStorage;
        this.tasks.forEach(task => this.renderDom(task));
        return taskInStorage;
    }
    saveInStorage() {
        setItemInStorage(this.tasks);
    }
    showQuantity() {
        this.quantity.innerHTML = `Sua(s) ${this.tasks.length} tarefas:`;
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
        taskButton.addEventListener("click", e => this.delete(e, task));
        return taskWrapper;
    }
    renderDom(task) {
        this.createElement(task);
        this.addToDom(task);
        this.showQuantity();
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
