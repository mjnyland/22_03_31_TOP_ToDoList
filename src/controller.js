import { Todo } from './todo'
import { Project } from './project'
import { clearHTML, createNewElement, displayTodo } from './DOMFunctions'

const Controller = (() => {

    const addTodoButton = document.querySelector('.add-todo');
    const todoCont = document.querySelector('.todo-cont');
    


    return {

        showTodoForm: function(){
            addTodoButton.addEventListener('click', (e) => {
                createNewElement()
            })
        },

        addTodo: function(){
            addTodoButton.addEventListener('click', (e) => {
                const newTodo = displayTodo('Do this thing', 'By 03/22/2022 at 8:00PM', 'this is a descripton');
                todoCont.append(newTodo)
            })
        }

    }

})();

export { Controller }