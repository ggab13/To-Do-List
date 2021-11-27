const projectFactory = (name) => {

    const toDos = []
    const getName = () => name
    const addTodo = (element) => toDos.push(element)
    const deleteTodo = (index) => toDos.splice(index,1)

    const getTodo = () => toDos

    return {
        getName,
        addTodo,
        getTodo,
        deleteTodo
    }
}

const toDoList = []
export default projectFactory;