export function createElement(task) {
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
