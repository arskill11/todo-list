import { logic, getLocalStorageArray, setLocalStorageArray } from './logic';

function createLayout () {
    const mainContent = document.querySelector('.mainContent');
    const addTaskBtn = document.querySelector('.addTaskBtn');
    const taskList = document.querySelector('.taskList');
    const projContainer = document.querySelector('.projContainer');
    const addProjectBtn = document.querySelector('.addProjectBtn');
    
    function demonstrateProjects () {
        const parseArray = getLocalStorageArray();
        for (let i = 0; i < parseArray.length; i++) {
            const projectContainerDiv = document.createElement('li');
            const projectDiv = document.createElement('p');
            const deleteProjectDiv = document.createElement('p');

            projectDiv.classList.add('projectDiv');
            deleteProjectDiv.classList.add('deleteProjectDiv');
            projectContainerDiv.classList.add('projectContainerDiv');

            projectDiv.setAttribute('data-proj-ind', i);
            deleteProjectDiv.setAttribute('data-del-proj-ind', i);

            projectDiv.textContent = parseArray[i].projectName;
            deleteProjectDiv.textContent = '--';

            projectContainerDiv.appendChild(projectDiv);
            projectContainerDiv.appendChild(deleteProjectDiv);
            projContainer.appendChild(projectContainerDiv);
            projectDiv.addEventListener('click', switchToProject);
            projectContainerDiv.addEventListener('click', deleteProject);
        }
    };

    function clearProjectList () {
        while (projContainer.childElementCount > 0) {
            projContainer.removeChild(projContainer.lastChild);
        } 
    }

    function demonstrateTasks () {
        const arr = getLocalStorageArray();
        const projectNameTop = document.createElement('h2');
        projectNameTop.classList.add('projectNameTop');
        projectNameTop.textContent = arr[dialogForProjects.indexP].projectName;

        for (let i = 0; i < arr[dialogForProjects.indexP].array.length; i++) {
            const taskDiv = document.createElement('div');
            const titleDiv = document.createElement('h3');
            const descriptionDiv = document.createElement('p');
            const dueToDiv = document.createElement('div');
            const priorityDiv = document.createElement('div');
            const editBtn = document.createElement('button');
            const deleteBtn = document.createElement('button');
            const btnContainer = document.createElement('div');
    
            taskDiv.classList.add('taskDiv');
            titleDiv.classList.add('titleDiv');
            descriptionDiv.classList.add('descriptionDiv');
            dueToDiv.classList.add("dueToDiv");
            priorityDiv.classList.add('priorityDiv');
            editBtn.classList.add('editBtn');
            deleteBtn.classList.add('deleteBtn');
            btnContainer.classList.add('btnCont');
            editBtn.setAttribute('data-edit-ind', i);
            deleteBtn.setAttribute('data-del-ind', i);

            titleDiv.textContent = arr[dialogForProjects.indexP].array[i].title;
            descriptionDiv.textContent = arr[dialogForProjects.indexP].array[i].description;
            dueToDiv.textContent = arr[dialogForProjects.indexP].array[i].dueto;
            priorityDiv.textContent = arr[dialogForProjects.indexP].array[i].priority;
            editBtn.textContent = 'Edit';
            deleteBtn.textContent = 'Delete';

            btnContainer.appendChild(editBtn);
            btnContainer.appendChild(deleteBtn);
            taskDiv.appendChild(titleDiv);
            taskDiv.appendChild(descriptionDiv);
            taskDiv.appendChild(dueToDiv);
            taskDiv.appendChild(priorityDiv);
            taskDiv.appendChild(btnContainer);
            taskList.appendChild(taskDiv);
    
            deleteBtn.addEventListener('click', handleDelete);
            editBtn.addEventListener('click', handleEdit);
        }
        taskList.appendChild(projectNameTop);
    }

    function clearTaskList () {
        while (taskList.childElementCount) {
            taskList.removeChild(taskList.lastChild);
        }
    }

    function refreshPage () {
        clearProjectList();
        clearTaskList();
        demonstrateProjects();
        demonstrateTasks();
    }

    return {
        addTaskBtn,
        demonstrateTasks,
        clearTaskList,
        addProjectBtn,
        demonstrateProjects,
        clearProjectList,
        refreshPage,
        projContainer,
    };
}

export const layout = createLayout();

export const dialogForTasks = (() => {
    let index;

    const dialog = document.querySelector('#dialogForTasks');
    const adminBtnContainer = document.querySelector('.adminBtnContainer');
    const form = document.querySelector('.inputForm');
    const titleInput = document.querySelector('#title');
    const descriptionInput = document.querySelector('#description');
    const dueToInput = document.querySelector('#dueTo');
    const priorityInput = document.querySelector('#priority');

    const submitBtnDialog = document.createElement('button');
    const editBtnDialog = document.createElement('button');

    submitBtnDialog.classList.add('submitBtnDialog');
    editBtnDialog.classList.add('editBtnDialog');

    submitBtnDialog.textContent = 'Submit';
    editBtnDialog.textContent = 'Submit';

    function showDialog () {
        dialog.showModal();
    }
    
    return {
        showDialog,
        titleInput,
        descriptionInput,
        dueToInput,
        priorityInput,
        form,
        dialog,
        submitBtnDialog,
        editBtnDialog,
        adminBtnContainer,
        index,
    }
})();

export const dialogForProjects = (() => {
    let indexP;
    const dialogForProject= document.querySelector('#dialogForProjects');
    const projectNameInput = document.querySelector('#projectName');
    const projectForm = document.querySelector('#projectForm');
    const projectNameAddBtn = document.querySelector('.projectNameAddBtn');

    function showDialog () {
        dialogForProject.showModal();
    }

    return {
        showDialog,
        projectNameAddBtn,
        projectNameInput,
        projectForm,
        dialogForProject,
        indexP,
    }
})();

layout.addProjectBtn.addEventListener('click', () => {
    dialogForProjects.showDialog();
})

dialogForProjects.projectNameAddBtn.addEventListener('click', () => {
    logic.createProject(dialogForProjects.projectNameInput.value);
    layout.refreshPage();
    dialogForProjects.projectForm.reset();
    dialogForProjects.dialogForProject.close();    
})

layout.addTaskBtn.addEventListener('click', (e) => {
    while (dialogForTasks.adminBtnContainer.childElementCount > 0) {
        dialogForTasks.adminBtnContainer.removeChild(dialogForTasks.adminBtnContainer.lastChild);
    }
    dialogForTasks.adminBtnContainer.appendChild(dialogForTasks.submitBtnDialog);
    dialogForTasks.showDialog();
    console.log(dialogForTasks.dialog);
})

dialogForTasks.submitBtnDialog.addEventListener('click', (e) => {
    logic.addTasks(dialogForProjects.indexP, dialogForTasks.titleInput.value, dialogForTasks.descriptionInput.value, dialogForTasks.dueToInput.value, dialogForTasks.priorityInput.value);
    layout.refreshPage();
    dialogForTasks.form.reset();
    dialogForTasks.dialog.close();    
})

dialogForTasks.editBtnDialog.addEventListener('click', (e) => {
    logic.editTask(dialogForProjects.indexP, dialogForTasks.index, dialogForTasks.titleInput.value, dialogForTasks.descriptionInput.value, dialogForTasks.dueToInput.value, dialogForTasks.priorityInput.value, dialogForTasks.index);
    layout.refreshPage();
    dialogForTasks.form.reset();
    dialogForTasks.dialog.close();
})

function handleDelete (e) {
    const array = getLocalStorageArray();
    dialogForTasks.index = e.target.getAttribute('data-del-ind');
    console.log(dialogForTasks.index);
    for (let i = 0; i < array[dialogForProjects.indexP].array.length; i++) {
        if (i == dialogForTasks.index) {
            array[dialogForProjects.indexP].array.splice(i, 1);
        }
    } 
    setLocalStorageArray(array);
    layout.refreshPage();
}

function handleEdit (e) {
    const array = getLocalStorageArray();
    dialogForTasks.index = e.target.getAttribute('data-edit-ind');

    while (dialogForTasks.adminBtnContainer.childElementCount > 0) {
        dialogForTasks.adminBtnContainer.removeChild(dialogForTasks.adminBtnContainer.lastChild);
    }
    dialogForTasks.adminBtnContainer.appendChild(dialogForTasks.editBtnDialog);
    console.log(dialogForTasks.index);

    dialogForTasks.titleInput.value = array[dialogForProjects.indexP].array[dialogForTasks.index].title;
    dialogForTasks.descriptionInput.value = array[dialogForProjects.indexP].array[dialogForTasks.index].description;
    dialogForTasks.dueToInput.value = array[dialogForProjects.indexP].array[dialogForTasks.index].dueto;
    dialogForTasks.priorityInput.value = array[dialogForProjects.indexP].array[dialogForTasks.index].priority;

    dialogForTasks.showDialog();
}

function deleteProject (e) {
    const array = getLocalStorageArray();
    let index = e.target.getAttribute('data-del-proj-ind');
    for (let i = 0; i < array.length; i++) {
        if (i == index) {
            array.splice(i, 1);
        }
    } 

    setLocalStorageArray(array);
    layout.refreshPage();
}

function switchToProject (e) {
    const array = getLocalStorageArray();
    dialogForProjects.indexP = e.target.getAttribute('data-proj-ind');
    for (let i = 0; i < array.length; i++) {
        if (i == dialogForProjects.indexP) {
            layout.clearTaskList();
            layout.demonstrateTasks();
        }
    }
}