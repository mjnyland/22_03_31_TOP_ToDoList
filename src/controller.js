import { Todo } from './todo'
import { Project } from './project'
import * as DOM from './DOMFunctions'

const Controller = (() => {

    const newProjectButton = document.querySelector('.new-project-button');
    const newProjectForm = document.querySelector('.new-project-form');
    const addProjectButton = document.querySelector('.add-project-button');
    const projectsCont = document.querySelector('.projects-cont');

    const newTodoButton = document.querySelector('.new-todo-button');
    const addTodoButton = document.querySelector('.add-todo-button');
    const newTodoForm = document.querySelector('.new-todo-form');
    const todoCont = document.querySelector('.todo-cont');

    const projects = [Project('Inbox', [])]

    return {


        handleProjectChangeRequest: function(){
            document.addEventListener('click', (e) => {
                if(e.target.className === 'project-label'){
                    const targetLabel = e.target;
                    console.log(projects)

                }
            })
        },

        handleNewProjectRequest: function(){
            newProjectButton.addEventListener('click', (e) => {
                DOM.switchDisplay(newProjectForm, 'block')
            })
        },

        //Here

        handleAddProjectRequest: function(){
            addProjectButton.addEventListener('click', (e) => {

                let projectName = document.getElementById("project-name");

                if (projectName.value === ''){
                    alert('Project must have a name')
                } else {
                    const newProjectObj = Project(projectName.value, [])

                    DOM.displayProjectName(projectsCont, newProjectObj.getName())

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

        //Here

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
                    DOM.switchDisplay(newTodoForm, 'none')
                }
                
            })

                //todoCont.append(newTodo)
                newTodoForm.style.display = 'none'
            
        }

    }

})();

export { Controller }