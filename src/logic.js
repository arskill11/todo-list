import { createLayout, dialogP } from './layout';

export function Project (projectName) {
    let array = [];
    return { projectName, array};
} 

export function createTask (title, description, dueto, priority) {
    return { title, description, dueto, priority};
}

export const logic = (() => {
    const projectArray = [];

    function createProject (projectName) {
        const arr = JSON.parse(localStorage.getItem('projectArray'));
        arr.push(Project(projectName));
        localStorage.setItem('projectArray', JSON.stringify(arr));
    }

    function addTasks (index, title, description, dueto, priority) {
        const arr = JSON.parse(localStorage.getItem('projectArray'));
        arr[index].array.push(createTask(title, description, dueto, priority));
        localStorage.setItem('projectArray', JSON.stringify(arr));
    }

    function editTask (indexArr, indexTask,  newTitle, newDescription, newDueto, newPriority) {
        const arr = JSON.parse(localStorage.getItem('projectArray'));
        arr[indexArr].array[indexTask].title = newTitle;
        arr[indexArr].array[indexTask].description = newDescription;
        arr[indexArr].array[indexTask].dueto = newDueto;
        arr[indexArr].array[indexTask].priority = newPriority;

        localStorage.setItem('projectArray', JSON.stringify(arr));
    }

    function deaf () {
        if (!localStorage.getItem('projectArray') || !JSON.parse(localStorage.getItem('projectArray')).length){
            localStorage.setItem('projectArray', JSON.stringify(projectArray));
            createProject('Everyday Routine');
            addTasks(0, 'Brush teeth', '...', '', 'high');
            addTasks(0, 'Take a shower', '...', '', 'mid');
            addTasks(0, 'Make breakfast', '...', '', 'mid');
        }
    }

    deaf();
 
    return {
        createProject,
        addTasks,
        projectArray,
        editTask,
        deaf,
    }
})();

createLayout.demonstrateProjects();
dialogForProjects.indexP = 0;
createLayout.demonstrateTasks();

