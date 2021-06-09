const form = document.querySelector("form");
const input = document.querySelector("input");
const wrapper = document.querySelector("section");
const savedTasks = JSON.parse(localStorage.getItem("@todos"));
function clearInputValue() {
    input.value = "";
    input.focus();
}
function saveTaskInLocalStorage(todos) {
    localStorage.setItem("@todos", JSON.stringify(todos));
}
function saveTask(e) {
    e.preventDefault();
    const todos = savedTasks || [];
    if (!input.value.trim().length)
        return;
    const newTask = {
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
function createTask(task) {
    const element = document.createElement("div");
    element.classList.add("task");
    const taskTitle = document.createElement("h1");
    element.appendChild(taskTitle);
    taskTitle.innerHTML = task.title;
    wrapper.appendChild(element);
}
function listTasks() {
    if (!savedTasks)
        return;
    savedTasks.map(todo => {
        createTask(todo);
    });
}
listTasks();
