import _ from 'lodash';
import loadPage from './render-page';
import todoFactory from './todo-factory';
import projectCreator from './project-creator';
import currentProject from './current-project'; 
import './style.css';
import dateButtons from './date-buttons';

init()



function init() {
    
    loadPage()
    currentProject()
    projectCreator()
    dateButtons()
   
 
   
}

//---Általános kérdések---

//Git ignore-ba valamit tegyek-e bele? Milyen loadereket lehet érdemes használni? Live reloadhoz melyik opciót válasszam?
// "use strict" érdemes-e használni?