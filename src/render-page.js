// Jó-e ez a megoldás, hogy könnyebb legyen lérehozni elemeket?

// Ha valamit úgy szeretnék pl így létrehozni, hogy ne legyen mondjuk class vagy id hozzárendelve akkor hogy? Mert így undefined-ot dob vagy ha simán "" adok meg akkor meg üresen felviszi neki

function createElement(tag, attribute, attributeName) {
    const element = document.createElement(`${tag}`)
    element.setAttribute(`${attribute}`, `${attributeName}`)
    return element
}

// Elnevezése az elemeknek okés-e?



function createHeader() {

    
function createFlexContainer() {
    const headerFlex = createElement('div', 'class', 'header-flex')

    const projectTitle = createElement('h1', 'class', 'header-flex__project-title')
    projectTitle.textContent = 'To Do List'

    const searchBar = createElement('input', 'class', 'header-flex__search-bar')
    searchBar.placeholder = 'Search...'

    function dateContainer() {
        const dateContainer = createElement('ul', 'class', 'header-flex__date-container')

        const dueToday = createElement('li', 'class', 'date-container__today')
        const dueUpcoming = createElement('li', 'class', 'date-container__upcoming')
        const dueDone = createElement('li', 'class', 'date-container__done')

        // Ha ilyen van pl, hogy BEM-el nevezem el az elemeket akkor egy szülő gyerekének a gyerekének mi a megefelő? Illetve ha ilyen van pl, hogy nem akarom őket külön külön elnevezni, hanem összefogóan, hogy egyszerre tudjak rajta css-t alkalmazni akkor jó-e így?
        const dueTodayButton = createElement('button', 'class', 'date-container__button')
        const dueUpcomingButton = createElement('button', 'class', 'date-container__button')
        const dueDoneButton = createElement('button', 'class', 'date-container__button')

        dueTodayButton.textContent = 'Today'
        dueUpcomingButton.textContent = 'Upcoming'
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
    const main = createElement('div', 'class', 'header-flex')

    const projectTitle = createElement('h1', 'class', 'header-flex__project-title')
    projectTitle.textContent = 'To Do List'

    const searchBar = createElement('input', 'class', 'header-flex__search-bar')
    searchBar.placeholder = 'Search...'

}

function createFooter() {
    
}
function loadPage() {

    const body = document.getElementsByTagName('body')[0];
    const container = createElement('div', 'class', 'container');

    body.appendChild(container);
    container.appendChild(createHeader())

}
export default loadPage;