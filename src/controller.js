import { Todo } from './todo'
import { Project } from './project'
import * as DOM from './DOMFunctions'

const Controller = (() => {

    const newProjectButton = document.querySelector('.new-project-button');
    const newProjectForm = document.querySelector('.new-project-form');
    const addProjectButton = document.querySelector('.add-project-button');
    const projectsCont = document.querySelector('.projects-cont');
    const todosCont = document.querySelector('.todos-cont');

    const newTodoButton = document.querySelector('.new-todo-button');
    const newTodoForm = document.querySelector('.new-todo-form');
    const editTodoForm = document.querySelector('.todo-edit-form')

    const projects = [Project('Inbox', [])]
    projectsCont.children[0].classList.add('0')
    projectsCont.children[0].classList.add('active');
    projects[0].id = 0;

    return {

        findMatchProj: function(elementID){
            const int = parseInt(elementID);
            for (const project of projects){
                if (project.id === int){
                    return project
                }
            }
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
                    projects.push(newProjectObj);
                    newProjectObj.id = projects.length - 1;
                    DOM.switchDisplay(newProjectForm, 'none');
                    DOM.displayProjLabel(projectName.value, projects.length - 1);
                }
            })
        },

        handleProjectChangeRequest: function(){
            const projectHeading = document.querySelector('.project-heading');
            document.addEventListener('click', (e) => {
                if(e.target.classList[0] === 'project'){
                    //Switching active class
                    const currActive = document.querySelector('.active');
                    DOM.switchActive(currActive, e.target);
                    //Matching target with obj
                    const proj = this.findMatchProj(e.target.classList[1])
                    //Displaying obj
                    projectHeading.textContent = proj.name;
                    DOM.clearHTML(todosCont)
                    DOM.displayTodos(proj)
                }
            })
        },
        
        handleNewTodoRequest: function(){
            newTodoButton.addEventListener('click', (e) => {
                DOM.switchDisplay(newTodoForm, 'block')
            })
        },


        handleAddTodoRequest: function(proj){
            const addTodoButton = document.querySelector('.add-todo-button');
            addTodoButton.addEventListener('click', (e) => {
                //Hiding form
                DOM.switchDisplay(newTodoForm, 'none');

                //Gathering data
                const todoTitle = document.getElementById('todo-title').value;
                const todoDescrip = document.getElementById('todo-descrip').value;
                const todoDate = document.getElementById('todo-date').value;
                
                //Getting project and adding todo to project
                const currActive = document.querySelector('.active');
                const proj = this.findMatchProj(currActive.classList[1])
                proj.addTodo(todoTitle, todoDescrip, todoDate, 1)
                console.log(proj.todos)
                DOM.clearHTML(todosCont)
                DOM.displayTodos(proj)
                DOM.clearFormData(newTodoForm)
            })
            //Selecting form elements
        },

        handleEditTodoRequest: function(){
            document.addEventListener('click', (e) => {
                if (e.target.className === 'edit-todo-link'){

                    const todoInfoCont = e.target.parentNode;
                    const todoCont = todoInfoCont.parentNode;
                    const editTodoForm = todoCont.children[1];

                    DOM.populateEditForm(editTodoForm, todoInfoCont);
                    DOM.switchDisplay(todoInfoCont, 'none');
                    DOM.switchDisplay(editTodoForm, 'block');      
                    
                } 
            })
        },

        handleUpdateTodoRequest: function(){
            document.addEventListener('click', (e) => {
                if (e.target.className === 'edit-todo-form-button'){

                    //Orienting the DOM

                    const editTodoForm = e.target.parentNode;
                    const todoCont = editTodoForm.parentNode;
                    const todoInfoCont = todoCont.children[0];

                    //Selecting active project obj
                    let activeProj = document.querySelector('.active');
                    let projObj = this.findMatchProj(activeProj.classList[1])
                    //Find Todo and update it with form data
                    projObj.editTodo(parseInt(todoCont.classList[1]), editTodoForm.children[1].value, editTodoForm.children[3].value, editTodoForm.children[5].value)

                    
                    //Turning form off

                    DOM.switchDisplay(editTodoForm, 'none');
                    DOM.clearHTML(todosCont);
                    DOM.displayTodos(projObj);
                } 
            })
        }


    }
})();

export { Controller }