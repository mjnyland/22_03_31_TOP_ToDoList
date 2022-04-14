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

function displayTodos(proj){
    const todosCont = document.querySelector('.todos-cont');
    proj.getTodos().forEach((todo) => {
        displayTodo(todosCont, todo.id, todo.title, todo.date, todo.descrip)
    })
}

function displayTodo(cont, id, title, date, descrip){
    const newTodo = createNewElement('DIV', 'todo');
    newTodo.classList.add(id)

    //Info
    const todoInfoCont = createNewElement('DIV', 'todo-info-cont');

    const todoCheckbox = createNewElement('INPUT', 'todo-checkbox');
    todoCheckbox.type = "checkbox"
    const todoTitle = createNewElement('H3', 'todo-title', title);
    const todoDate = createNewElement('H4', 'todo-date', date);
    const todoDescrip = createNewElement('P', 'todo-descrip', descrip);
    const editLink = createNewElement('H5', 'edit-todo-link', 'Edit todo')

    todoInfoCont.append(todoCheckbox, todoTitle, todoDate, todoDescrip, editLink)

    //Edit Form
    const todoEditFormCont = createNewElement('DIV', 'todo-edit-form-cont');

    const editTitleInput = createNewElement('INPUT', 'edit-title-input');
    editTitleInput.id = 'edit-todo-title';
    editTitleInput.setAttribute('type', 'text');

    const editTitleLabel = createNewElement('LABEL', 'edit-title-label');
    editTitleLabel.htmlFor = 'edit-todo-title';
    editTitleLabel.textContent = 'Title:'

    const editDescripInput = createNewElement('INPUT', 'edit-descrip-input');
    editDescripInput.id = 'edit-todo-descrip';
    editDescripInput.setAttribute('type', 'text');

    const editDescripLabel = createNewElement('LABEL', 'edit-descrip-label');
    editDescripLabel.htmlFor = 'edit-todo-description';
    editDescripLabel.textContent = 'Description:';

    const editDateInput = createNewElement('INPUT', 'edit-date-input');
    editDateInput.id = 'edit-todo-date';
    editDateInput.setAttribute('type', 'text');

    const editDateLabel = createNewElement('LABEL', 'edit-date-label');
    editDateLabel.htmlFor = 'edit-todo-date';
    editDateLabel.textContent = 'Date:';

    const editTodoFormButton = createNewElement('BUTTON', 'edit-todo-form-button', 'Update Todo')

    todoEditFormCont.append(editTitleLabel, editTitleInput, editDescripLabel, editDescripInput, editDateLabel, editDateInput, editTodoFormButton);

    //HR
    const todoHR = createNewElement('HR', 'todo-hr')

    //Assembling todo
    newTodo.append(todoInfoCont, todoEditFormCont, todoHR)

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

function switchActive(currActive, newActive){
    currActive.classList.remove('active');
    newActive.classList.add('active');
}

function displayProjLabel(name, id){
    const projectsCont = document.querySelector('.projects-cont');
    const newProject = createNewElement('DIV', 'project');
    const projectName = createNewElement('H3', 'project-label', name);
    newProject.classList.add(id)

    newProject.append(projectName)

    projectsCont.append(newProject)
}

function appendProjectLabel(cont, label){
    cont.append(label)
}

function switchDisplay(el, newDisplay){
    el.style.display = newDisplay
}

function populateEditForm(form, todo){
    form.children[1].value = todo.children[1].textContent; //title
    form.children[3].value = todo.children[3].textContent; //descrip
    form.children[5].value = todo.children[2].textContent;  //date
}

function clearFormData(form){
    for (const child of form.children){
        child.nodeName === 'INPUT' ? child.value = '' : null;
    }
}

export { clearHTML, createNewElement, displayTodo, updateTodo, appendProjectLabel, switchDisplay, displayProjLabel, switchActive, displayTodos, populateEditForm, clearFormData }