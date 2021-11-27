 const LS = () => {

     const getProjectsLS = () => {
        let projects;

         if (localStorage.getItem('projects') === null) {
             projects = []
         } else {
             projects = JSON.parse(localStorage.getItem('projects'));
         }

         return projects;
     }

     const addProjectsLS = (project) => {
         const projects = getProjectsLS();
         projects.push(project)
         localStorage.setItem('projects', JSON.stringify(projects))
     }

     return {
         getProjectsLS,
         addProjectsLS
     }

 }
 export default LS;