const todoFactory = (title, description, dueDate, priority) => {

    
   let done = false;

    const getTitle = () => title
    const getDescription = () => description
    const getDueDate = () => new Date(dueDate)
    const getPriority = () => priority
    const getDone = () => done
    const setDone = () =>  done = !done;

    return {
        getTitle,
        getDescription,
        getDueDate,
        getPriority,
        getDone,
        setDone
    }
}

export default todoFactory;