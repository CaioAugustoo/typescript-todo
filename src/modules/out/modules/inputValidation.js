export function validateInput(field) {
    if (!field.value.trim().length) {
        console.error("Título da tarefa não pode estar vazio.");
        applyErrorStyle(field);
        return false;
    }
    handleChange(field);
    return true;
}
