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
                    DOM.switchDisplay(newTodoForm, 'none')
                    const activeProj = document.querySelector('.active')

                    projects.forEach((project) => {
                        if (project.DOMElement === activeProj){
                            console.log(project)
                            project.addTodo(newTodo)
                        }
                    })
                }
                
            })

                //todoCont.append(newTodo)
                newTodoForm.style.display = 'none'
            
        }

    }

})();

export { Controller }