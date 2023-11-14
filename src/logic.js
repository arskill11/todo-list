import { layout, dialogForProjects } from './layout';

export function Project (projectName) {
    const array = [];
    return { projectName, array};
} 

export function createTask (title, description, dueto, priority) {
    return { title, description, dueto, priority};
}

export const logic = (() => {
    const projectArray = [];

    function createProject (projectName) {
        const arr = getLocalStorageArray();
        arr.push(Project(projectName));
        setLocalStorageArray(arr);
    }

    function addTasks (index, title, description, dueto, priority) {
        const arr = getLocalStorageArray();
        arr[index].array.push(createTask(title, description, dueto, priority));
        setLocalStorageArray(arr);
    }

    function editTask (indexArr, indexTask,  newTitle, newDescription, newDueto, newPriority) {
        const arr = getLocalStorageArray();
        arr[indexArr].array[indexTask].title = newTitle;
        arr[indexArr].array[indexTask].description = newDescription;
        arr[indexArr].array[indexTask].dueto = newDueto;
        arr[indexArr].array[indexTask].priority = newPriority;

        setLocalStorageArray(arr);
    }

    function createStartTasks () {
        if (!localStorage.getItem('projectArray') || !JSON.parse(localStorage.getItem('projectArray')).length){
            localStorage.setItem('projectArray', JSON.stringify(projectArray));
            createProject('Everyday Routine');
            addTasks(0, 'Brush teeth', '...', '', 'high');
            addTasks(0, 'Take a shower', '...', '', 'mid');
            addTasks(0, 'Make breakfast', '...', '', 'mid');
        }
    }

    createStartTasks();
 
    return {
        createProject,
        addTasks,
        projectArray,
        editTask,
        createStartTasks,
    }
})();

layout.demonstrateProjects();
dialogForProjects.indexP = 0;
layout.demonstrateTasks();

export function getLocalStorageArray () {
    return JSON.parse(localStorage.getItem('projectArray'));
}

export function setLocalStorageArray (arr) {
    localStorage.setItem('projectArray', JSON.stringify(arr));
}
