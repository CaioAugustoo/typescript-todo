export class todos {
    constructor() {
        this.form = document.querySelector("form");
        this.search = document.querySelector("input");
        this.wrapper = document.querySelector("section");
        this.init();
    }
    addTask() {
        const tasks = JSON.parse(localStorage.getItem("@todos:TODO")) || [];
        const task = {
            id: new Date().getTime(),
            title: this.search.value,
        };
        tasks.push(task);
        localStorage.setItem("@todos:TODO", JSON.stringify(tasks));
        if (tasks.title)
            return tasks;
    }
    listTasks() {
        const tasks = this.addTask();
        tasks.map(task => console.log(task));
    }
    events() {
        this.form.addEventListener("submit", this.addTask);
    }
    bindEvents() {
        this.addTask = this.addTask.bind(this);
    }
    init() {
        this.bindEvents();
        this.events();
        this.listTasks();
    }
}
