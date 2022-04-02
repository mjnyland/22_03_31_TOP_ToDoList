function clearHTML(el){
    while(el.firstChild){
        el.remove(el.firstChild)
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

    newTodo.append(todoCheckbox, todoTitle, todoDate, todoDescrip, todoHR)

    cont.append(newTodo)

}

function displayProjectName(cont, name){
    const newProject = createNewElement('DIV', 'project');
    const projectName = createNewElement('H3', 'project-label', name);

    newProject.append(projectName)

    cont.append(newProject)

}

function displayProject(project){

}

function switchDisplay(el, newDisplay){
    el.style.display = newDisplay
}

export { clearHTML, createNewElement, displayTodo, displayProjectName, switchDisplay }