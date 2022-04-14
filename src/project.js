const Project = (name, todos) => {
    return {
        addTodo: function(title, descrip, date, priority){
            const todo = {
                id: todos.length > 0 ? todos[todos.length - 1].id +1 : 1,
                title,
                descrip,
                date,
                priority,
                complete: false
            }
            todos.push(todo)
        },

        editTodo: function(id, newTitle, newDescrip, newDate, newPriority){
            todos = todos.map((todo) => {
                    if (todo.id === id){
                        todo.id = id;
                        todo.title = newTitle;
                        todo.descrip = newDescrip;
                        todo.date = newDate;
                        todo.priority = newPriority;
                        return todo
                    } else {
                        return todo
                    }
            })
        },

        getTodos: function(){
            return todos
        },

        deleteTodo: function(id) {
            todos = todos.filter((todo) => todo.id !== id)
        },

        toggleTodo: function(id){
            todos = todos.map((todo) => {
                todo.id === id ? todo.complete = !todo.complete : todo
            })
        },

        todos,
        name
    }
}

/*
const testProj = Project('name', [])
testProj.addTodo('title', 'descrip', '04/04/22', 1)
testProj.editTodo(1, 'new title', 'new descrip', 'new date', 2)

*/

export { Project }