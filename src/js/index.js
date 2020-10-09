// let taskList = new TaskManager();
taskList.getAllTasks();
taskList.render();

// "Constructor Function" that creates new task object.
// function Task(name, description, assignedTo, dueDate, status) {
//     this.id = '';
//     this.name = name;
//     this.description = description;
//     this.assignedTo = assignedTo;
//     this.dueDate = dueDate;
//     this.status = status;
// }
/************************************ Task 4 ************************************/
/******************************* Input Validation *******************************/
// #region

// Name -> Not Empty and longer than 8 characters
// Description -> Not Empty and longer than 15 characters
// AssignedTo -> Not Empty and longer than 8 characters
// DueDate  -> Not Empty and not in the past

// set due date input to display today's date 
if(document.querySelector('#due-date')) {
    document.querySelector('#due-date').value = new Date().toISOString().substring(0, 10);
}

// method that sets the valid or invalid style to input element based on input validity
const toggleValid = (valid, element) => {
    if(valid) {
        element.classList.add('is-valid');
        element.classList.remove('is-invalid');
    }
    else {
        element.classList.add('is-invalid');
        element.classList.remove('is-valid');
    }
};

// validate the duedate input when onchange   
if(document.querySelector('#due-date')) {
    document.querySelector('#due-date').addEventListener('change', event => {
        event.preventDefault();
        const dueDate = document.querySelector('#due-date');
        const today = new Date().toISOString().substring(0, 10);
        const isDueDateValid = dueDate.value > today;
        toggleValid(isDueDateValid, dueDate);
    }, true);
}

// validate user input on create task form
const validateTaskForm = (id, name, description, assignedTo, dueDate, status) => {
    const isNameValid = name.value.length !== 0 && name.value.length <= 64;
    toggleValid(isNameValid, name);

    const isDescriptionValid = description.value.length !== 0 && description.value.length <= 128;
    toggleValid(isDescriptionValid, description);

    const isAssignedToValid = assignedTo.selectedIndex > 0 && assignedTo.options[assignedTo.selectedIndex].value.length <= 8;
    toggleValid(isAssignedToValid, assignedTo);

        const today = new Date().toISOString().substring(0, 10);
        let isDueDateValid = true;
        if(!id.value) {
            isDueDateValid = dueDate.value > today;
            toggleValid(isDueDateValid, dueDate);
    }

    if(isNameValid && isDescriptionValid && isAssignedToValid && isDueDateValid) {
        const validatedTask = new Task(name.value, description.value, assignedTo.options[assignedTo.selectedIndex].value, dueDate.value, status.options[status.selectedIndex].value);
        return validatedTask;
    }
    else
        return false;
};

const getTaskFormElement = () => {
    const taskForm = document.forms['task-form'];
    if(taskForm) {    
        const id = taskForm.elements['task-id'];
        const name = taskForm.elements['name'];
        const description = taskForm.elements['description'];
        const assignedTo = taskForm.elements['assigned-to'];
        const dueDate = taskForm.elements['due-date'];
        const status = taskForm.elements['status'];
        const submit = taskForm.elements['submit'];

        return {id, name, description, assignedTo, dueDate, status, submit}
    }
    else
        return;
};

const clearTaskForm = (form) => {
    const element = getTaskFormElement(form);
    if(element) 
    {
        taskForm.elements['task-id'].value = '';
        element.name.value = '';
        element.description.value = '';
        element.assignedTo.value = '';
        element.dueDate.value = new Date().toISOString().substring(0, 10);
        element.status.selectedIndex = 0;
    }
};

// #endregion

/************************************ Event Listeners ************************************/
// #region 
let currentStatus = '';

const displayTaskList = () => {
    if(document.querySelector('#tasks'))
        document.querySelector('#tasks').classList.remove('d-none');    
    if(document.querySelector('#create-task'))
        document.querySelector('#create-task').classList.add('d-none');

    const taskHeader = document.querySelector('#form-select-status');
    if(taskHeader) {
        if(taskList.tasks) {
            if(taskList.tasks.length <= 0)
                taskHeader.classList.add('d-none');
            else
                taskHeader.classList.remove('d-none'); 
        }
        else
            taskHeader.classList.add('d-none');
    }

    if(currentStatus === 'To Do' || currentStatus === 'In Progress' || 
        currentStatus === 'Review' || currentStatus === 'Done' ||
        currentStatus === 'Expired') {
            selectTasksByStatus(currentStatus);
    }
    else {
        taskList.getAllTasks();
        taskList.render();
    }
};

displayTaskList();

const displayTaskForm = (action, task) => {
    const taskForm = document.forms['task-form']

    const formInputs = taskForm.querySelectorAll('.form-control');
    formInputs.forEach(element => {
        if(element.classList.contains('is-valid'))
            element.classList.remove('is-valid');
        if(element.classList.contains('is-invalid'))
            element.classList.remove('is-invalid');
    });

    clearTaskForm(taskForm);
    
    if(action === 'create')
        taskForm.elements['submit'].value = 'Save';
    else if(action === 'update') {
        taskForm.elements['submit'].value = 'Update';
 
        taskForm.elements['task-id'].value = task.id;
        taskForm.elements['name'].value = task.name;
        taskForm.elements['description'].value = task.description;
        taskForm.elements['assigned-to'].value = task.assignedTo;
        taskForm.elements['due-date'].value = task.dueDate;
        taskForm.elements['status'].value = task.status;
    }

    document.querySelector('#tasks').classList.add('d-none');
    document.querySelector('#create-task').classList.remove('d-none');
};

const addButton = document.querySelector('#add-button');
if(addButton) {
    addButton.addEventListener('click', event => {
        event.preventDefault();
        displayTaskForm('create');
    }, true);
};

const plusButton = document.querySelector('#plus-button');
if(plusButton) {
    plusButton.addEventListener('click', event => {
        event.preventDefault();
        displayTaskForm('create');
    }, true);
};

const cancelNewTask = () => {
    displayTaskList();
};

const taskForm = document.forms['task-form'];
if(taskForm) {
    taskForm.addEventListener('submit', event => {
        event.preventDefault();

        const taskForm = getTaskFormElement();
        const newTask = validateTaskForm(taskForm.id, taskForm.name, taskForm.description, taskForm.assignedTo, taskForm.dueDate, taskForm.status);

        if(newTask) {
            if(taskForm.submit.value === 'Save')
                taskList.addTask(newTask);
            else if(taskForm.submit.value === 'Update')
                taskList.updateTask(taskForm.id.value, newTask);

            clearTaskForm(taskForm);

            displayTaskList();
        }
    });
};

const getParentElement = (parentClass, currentElement) => { 
    while (currentElement && currentElement.parentElement) {
        if (currentElement.classList.contains(parentClass))
            return currentElement.id;
        else
            currentElement = currentElement.parentElement;
    } 
}

const taskListGroupClick = document.querySelector('#task-list');
if(taskListGroupClick) {
    taskListGroupClick.addEventListener('click', event => {
        const element = event.target;

        if(element.classList.contains('done-button')) {
            const taskId = element.parentElement.parentElement.parentElement.parentElement.id;
            element.classList.add('invisible');
            taskList.updateTaskStatus(taskId);
            displayTaskList();
        }
        else if(element.classList.contains('done-icon')) {
            const taskId = element.parentElement.parentElement.parentElement.parentElement.parentElement.id;
            element.classList.add('invisible');
            taskList.updateTaskStatus(taskId);
            displayTaskList();
        }
        else if(element.classList.contains('delete-button')) {
            const taskId = element.parentElement.parentElement.parentElement.id;
            taskList.deleteTask(taskId);
            displayTaskList();
        }
        else if(element.classList.contains('delete-icon')) {
            const taskId = element.parentElement.parentElement.parentElement.parentElement.id;
            taskList.deleteTask(taskId);
            displayTaskList();
        }
        else if(element.classList.contains('list-group-item') ||
            element.classList.contains('card') || 
            element.classList.contains('card-header') || 
            element.classList.contains('status') || 
            element.classList.contains('duedate') ||
            element.classList.contains('card-body') ||
            element.classList.contains('card-title') ||
            element.classList.contains('card-text') ||
            element.classList.contains('card-footer') ||
            element.classList.contains('assigned-to')) {
                const taskId = getParentElement('list-group-item', element)
                const task = taskList.getTaskById(taskId);
                displayTaskForm('update', task);
            }
    }, true);
};

const taskListGroupHover = document.querySelector('#task-list');
if(taskListGroupHover) {
    taskListGroupHover.addEventListener('mouseover', event => {
        const element = event.target;
        if(element.classList.contains('done-button') || element.classList.contains('done-icon')) {
            element.style.color = 'white';
        }
        else if(element.classList.contains('delete-button') || element.classList.contains('delete-icon')) {
            element.style.color = 'white';
        }
    }, true);
};

const selectTasksByStatus = status => {
    let selectedTasks = {};

    const backToGetAllTask = document.querySelector('#back-button');
    // backToGetAllTask.classList.add('d-block');
    backToGetAllTask.classList.remove('d-none');

    if(status === 'To Do' || status === 'In Progress' || status === 'Review' || status === 'Done') 
        selectedTasks = taskList.getAllTasksByStatus(status);
    else if(status === 'Expired')
        selectedTasks = taskList.getAllTasksByExpiry();
    else {
        currentStatus = '';

        backToGetAllTask.classList.add('d-none');
        backToGetAllTask.classList.remove('d-block');
        selectedTasks = taskList.getAllTasks();
    }

    taskList.render(selectedTasks);
}

const selectStatusChange = document.querySelector('#select-status');
if(selectStatusChange) {
    selectStatusChange.addEventListener('change', event => {
        currentStatus = event.target.value;
        selectTasksByStatus(currentStatus);
    }, true);
};

const backToGetAllTask = document.querySelector('#back-button');
if(backToGetAllTask) {
    backToGetAllTask.addEventListener('click', () => {
        backToGetAllTask.classList.add('d-none');
        // backToGetAllTask.classList.remove('d-block');
        
        let selectDropdown = document.querySelector('#select-status');
        selectDropdown.selectedIndex = 'Select..';
        
        currentStatus = '';
        selectTasksByStatus('Select..');
    });
}

const searchForm = document.forms['search-form'];
if(searchForm) { 
    searchForm.addEventListener('submit', event => {
        event.preventDefault();
        
        const searchInput = searchForm.querySelector('input').value;
        const selectedTasks = taskList.searchTask(searchInput);
        taskList.render(selectedTasks);
        searchInput.value = '';
    }, true);
};

const searchInput = document.querySelector('#search-input');
if(searchInput) { 
    searchInput.addEventListener('keyup', event => {
        if(event.keyCode === 13 || event.key === "Enter")
        {
            event.preventDefault();
            const searchInput = searchForm.querySelector('input').value;
            const selectedTasks = taskList.searchTask(searchInput);
            taskList.render(selectedTasks);
            searchInput.value = '';
        }
        else if(event.keyCode === 27 || event.key === "Esc") {
            event.preventDefault();
            taskList.render();
            searchInput.value = '';
        }
    }, true);
};

// #endregion

