import { Todo } from './todo'
import { Project } from './project'
import * as DOM from './DOMFunctions'

const Controller = (() => {

    const newProjectButton = document.querySelector('.new-project-button');
    const newProjectForm = document.querySelector('.new-project-form');
    const addProjectButton = document.querySelector('.add-project-button');
    const projectsCont = document.querySelector('.projects-cont');
    const projectHeading = document.querySelector('.project-heading')

    const newTodoButton = document.querySelector('.new-todo-button');
    const addTodoButton = document.querySelector('.add-todo-button');
    const newTodoForm = document.querySelector('.new-todo-form');
    const todoCont = document.querySelector('.todo-cont');
    const editTodoForm = document.querySelector('.edit-todo-form')

    const projects = [Project('Inbox', [])]
    projects[0].DOMElement = projectsCont.children[0];
    projects[0].DOMElement.classList.add('active')

    return {


        handleProjectChangeRequest: function(){
            document.addEventListener('click', (e) => {
                if(e.target.classList[0] === 'project'){

                    //Switching active project
                    const activeProj = document.querySelector('.active')
                    activeProj.classList.remove('active')
                    const targetLabel = e.target;
                    targetLabel.classList.add('active')

                    //Finding matching project
                    projects.forEach((project) => {
                        if (project.DOMElement === targetLabel) {

                            //Changing headline
                            projectHeading.textContent = project.getName();

                            //Clearing project's todo cont
                            DOM.clearHTML(todoCont)

                            //Gathering project's todos
                            const projectTodos = project.getTodos()
                            projectTodos.forEach((todo) => {
                                DOM.displayTodo(todoCont, todo.getTitle(), todo.getDescrip(), todo.getDueDate(), todo.getPriority())
                            })

                        }
                    })

                }
            })
        },

        handleNewProjectRequest: function(){
            newProjectButton.addEventListener('click', (e) => {
                DOM.switchDisplay(newProjectForm, 'block')
            })
        },

        handleAddProjectRequest: function(){
            addProjectButton.addEventListener('click', (e) => {

                let projectName = document.getElementById("project-name");

                if (projectName.value === ''){
                    alert('Project must have a name')
                } else {
                    const newProjectObj = Project(projectName.value, [])
                    const projectLabel = DOM.createProjLabel(newProjectObj.getName())
                    newProjectObj.DOMElement = projectLabel;
                    DOM.appendProjectLabel(projectsCont, newProjectObj.DOMElement)
                    projectName.value = '';
                    DOM.switchDisplay(newProjectForm, 'none')
                    projects.push(newProjectObj)
                }

            })
        },
        
        handleNewTodoRequest: function(){
            newTodoButton.addEventListener('click', (e) => {
                DOM.switchDisplay(newTodoForm, 'block')
            })
        },


        handleAddTodoRequest: function(){
            addTodoButton.addEventListener('click', (e) => {
                const todoTitle = document.getElementById("todo-title");

                if(todoTitle.value === ''){
                    alert('todo must have a title')
                } else {
                    const todoDescrip = document.getElementById("todo-descrip");
                    const todoDate = document.getElementById("todo-date");
                
                    const newTodo = Todo(todoTitle.value, todoDescrip.value, todoDate.value, '1')
                
                    DOM.displayTodo(todoCont, newTodo.getTitle(), newTodo.getDescrip(), newTodo.getDueDate(), newTodo.getPriority())
                    newTodo.DOMElement = todoCont.lastChild;
                    DOM.switchDisplay(newTodoForm, 'none')
                    const activeProj = document.querySelector('.active')

                    projects.forEach((project) => {
                        if (project.DOMElement === activeProj){
                            project.addTodo(newTodo)
                        }
                    })
                } 
            })

                //todoCont.append(newTodo)
                newTodoForm.style.display = 'none'
            
        },

        

        handleEditTodoRequest: function(){
            document.addEventListener('click', (e) => {
                if (e.target.className === 'edit-todo-link'){

                    //Selecting target todo container, clearing it's HTML, and displaying edit form
                    const targetTodoEl = e.target.parentNode
                    DOM.clearHTML(targetTodoEl)
                    targetTodoEl.append(editTodoForm)
                    DOM.switchDisplay(editTodoForm, 'block')

                    //Sorting through projects/todos to find target todo obj
                    const activeProj = document.querySelector('.active')
                    projects.forEach((project) => {
                        if(activeProj === project.DOMElement){
                            console.log(project)
                            const todos = project.getTodos()
                            todos.forEach((todo) => {
                                console.log(todo.getTitle())
                                if(targetTodoEl === todo.DOMElement){
                                    editTodoForm.children[2].value = todo.getTitle()
                                    editTodoForm.children[6].value = todo.getDescrip()
                                    editTodoForm.children[11].value = todo.getDueDate()
                                }
                            })
                        }
                    })
                } 
            })
        },

        handleUpdateTodoRequest: function(){
            document.addEventListener('click', (e) => {
                if (e.target.className === 'update-todo-button'){
                    //Turning form off
                    DOM.switchDisplay(editTodoForm, 'none');

                    //Selecting todo element
                    const targetTodoEl = e.target.parentNode.parentNode;
                    const targetTodoEditForm = e.target.parentNode;

                    //Selecting the active project and finding the match project obj
                    const activeProj = document.querySelector('.active');
                    projects.forEach((project) => {
                        if(activeProj === project.DOMElement){

                            //Gathering project todos and finding the matching todo
                            const todos = project.getTodos()
                            todos.forEach((todo) => {

                                console.log(todo.DOMElement)
                                if(targetTodoEl === todo.DOMElement){
                                    todo.editTitle(targetTodoEditForm.children[2].value)
                                    todo.editDescrip(targetTodoEditForm.children[6].value)
                                    todo.editDueDate(targetTodoEditForm.children[11].value)

                                    DOM.updateTodo(targetTodoEl, todo.getTitle(), todo.getDescrip(), todo.getDueDate(), todo.getPriority())
                                } else {
                                    console.log('could not find a matching todo')
                                }
                            })
                        }
                    })
                } 
            })
        }

    }
})();

export { Controller }