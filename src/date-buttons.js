import {
    exportProjects
} from './project-creator';
import {
    compareAsc,
    format,
    isToday,
    parseISO,
    isThisWeek
} from 'date-fns';
import {
    addTodo,
    getTodo
} from './project-factory';

import {
    createElement,
    createLabel
} from './render-page';
import {
    create,
    get,
    indexOf
} from 'lodash';
const projects = exportProjects()

export default function dateButtons() {
    const todayButton = document.getElementById('date-container__today')
    const upcomingButton = document.getElementById('date-container__upcoming')
    const doneButton = document.getElementById('date-container__done')
    const currentProjectContainer = document.getElementById('current-project__container')

    todayButton.addEventListener("click", () => {
        currentProjectContainer.innerHTML = ""

        for (let index = 0; index < projects.length; index++) {
            const element = projects[index];
            const elemenTodo = element.getTodo()
            console.log(elemenTodo)
            for (let index = 0; index < elemenTodo.length; index++) {
                const todo = elemenTodo[index];

                const date = format(todo.getDueDate(), "yyyy-MM-dd");

                console.log(isToday(parseISO(date)))

                if (isToday(parseISO(date))) {

                    addCurrentProjectToDom(todo, currentProjectContainer);
                } else {
                    console.log("fasz")

                }

            }
        }
    })

    upcomingButton.addEventListener("click", () => {
            currentProjectContainer.innerHTML = ""

            for (let index = 0; index < projects.length; index++) {
                const element = projects[index];
                const elemenTodo = element.getTodo()
                console.log(elemenTodo)
                for (let index = 0; index < elemenTodo.length; index++) {
                    const todo = elemenTodo[index];

                    const date = format(todo.getDueDate(), "yyyy-MM-dd");

                   

                    if (isThisWeek(parseISO(date))) {

                        addCurrentProjectToDom(todo, currentProjectContainer);
                    } else {
                        console.log("fasz")

                    }
                }
            }
        })
        doneButton.addEventListener("click", () => {
            currentProjectContainer.innerHTML = ""

            for (let index = 0; index < projects.length; index++) {
                const element = projects[index];
                const elemenTodo = element.getTodo()
                console.log(elemenTodo)
                for (let index = 0; index < elemenTodo.length; index++) {
                    const todo = elemenTodo[index];

                    const done = todo.getDone();

                   

                    if (done == true) {
                        addCurrentProjectToDom(todo, currentProjectContainer);
                    } else {
                        console.log("false")

                    }

                }
            }
        })

        function addCurrentProjectToDom(element, div) {


            const todo = element;


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