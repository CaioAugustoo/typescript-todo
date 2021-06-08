export class todos {
    constructor() {
        this.form = document.querySelector("form");
        this.search = document.querySelector("input");
        this.wrapper = document.querySelector("section");
        this.init();
    }
    addTask(e) {
        e.preventDefault();
        const tasks = JSON.parse(localStorage.getItem("@todos:TODO")) || [];
        const task = {
            id: new Date().getTime(),
            title: this.search.value,
        };
        tasks.push(task);
        localStorage.setItem("@todos:TODO", JSON.stringify(tasks));
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
    }
}
