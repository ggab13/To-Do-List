// Jó-e ez a megoldás, hogy könnyebb legyen lérehozni elemeket?

// Ha valamit úgy szeretnék pl így létrehozni, hogy ne legyen mondjuk class vagy
// id hozzárendelve akkor hogy? Mert így undefined-ot dob vagy ha simán "" adok meg akkor meg üresen felviszi neki

export function createElement(tag, attribute, attributeName) {
    const element = document.createElement(`${tag}`)
    element.setAttribute(`${attribute}`, `${attributeName}`)
    return element
}
export function createLabel(name,text){
    var newlabel = document.createElement("Label");
    newlabel.setAttribute("for", `${name}`);
    newlabel.innerHTML = `${text}`;
    return newlabel
}

// Elnevezése az elemeknek okés-e?

function createHeader() {
    function createFlexContainer() {
        const headerFlex = createElement('div', 'class', 'header-flex')

        // Okés-e ha ezt nevezem el h1-el ami a headerben van "Projekt cím",
        // vagy ez esetben mást lenne érdemes használnom?
        const projectTitle = createElement('h1', 'class', 'header-flex__project-title')
        projectTitle.textContent = 'To Do List'

        const searchBar = createElement('input', 'class', 'header-flex__search-bar')
        searchBar.placeholder = 'Search...'

        function dateContainer() {
            const dateContainer = createElement('ul', 'class', 'header-flex__date-container')

            const dueToday = createElement('li', 'class', 'date-container__today')
            const dueUpcoming = createElement('li', 'class', 'date-container__upcoming')
            const dueDone = createElement('li', 'class', 'date-container__done')

            // Ha ilyen van pl, hogy BEM-el nevezem el az elemeket akkor egy szülő gyerekének a gyerekének
            // mi a megefelő? Illetve ha ilyen van pl, hogy nem akarom őket külön külön elnevezni,
            // hanem összefogóan, hogy egyszerre tudjak rajta css-t alkalmazni akkor jó-e így?

            const dueTodayButton = createElement('button', 'id', 'date-container__today')
            const dueUpcomingButton = createElement('button', 'id', 'date-container__upcoming')
            const dueDoneButton = createElement('button', 'id', 'date-container__done')

            dueTodayButton.textContent = 'Today'
            dueUpcomingButton.textContent = 'Week'
            dueDoneButton.textContent = 'Done'

            dueToday.appendChild(dueTodayButton)
            dueUpcoming.appendChild(dueUpcomingButton)
            dueDone.appendChild(dueDoneButton)

            dateContainer.appendChild(dueToday)
            dateContainer.appendChild(dueUpcoming)
            dateContainer.appendChild(dueDone)

            return dateContainer;

        }

        headerFlex.appendChild(projectTitle)
        headerFlex.appendChild(dateContainer())
        headerFlex.appendChild(searchBar)

        return headerFlex
    }
    const header = createElement('header', 'class', 'header')
    header.appendChild(createFlexContainer())
    return header;
}

function createBody() {
    const main = createElement('main', 'id', 'main-content')

    function createProjects() {
        const projects = createElement('div', 'id', 'projects')
        const projectsH2 = createElement('h2', 'id', 'projects__h2')
       // const defaultProject = createElement('p', 'id', 'projects__default')
        const projectContainer = createElement('ul', 'id', 'projects__container')
        const createProjectButton = createElement('button', 'id', 'projects__button')

        projectsH2.innerHTML = 'Projects'
        createProjectButton.innerHTML = '+'
     //   defaultProject.innerHTML = 'Default project'

        projects.appendChild(projectsH2)
        projects.appendChild(createProjectButton)
       // projectContainer.appendChild(defaultProject)
        projects.appendChild(projectContainer)

        return projects;
    }

    function currentProject() {

        const currentProject = createElement('div', 'class', 'current-project')
        const currentProjectName = createElement('h2', 'class', 'current-project__name')
        currentProjectName.innerHTML = "Current Project"
        const currentProjectAdd = createElement('button', 'id', 'current-project__add')
        const currentProjectContainer = createElement('div', 'id', 'current-project__container')
        currentProjectAdd.innerHTML = "+"

        currentProject.appendChild(currentProjectName)
        currentProject.appendChild(currentProjectAdd)
        currentProject.appendChild(currentProjectContainer)

        return currentProject;
    }

    main.appendChild(createProjects())
    main.appendChild(currentProject())

    return main
}

function createFooter() {
    const footer = createElement('footer', 'id', 'ggab13')
    const ggab13 = createElement('h2', 'id', 'ggab13__name')
    ggab13.innerHTML = `Created by <span id="valsz">|</span> <a href="https://github.com/ggab13">ggab13</a> <img alt="">`;

    footer.appendChild(ggab13)

    return footer;
}

function loadPage() {
    const body = document.getElementsByTagName('body')[0];
    const container = createElement('div', 'class', 'container');
    body.appendChild(container);

    function createDom() {
        container.appendChild(createHeader())
        container.appendChild(createBody())
        container.appendChild(createFooter())
    }
    //Így oké e pl felépíteni valamit? vagy fölös functionbe rakni pl itt
    createDom()
}
export default loadPage;