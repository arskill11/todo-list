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
        //projectArray[index].array.push(createTask(title, description, dueto, priority));
        //localStorage.setItem('projectArray', JSON.stringify(projectArray));
    }

    function editTask (indexArr, indexTask,  newTitle, newDescription, newDueto, newPriority) {
        const arr = JSON.parse(localStorage.getItem('projectArray'));
        arr[indexArr].array[indexTask].title = newTitle;
        arr[indexArr].array[indexTask].description = newDescription;
        arr[indexArr].array[indexTask].dueto = newDueto;
        arr[indexArr].array[indexTask].priority = newPriority;

        /*projectArray[indexArr].array[indexTask].title = newTitle;
        projectArray[indexArr].array[indexTask].description = newDescription;
        projectArray[indexArr].array[indexTask].dueto = newDueto;
        projectArray[indexArr].array[indexTask].priority = newPriority;*/
        localStorage.setItem('projectArray', JSON.stringify(arr));

        /*projectArray[indexArr].array[indexTask].title = newTitle;
        projectArray[indexArr].array[indexTask].description = newDescription;
        projectArray[indexArr].array[indexTask].dueto = newDueto;
        projectArray[indexArr].array[indexTask].priority = newPriority;*/
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

    //createLayout.demonstrateProjects();
    //createLayout.demonstrateTasks();
 
    return {
        createProject,
        addTasks,
        projectArray,
        editTask,
        deaf,
    }
    /*const allTaskArray = [];
    const todayTaskArray = [];
;
    function createAllTask (title, description, dueto, priority) {
        let obj = {title, description, dueto, priority};
        allTaskArray.push(obj);
        console.log(allTaskArray);
    }

    function createTodayTask (title, description, dueto, priority) {
        let obj = {title, description, dueto, priority};
        todayTaskArray.push(obj);
        console.log(allTaskArray);
    }

    function updateAllTask (newTitle, newDescription, newDueto, newPriority, index) {
        allTaskArray[index].title = newTitle;
        allTaskArray[index].description = newDescription;
        allTaskArray[index].dueto = newDueto;
        allTaskArray[index].priority = newPriority;
    }

    function updateTodayTask (newTitle, newDescription, newDueto, newPriority, index) {
        todayTaskArray[index].title = newTitle;
        todayTaskArray[index].description = newDescription;
        todayTaskArray[index].dueto = newDueto;
        todayTaskArray[index].priority = newPriority;
    }

    return {
        allTaskArray,
        createAllTask,
        updateAllTask,
        todayTaskArray,
        createTodayTask,
        updateTodayTask,
    }*/
})();

createLayout.demonstrateProjects();
dialogP.indexP = 0;
createLayout.demonstrateTasks();

