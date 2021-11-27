import projectFactory from './project-factory';
//Miért teszi {} - be ? Funkcióknál kell, hogy ebbe tegye?
import {
    createElement
} from './render-page';
import {
    addProjecToDom,
    getProjects
} from './projects-handler';
import LS from './local-storage';


//const mukodj = LS()

const projects = []
//console.log(projects)
//console.log(mukodj)

export function exportProjects() {
    return projects
}

function projectCreator() {
    const body = document.getElementsByTagName('body')[0]
    const createProject = document.getElementById('projects__button')
    const projectsDiv = document.getElementById('projects__container')

    function modalContent() {
        const divModal = createElement('div', 'id', 'modal')
        const divModalContent = createElement('div', 'class', 'modal__content')

        const h2 = createElement('h2', 'class', 'modal__project-name')
        const projectInput = createElement('input', 'id', 'modal__input')
        const saveButton = createElement('button', 'id', 'modal__save')
        const closeModal = createElement('span', 'id', 'modal__close')

        h2.innerHTML = 'Project name'
        saveButton.innerHTML = 'Save'
        closeModal.innerHTML = 'X'

        divModalContent.appendChild(h2)
        divModalContent.appendChild(projectInput)
        divModalContent.appendChild(saveButton)
        divModalContent.appendChild(closeModal)
        divModal.appendChild(divModalContent)
        return divModal;
    }

    // Valami más megoldás esetleg erre, hogy ne click handleren belül keljen intéznem a többi
    // dolgot benne? Ugye kivülről nem érem el ezeket az elemeket, mert csak azután jöttek létre,
    // hogy rákattintuk a kreaálásra


    //Erre valami jó megoldást, hogy ha kilépek egyszer ne hozzon létre újat :S
    createProject.addEventListener("click", () => {

        body.appendChild(modalContent())
        const modalContainer = document.getElementById('modal')
        const modalClose = document.getElementById('modal__close')
        const projectSave = document.getElementById('modal__save')
        let projectName = document.getElementById('modal__input')

        modalClose.addEventListener("click", () => {
            body.removeChild(modalContainer)
        })
        projectSave.addEventListener("click", () => {
            const newProject = projectFactory(`${projectName.value}`)

            projects.push(newProject)
           // console.log
            //mukodj.addProjectsLS(newProject)
            addProjecToDom(projects, projectsDiv)
           
           // getProjects(projects)
            body.removeChild(modalContainer)
        })
    })
}
export default projectCreator;