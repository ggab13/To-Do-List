    import projectFactory from './project-factory';
    import {
        createElement,
        createLabel
    } from './render-page';
    import {
        exportProjects
    } from "./project-creator";
    import { compareAsc, format } from 'date-fns';


    //import { getTodos } from './current-projectDom';

    // Gond-e ha így hivatkozok valami function-re másik moduleból? Vagy hogy tudnám létrehozni könyebben a kommunikécit köztük?
    // Function functionján belül hogy hivatkozzak valamire? Vagy mi hogy lenne jobb a kódokat csoportosítani?


    // Folyton hibát dob rá kb amikor classosan hivatkozok rá, hogy faszba hivatkozzak rendesen rá?



    export function getProjects(projects) {
        for (let index = 0; index < projects.length; index++) {
            const element = projects[index];
            return console.log(element.getTodo())
        }
    }

    export function projectClickHandler(element) {
        const projects = exportProjects();
        const currentProjectContainer = document.getElementById('current-project__container')
        const projectName = element.innerHTML

        function getCurrentProject() {
            const found = projects.find(element => element.getName() == projectName)
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

        const toDoList = projects[getCurrendIndex()].getTodo();


        const currentProjectName = document.querySelector("#main-content > div.current-project > h2")

        element.addEventListener("click", () => {
            const button = document.getElementById('current-project__add')
            button.style.visibility = 'visible'
            currentProjectName.innerHTML = `${projectName}`
            addCurrentProjectToDom(toDoList, currentProjectContainer)
            deleteElement()
            addClick()
            doneClick()
         


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
            const todoElement = document.getElementById("projects__container");
            const deleteEelement = document.getElementsByClassName("project-element__delete");
           
           
            for (let index = 0; index < deleteEelement.length; index++) {
                deleteEelement[index].addEventListener("click", function (e) {
                   
                    currentProjectName.innerHTML = "fasz"
                   projects.splice(index,1)
            
                   deleteEelement[index].parentElement.remove()
                  
                  
                })
            }
        }
    }

    export function addProjecToDom(projects, div) {
        div.innerHTML = ''
        for (let index = 0; index < projects.length; index++) {
            const element = projects[index];
            const projectName = createElement('li', 'class', `modal__project-${element.getName()}`)
            const toDoDelete = createElement('img', 'class', 'project-element__delete')
            projectName.innerHTML = `${element.getName()}`
            projectClickHandler(projectName)
            projectName.appendChild(toDoDelete)
            div.appendChild(projectName)
          
        }
    }
    