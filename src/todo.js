const Todo = (title, descrip, dueDate, priority) => {

    return{
        getTitle: () => title,
        editTitle: newTitle => title = newTitle,
    
        getDescrip: () => descrip,
        editDescrip: newDescrip => descrip = newDescrip,
    
        getDueDate: () => dueDate,
        editDueDate: newDueDate => dueDate = newDueDate,
    
        getPriority: () => priority,
        editPriority: newPriority => priority = newPriority
    }
}

export { Todo }