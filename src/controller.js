import { Todo } from './todo'
import { Project } from './project'
import * as DOM from './DOMFunctions'

const Controller = (() => {

    const newProjectButton = document.querySelector('.new-project-button-cont');
    const newProjectForm = document.querySelector('.new-project-form');
    const addProjectButton = document.querySelector('.add-project-button');
    const projectsCont = document.querySelector('.projects-cont');
    const todosCont = document.querySelector('.todos-cont');
    const projectHeading = document.querySelector('.project-heading');

    const newTodoButton = document.querySelector('.new-todo-button');
    const newTodoForm = document.querySelector('.new-todo-form');
    const editTodoForm = document.querySelector('.todo-edit-form')

    let projects = []

    return {

        findMatchProj: function(elementID){
            const int = parseInt(elementID);
            for (const project of projects){
                if (project.id === int){
                    return project
                }
            }
        },

        loadTodos: function(cont, obj, arr){
            DOM.clearHTML(cont)
            DOM.displayTodos(obj)
            DOM.resetLocalStorage(arr)  
        },

        handlePageLoad: function(){

            //check local storage
            if(localStorage.length > 0){

                const storedData = JSON.parse(localStorage.getItem('projects'));

                //for each stored project
                storedData.stored.forEach(project => {

                    //create a new project
                    const loadedProject = Project(project.name, project.todos);
                    loadedProject.id = project.id;

                    //add to projects array
                    projects.push(loadedProject);

                    //display project label
                    DOM.displayProjLabel(loadedProject.name, loadedProject.id);
                })

                //grab active id from storage and grab matching project obj
                const activeId = parseInt(localStorage.getItem('active'));
                const activeObj = this.findMatchProj(activeId);

                //display active obj
                projectsCont.children[activeId].classList.add('active');
                projectHeading.textContent = activeObj.name;
                DOM.displayTodos(activeObj);

            } else {
                //create inbox and display it
                projects = [Project('Inbox', [])];
                projects[0].id = 0;
                DOM.displayProjLabel(projects[0].name, projects[0].id);
                document.querySelector('.project').classList.add('active');
            }
        },

        handleNewProjectRequest: function(){
            newProjectButton.addEventListener('click', (e) => {
                DOM.switchDisplay(newProjectForm, 'block')
            })
        },

        handleAddProjectRequest: function(){
            addProjectButton.addEventListener('click', (e) => {
                const projectName = document.getElementById("project-name");

                if (projectName.value === ''){
                    alert('Project must have a name')
                } else {
                    const newProjectObj = Project(projectName.value, [])
                    projects.push(newProjectObj);
                    newProjectObj.id = projects.length - 1;

                    DOM.switchDisplay(newProjectForm, 'none');
                    DOM.displayProjLabel(projectName.value, newProjectObj.id);
                    DOM.resetLocalStorage(projects)
                }
            })
        },

        handleProjectChangeRequest: function(){
            document.addEventListener('click', (e) => {
                if(e.target.classList[0] === 'project'){

                    //Switching active class
                    const currActive = document.querySelector('.active');
                    DOM.switchActive(currActive, e.target);

                    //Matching target with obj
                    const proj = this.findMatchProj(e.target.classList[1])

                    //Displaying obj
                    projectHeading.textContent = proj.name;
                    this.loadTodos(todosCont, proj, projects)
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

                if(todoTitle){
                    //Getting project and adding todo to project
                    const currActive = document.querySelector('.active');
                    const proj = this.findMatchProj(currActive.classList[1]);
                    proj.addTodo(todoTitle, todoDescrip, todoDate, 1);

                    this.loadTodos(todosCont, proj, projects);
                    DOM.clearFormData(newTodoForm);
                } else{
                    alert('todo must have a title :)')
                }
            })
        },

        handleEditTodoRequest: function(){
            document.addEventListener('click', (e) => {
                if (e.target.className === 'edit-todo-link'){

                    const todoInfoCont = e.target.parentNode.parentNode;
                    const todoCont = todoInfoCont.parentNode;
                    const editTodoForm = todoCont.children[1];

                    DOM.populateEditForm(editTodoForm, todoInfoCont);
                    DOM.switchDisplay(todoInfoCont, 'none');
                    DOM.switchDisplay(editTodoForm, 'grid');      
                    
                } 
            })
        },

        handleUpdateTodoRequest: function(){
            document.addEventListener('click', (e) => {
                if (e.target.className === 'edit-todo-form-button'){

                    //Orienting the DOM
                    const editTodoForm = e.target.parentNode;
                    const todoCont = editTodoForm.parentNode;

                    //Selecting active project obj
                    let activeProj = document.querySelector('.active');
                    let projObj = this.findMatchProj(activeProj.classList[1])

                    //Find Todo and update it with form data
                    projObj.editTodo(parseInt(todoCont.classList[1]), editTodoForm.children[1].value, editTodoForm.children[3].value, editTodoForm.children[5].value)

                    //Turning form off
                    DOM.switchDisplay(editTodoForm, 'none');

                    this.loadTodos(todosCont, projObj, projects);
                }
            })
        },

        handleDeleteTodoRequest: function(){
            document.addEventListener('click', (e) => {
                if(e.target.className === 'delete-todo-link'){
                    console.log('delete')

                    //find match obj and todo
                    const currActive = document.querySelector('.active');
                    const proj = this.findMatchProj(currActive.classList[1]);
                    const targetTodoId = parseInt(e.target.parentNode.parentNode.parentNode.classList[1]);

                    //remove todo obj from project
                    proj.deleteTodo(targetTodoId);

                    //display project

                    this.loadTodos(todosCont, proj, projects)

                    /*
                    console.log(proj.getTodos())
                    const storedData = JSON.parse(localStorage.getItem('projects'));
                    storedData.stored.forEach(project => {
                        console.log(project.todos)
                    })
                    */
                }
            })
        },

        handleCheckboxClick: function(){
            document.addEventListener('click', (e) => {
                const todoCheckbox = document.querySelector('.todo-checkbox');
                if(e.target.className === 'todo-checkbox'){
                    if(todoCheckbox.style.backgroundColor === '#FFF'){
                        console.log('switch to purp')
                        todoCheckbox.style.backgroundColor = 'var(--darkPurp)'
                    } else {
                        console.log('switch to white')
                        todoCheckbox.style.backgroundColor = '#FFF'
                    }
                }
            })
        },

        instantiateWebsite: function(){
            Controller.handlePageLoad()
            Controller.handleProjectChangeRequest()
            Controller.handleNewProjectRequest()
            Controller.handleAddProjectRequest()
            Controller.handleNewTodoRequest()
            Controller.handleAddTodoRequest()
            Controller.handleEditTodoRequest()
            Controller.handleUpdateTodoRequest()
            Controller.handleDeleteTodoRequest()
            Controller.handleCheckboxClick()
        }


    }
})();

export { Controller }