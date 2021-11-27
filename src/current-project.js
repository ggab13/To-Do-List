import todoFactory from './todo-factory';
import {
    addTodo,
    getTodo
} from './project-factory';
import {
    exportProjects
} from './project-creator'
import {
    createElement,
    createLabel
} from './render-page';
import {
    create,
    get,
    indexOf
} from 'lodash';
import { compareAsc, format } from 'date-fns';
//Hogy frissítse mindig időben a dolgokat? Mert így egy állapotnál megragad
// Hogy a faszba exportáljak egy function ami egy functionon belül van? :( 
//Ha valami classos elnevezésű hogy a legjobb rá a referencia? ahogy lentebb csináltam így ok?
const projects = exportProjects()

export default function currentProject() {
    const body = document.getElementsByTagName('body')[0]
    const overlayAdd = createElement('div', 'id', 'overlay')
    body.appendChild(overlayAdd)
    const currentProjectContent = document.getElementsByClassName('current-project')[0]
    const currentProjectContainer = document.getElementById('current-project__container')
    const button = document.getElementById('current-project__add')
    const currentProjectName = document.querySelector("#main-content > div.current-project > h2")
    currentProjectContent.appendChild(TodoModal())



    function TodoModal() {
        const divModal = createElement('div', 'id', 'addTodo')
        const divTodoModal = createElement('div', 'class', 'addTodo__content')

        const h2 = createElement('h2', 'class', 'addTodo__project-name')
        const nameLabel = createLabel('addTodo__name', 'Name')
        const nameInput = createElement('input', 'id', 'addTodo__name')
        const descLabel = createLabel('addTodo__desc', 'Description')
        const descInput = createElement('input', 'id', 'addTodo__desc')
        const dueLabel = createLabel('addTodo__due', 'Due Date')
        const dueInput = createElement('input', 'id', 'addTodo__due')
        const priorityLabel = createLabel('addTodo__prio', 'Priority')
        const priorityInput = createElement('div', 'id', 'addTodo__prio')



        dueInput.type = "date";
        const lowPrioLabel = createLabel('low-prio', '')
        const lowPrioIn = createElement('input', 'id', 'low-prio')
        const lowPrioImg = createElement('img', 'id', 'low-pic')

        const medPrioLabel = createLabel('med-prio', '')
        const medPrioIn = createElement('input', 'id', 'med-prio')
        const medPrioImg = createElement('img', 'id', 'med-pic')

        const highPrioLabel = createLabel('high-prio', '')
        const highPrioIn = createElement('input', 'id', 'high-prio')
        const highPrioImg = createElement('img', 'id', 'high-pic')

        lowPrioIn.type = 'radio'
        medPrioIn.type = 'radio'
        highPrioIn.type = 'radio'

        priorityInput.appendChild(lowPrioLabel)
        lowPrioLabel.appendChild(lowPrioIn)
        lowPrioLabel.appendChild(lowPrioImg)

        priorityInput.appendChild(medPrioLabel)
        medPrioLabel.appendChild(medPrioIn)
        medPrioLabel.appendChild(medPrioImg)

        priorityInput.appendChild(highPrioLabel)
        highPrioLabel.appendChild(highPrioIn)
        highPrioLabel.appendChild(highPrioImg)


        const closeModal = createElement('button', 'class', 'addTodo__close')
        closeModal.innerHTML = 'Save'
        h2.innerHTML = 'Todo'
        divTodoModal.appendChild(h2)
        divTodoModal.appendChild(nameLabel)
        divTodoModal.appendChild(nameInput)
        divTodoModal.appendChild(descLabel)
        divTodoModal.appendChild(descInput)
        divTodoModal.appendChild(dueLabel)
        divTodoModal.appendChild(dueInput)
        divTodoModal.appendChild(priorityLabel)
        divTodoModal.appendChild(priorityInput)

        divTodoModal.appendChild(closeModal)
        divModal.appendChild(divTodoModal)

        return divModal;
    }


    function getCurrentProject() {
        const found = projects.find(element => element.getName() == currentProjectName.innerHTML)
        return found;
    }

    function getCurrendIndex() {
        return projects.indexOf(getCurrentProject())
    }

    function getTodos() {
        return projects[getCurrendIndex()].getTodo();
    }

    function addCurrentProjectToDom(todoList, div) {
        div.innerHTML = ""
        for (let index = 0; index < todoList.length; index++) {
            const todo = todoList[index];

            const todoElement = createElement('div', 'class', 'todo-element')
            const todoMain = createElement('div', 'class', 'todo-element--main')
            const todoName = createElement('p', 'class', `todo-element__name`)
            const todoDue = createElement('p', 'class', `todo-element__due`)
            const pic = `${todo.getPriority()}`
            const todoPrio = createElement('img', 'id', `todo-element__${pic}`)
            todoName.innerHTML = `${todo.getTitle()}`
            todoDue.innerHTML = `Due Date : ` + `${format(todo.getDueDate(),"MM/dd/yyyy")}`


            const todoEdit = createElement('div', 'class', 'todo-element--main__edit')
            const toDoDone = createElement('input', 'class', 'todo-element__done')
            const toDoDoneLabel = createLabel('todo-element__done', 'Done')
            toDoDone.type = 'checkbox'

            toDoDone.checked = todo.getDone()
            const toDoDelete = createElement('img', 'class', 'todo-element__delete')

            const todoCollapse = createElement('div', 'class', 'todo-element--collapse')
            const todoDesc = createElement('p', 'class', `todo-element__desc`)
            todoDesc.innerHTML = `Description: ` + `${todo.getDescription()}`

            if (toDoDone.checked == false) {

                todoName.style.textDecoration = "none";
                todoDue.style.textDecoration = "none";
                todoDesc.style.textDecoration = "none";
            } else {
                todoName.style.textDecoration = "line-through";
                todoDue.style.textDecoration = "line-through";
                todoDesc.style.textDecoration = "line-through";

            }

            todoMain.appendChild(todoName)
            todoMain.appendChild(todoDue)
            todoMain.appendChild(todoPrio)

            todoCollapse.appendChild(todoDesc)
            todoEdit.appendChild(toDoDone)
            todoEdit.appendChild(toDoDoneLabel)
            todoEdit.appendChild(toDoDelete)

            todoCollapse.style.display = "none";
            todoMain.appendChild(todoEdit)
            todoElement.appendChild(todoMain)
            todoElement.appendChild(todoCollapse)

            div.appendChild(todoElement)
        }
    }

    function openModal(modal) {
        console.log("gecis")
        modal.classList.add('active')
        overlay.classList.add('active')
    }

    function closeModal(modal) {
        modal.classList.remove('active')
        overlay.classList.remove('active')
    }

    const addTodoModal = document.getElementById('addTodo')
    const ovelay = document.getElementById('overlay')
    const closeButton = document.getElementsByClassName('addTodo__close')[0]

    const nameInput = document.getElementById('addTodo__name')
    const nameDesc = document.getElementById('addTodo__desc')
    const nameDue = document.getElementById('addTodo__due')
    const namePrio = document.getElementById('addTodo__prio').value

    const low = document.getElementById('low-prio')
    const med = document.getElementById('med-prio')
    const high = document.getElementById('high-prio')

    function resetInput() {
        nameInput.value = ""
        nameDesc.value = ""
        nameDue.value = ""
        low.checked = false
        med.checked = false
        high.checked = false
    }

    function checkPriority() {
        let priority = "low";

        if (low.checked) {
            priority = 'low';
        }
        if (med.checked) {
            priority = 'med';
        }
        if (high.checked) {
            priority = 'high';
        }

        return priority;
    }

    button.addEventListener("click", (e) => {
        openModal(addTodoModal)

        // const test = todoFactory('title', 'desc', 'due', 'priority')
        // projects[getCurrendIndex()].addTodo(test);
        // const toDoList = projects[getCurrendIndex()].getTodo();
        // addCurrentProjectToDom(toDoList, currentProjectContainer)
    })
    closeButton.addEventListener("click", () => {
            const title = nameInput.value
            const desc = nameDesc.value
            const due = nameDue.value
            const priority = checkPriority()

            if (title == "") {
                nameInput.value = 'Title cant be empty'
                

            } else if (desc == "") {
                nameDesc.value = "Desc cant be empty"
            } 
            else if (due == ""){
                nameDue.value = '0001-01-01'
            }         
            
            else {
            
           
                    const newTodo = todoFactory(title, desc, due, priority)
                    projects[getCurrendIndex()].addTodo(newTodo);

                    const toDoList = projects[getCurrendIndex()].getTodo();
                    addCurrentProjectToDom(toDoList, currentProjectContainer)
                    closeModal(addTodoModal)
                    addClick()
                    deleteElement()
                    doneClick()
                    resetInput()
                }


            })

        function addClick() {
            const todoElement = document.getElementsByClassName("todo-element--main");

            for (let index = 0; index < todoElement.length; index++) {
                todoElement[index].addEventListener("click", function () {


                    const content = this.nextElementSibling;
                    if (content.style.display === "none") {
                        content.style.display = "inline-block";
                    } else {
                        content.style.display = "none";
                    }
                })
            }
        }
        //Hogy mentse el azt hogy a textdecoration micsoda neki? :'(())
        function doneClick() {
            const todoElementMain = document.getElementsByClassName("todo-element");
            const todoElement = document.getElementsByClassName("todo-element__done");
            const todoElementEdit = document.getElementsByClassName("todo-element--main__edit");

            const todoElementName = document.getElementsByClassName("todo-element__name");
            const todoElementDue = document.getElementsByClassName("todo-element__due");
            const todoElementDesc = document.getElementsByClassName("todo-element__desc");

            /* function getTodoIndex(todoKeresett){
                const todos = projects[getCurrendIndex()].getTodo()

                const keresett = todos.find(todo =>todo.getTitle === todoKeresett)

                return keresett
            } */
            function getTodoIndex(todoKeresett) {
                const todos = projects[getCurrendIndex()].getTodo()

                const keresett = todos.find(todo => todo.getTitle() == todoKeresett)

                console.log(todos[0].getTitle)
                return indexOf(keresett)
            }

            for (let index = 0; index < todoElement.length; index++) {


                todoElement[index].addEventListener("click", function () {

                    const todos = projects[getCurrendIndex()].getTodo()
                    todos[index].setDone()

                    if (todos[index].getDone == false) {



                        todoElementName[index].style.textDecoration = "none";
                        todoElementDue[index].style.textDecoration = "none";
                        todoElementDesc[index].style.textDecoration = "none";
                    } else {


                        todoElementName[index].style.textDecoration = "line-through";
                        todoElementDue[index].style.textDecoration = "line-through";
                        todoElementDesc[index].style.textDecoration = "line-through";
                    }

                })
            }
        }

        function deleteElement() {
            const todoElement = document.getElementsByClassName("todo-element--main");
            const deleteEelement = document.getElementsByClassName("todo-element__delete");

            for (let index = 0; index < todoElement.length; index++) {
                deleteEelement[index].addEventListener("click", function (e) {

                    console.log(getTodos())
                    projects[getCurrendIndex()].deleteTodo(index)
                    deleteEelement[index].parentElement.parentElement.parentElement.remove()

                })
            }
        }
    }

    /* console.log(currentElement)
    if (todoElementName[index].style.textDecoration === "line-through") {
        
        console.log((getTodoIndex(currentElement)).getTitle())
       
        todoElementName[index].style.textDecoration = "none";
        todoElementDue[index].style.textDecoration = "none";
        todoElementDesc[index].style.textDecoration = "none";
    } else {
        console.log(getTodoIndex(currentElement).getTitle())
       
        todoElementName[index].style.textDecoration = "line-through";
        todoElementDue[index].style.textDecoration = "line-through";
        todoElementDesc[index].style.textDecoration = "line-through";
    } */