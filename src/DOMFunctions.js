function clearHTML(el) {
    while(el.firstChild) {
        el.removeChild(el.firstChild)
    }
}

function createNewElement(el, className, textContent){
    const newEl = document.createElement(el, className)
    className ? newEl.classList.add(className) : null;
    textContent ? newEl.textContent = textContent : null;

    return newEl
}

function displayTodo(cont, title, date, descrip){
    const newTodo = createNewElement('DIV', 'todo');
    const todoCheckbox = createNewElement('INPUT', 'todo-checkbox');
    todoCheckbox.type = "checkbox"
    const todoTitle = createNewElement('H3', 'todo-title', title);
    const todoDate = createNewElement('H4', 'todo-date', date);
    const todoDescrip = createNewElement('P', 'todo-descrip', descrip);
    const todoHR = createNewElement('HR', 'todo-hr')

    const editLink = createNewElement('H5', 'edit-todo-link', 'Edit todo')

    newTodo.append(todoCheckbox, todoTitle, todoDate, todoDescrip, editLink, todoHR)

    cont.append(newTodo)

}

function updateTodo(todoCont, title, date, descrip){
    console.log('Updating todo')
    const todoCheckbox = createNewElement('INPUT', 'todo-checkbox');
    todoCheckbox.type = "checkbox"
    const todoTitle = createNewElement('H3', 'todo-title', title);
    const todoDate = createNewElement('H4', 'todo-date', date);
    const todoDescrip = createNewElement('P', 'todo-descrip', descrip);
    const todoHR = createNewElement('HR', 'todo-hr')
    const editLink = createNewElement('H5', 'edit-todo-link', 'Edit todo')
    todoCont.append(todoCheckbox, todoTitle, todoDate, todoDescrip, editLink, todoHR)
}

function createProjLabel(name){
    const newProject = createNewElement('DIV', 'project');
    const projectName = createNewElement('H3', 'project-label', name);

    newProject.append(projectName)
    newProject.classList.add(name)

    return newProject;
}

function appendProjectLabel(cont, label){
    cont.append(label)
}

function switchDisplay(el, newDisplay){
    el.style.display = newDisplay
}

export { clearHTML, createNewElement, displayTodo, updateTodo, appendProjectLabel, switchDisplay, createProjLabel }