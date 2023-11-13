import { logic } from './logic';

export const createLayout = (() => {
    const pageHat = document.querySelector('.pageHat');
    const header = document.createElement('div');
    const sidebar = document.createElement('div');
    const mainContent = document.createElement('div');
    const footer = document.createElement('div');
    const addTaskBtn = document.createElement('button');
    const taskList = document.createElement('div');
    const projContainer = document.createElement('div');
    const addProjectBtn = document.createElement('button');

    header.classList.add('header');
    sidebar.classList.add('sidebar');
    footer.classList.add('footer');
    mainContent.classList.add('mainContent');
    addTaskBtn.classList.add('addTaskBtn');
    projContainer.classList.add('projContainer');
    addProjectBtn.classList.add('addProjectBtn');
    taskList.classList.add('taskList');

    header.textContent = 'TODO LIST';
    footer.textContent = 'Developed by 17thspring';
    addTaskBtn.textContent = 'Add task';
    addProjectBtn.textContent = 'Add project';

    sidebar.appendChild(projContainer);
    sidebar.appendChild(addProjectBtn);
    pageHat.appendChild(header);
    pageHat.appendChild(sidebar);
    pageHat.appendChild(mainContent);
    pageHat.appendChild(footer);
    mainContent.appendChild(taskList);
    mainContent.appendChild(addTaskBtn);  
    
    function demonstrateProjects () {
        const parseArray = JSON.parse(localStorage.getItem('projectArray'));
        for (let i = 0; i < parseArray.length; i++) {
            const projectContainerDiv = document.createElement('div');
            const projectDiv = document.createElement('div');
            const deleteProjectDiv = document.createElement('div');

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
        const arr = JSON.parse(localStorage.getItem('projectArray'));
        const projectNameTop = document.createElement('div');
        projectNameTop.classList.add('projectNameTop');
        projectNameTop.textContent = arr[dialogForProjects.indexP].projectName;

        for (let i = 0; i < arr[dialogForProjects.indexP].array.length; i++) {
            const taskDiv = document.createElement('div');
            const titleDiv = document.createElement('div');
            const descriptionDiv = document.createElement('div');
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
})();


export const dialogForTasks = (() => {
    let index;

    const dialog = document.querySelector('#dialogF');
    const form = document.createElement('form');
    const titleInput = document.createElement('input');
    const titleInputLabel = document.createElement('label');
    const descriptionInput = document.createElement('textarea');
    const descriptionInputLabel = document.createElement('label');
    const dueToInput = document.createElement('input');
    const dueToInputLabel = document.createElement('label');
    const priorityInput = document.createElement('select');
    const priorityInputLabel = document.createElement('label');
    const highPrioriry = document.createElement('option');
    const midPriority = document.createElement('option');
    const lowPriority = document.createElement('option');
    const submitBtnDialog = document.createElement('button');
    const editBtnDialog = document.createElement('button');
    const adminBtnContainer = document.createElement('div');
    const titleContainer = document.createElement('div');
    const descriptionContainer = document.createElement('div');
    const dueToContainer = document.createElement('div');
    const priorityContainer = document.createElement('div');

    form.classList.add('inputForm');
    titleContainer.classList.add('inputContainer');
    descriptionContainer.classList.add('inputContainer');
    dueToContainer.classList.add('inputContainer');
    priorityContainer.classList.add('inputContainer');
    submitBtnDialog.classList.add('submitBtnDialog');
    editBtnDialog.classList.add('editBtnDialog');
    adminBtnContainer.classList.add('adminBtnContainer');
    descriptionInput.setAttribute('rows', '3');
    descriptionInput.setAttribute('cols', '35');
    titleInput.setAttribute('maxlength', '35');
    titleInput.setAttribute('id', 'title');
    titleInputLabel.setAttribute('for', 'title');
    descriptionInput.setAttribute('id', 'description');
    descriptionInputLabel.setAttribute('for', 'description');
    dueToInput.setAttribute('id', 'dueTo');
    dueToInput.setAttribute('type', 'date');
    dueToInputLabel.setAttribute('for', 'dueTo');
    priorityInput.setAttribute('id', 'priority');
    priorityInputLabel.setAttribute('for', 'priority');

    titleInputLabel.textContent = 'Task';
    descriptionInputLabel.textContent = 'Description';
    dueToInputLabel.textContent = 'Due to';
    priorityInputLabel.textContent = 'Priority';
    highPrioriry.value = 'High';
    highPrioriry.textContent = 'High';
    midPriority.value = 'Mid';
    midPriority.textContent = 'Mid';
    lowPriority.value = 'Low';
    lowPriority.textContent = 'Low';
    submitBtnDialog.textContent = 'Submit';
    editBtnDialog.textContent = 'Submit';

    priorityInput.appendChild(highPrioriry);
    priorityInput.appendChild(midPriority);
    priorityInput.appendChild(lowPriority);
    titleContainer.appendChild(titleInputLabel);
    titleContainer.appendChild(titleInput);
    descriptionContainer.appendChild(descriptionInputLabel);
    descriptionContainer.appendChild(descriptionInput);
    dueToContainer.appendChild(dueToInputLabel);
    dueToContainer.appendChild(dueToInput);
    priorityContainer.appendChild(priorityInputLabel);
    priorityContainer.appendChild(priorityInput);
    form.appendChild(titleContainer);
    form.appendChild(descriptionContainer);
    form.appendChild(dueToContainer);
    form.appendChild(priorityContainer);
    dialog.appendChild(form);
    dialog.appendChild(adminBtnContainer);

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
    const dialogForProjectsroject = document.querySelector('#dialogP');
    const projectForm = document.createElement('form');
    const projectNameInput = document.createElement('input');
    const projectNameInputLabel = document.createElement('label');
    const projectNameAddBtn = document.createElement('button');
    const inputCont = document.createElement('div');
    const btnCont = document.createElement('div');

    projectNameAddBtn.classList.add('projectNameAddBtn');
    projectNameInputLabel.textContent = 'Project Name';
    projectNameAddBtn.textContent = 'Add project';
    inputCont.classList.add('inputContainer');
    btnCont.classList.add('adminBtnContainer');

    projectNameInput.setAttribute('id', 'projectName');
    projectNameInputLabel.setAttribute('for', 'projectName');
    projectNameInput.setAttribute('maxlength', '50');

    inputCont.appendChild(projectNameInputLabel);
    inputCont.appendChild(projectNameInput);  
    btnCont.appendChild(projectNameAddBtn); 
    projectForm.appendChild(inputCont);
    dialogForProjectsroject.appendChild(projectForm);
    dialogForProjectsroject.appendChild(btnCont);

    function showDialog () {
        dialogForProjectsroject.showModal();
    }

    return {
        showDialog,
        projectNameAddBtn,
        projectNameInput,
        projectForm,
        dialogForProjectsroject,
        indexP,
    }
})();

createLayout.addProjectBtn.addEventListener('click', () => {
    dialogForProjects.showDialog();
})

dialogForProjects.projectNameAddBtn.addEventListener('click', () => {
    logic.createProject(dialogForProjects.projectNameInput.value);
    createLayout.refreshPage();
    dialogForProjects.projectForm.reset();
    dialogForProjects.dialogForProjectsroject.close();
})

createLayout.addTaskBtn.addEventListener('click', (e) => {
    dialogForTasks.adminBtnContainer.appendChild(dialogForTasks.submitBtnDialog);
    dialogForTasks.showDialog();
    console.log(dialogForTasks.dialog);
})

dialogForTasks.submitBtnDialog.addEventListener('click', (e) => {
    console.log(dialogForProjects.indexP);
    logic.addTasks(dialogForProjects.indexP, dialogForTasks.titleInput.value, dialogForTasks.descriptionInput.value, dialogForTasks.dueToInput.value, dialogForTasks.priorityInput.value);
    createLayout.refreshPage();
    dialogForTasks.form.reset();
    dialogForTasks.dialog.close();

    dialogForTasks.adminBtnContainer.removeChild(dialogForTasks.submitBtnDialog);
})

dialogForTasks.editBtnDialog.addEventListener('click', (e) => {
    logic.editTask(dialogForProjects.indexP, dialogForTasks.index, dialogForTasks.titleInput.value, dialogForTasks.descriptionInput.value, dialogForTasks.dueToInput.value, dialogForTasks.priorityInput.value, dialogForTasks.index);
    createLayout.refreshPage();
    dialogForTasks.form.reset();
    dialogForTasks.dialog.close();

    dialogForTasks.adminBtnContainer.removeChild(dialogForTasks.editBtnDialog);
})

function handleDelete (e) {
    const array = JSON.parse(localStorage.getItem('projectArray'));
    dialogForTasks.index = e.target.getAttribute('data-del-ind');
    console.log(dialogForTasks.index);
    for (let i = 0; i < array[dialogForProjects.indexP].array.length; i++) {
        if (i == dialogForTasks.index) {
            array[dialogForProjects.indexP].array.splice(i, 1);
        }
    } 
    localStorage.setItem('projectArray', JSON.stringify(array));
    createLayout.refreshPage();
}

function handleEdit (e) {
    const array = JSON.parse(localStorage.getItem('projectArray'));

    dialogForTasks.index = e.target.getAttribute('data-edit-ind');
    dialogForTasks.adminBtnContainer.appendChild(dialogForTasks.editBtnDialog);
    console.log(dialogForTasks.index);

    dialogForTasks.titleInput.value = array[dialogForProjects.indexP].array[dialogForTasks.index].title;
    dialogForTasks.descriptionInput.value = array[dialogForProjects.indexP].array[dialogForTasks.index].description;
    dialogForTasks.dueToInput.value = array[dialogForProjects.indexP].array[dialogForTasks.index].dueto;
    dialogForTasks.priorityInput.value = array[dialogForProjects.indexP].array[dialogForTasks.index].priority;

    dialogForTasks.showDialog();
}

function deleteProject (e) {
    const array = JSON.parse(localStorage.getItem('projectArray'));
    let index = e.target.getAttribute('data-del-proj-ind');
    for (let i = 0; i < array.length; i++) {
        if (i == index) {
            array.splice(i, 1);
        }
    } 
    
    localStorage.setItem('projectArray', JSON.stringify(array));
    createLayout.refreshPage();
}

function switchToProject (e) {
    const array = JSON.parse(localStorage.getItem('projectArray'));
    console.log(e.target);
    dialogForProjects.indexP = e.target.getAttribute('data-proj-ind');
    console.log(dialogForProjects.indexP);
    for (let i = 0; i < array.length; i++) {
        if (i == dialogForProjects.indexP) {
            createLayout.clearTaskList();
            createLayout.demonstrateTasks();
        }
    }
}
