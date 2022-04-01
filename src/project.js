const Project = (name, todos) => {
    
    return {
        getName: () => name,
        getTodos: () => todos,
        addTodo: (newTodo) => todos.push(newTodo)
    }

}

export { Project }