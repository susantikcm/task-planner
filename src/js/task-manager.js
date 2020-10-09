/************************************ Task 9 ************************************/
// #region 

/************** Create Tasks JSON objects and save to local storage *************/
// #region 

// let tasksJson = [
//     {
//         "id": "todo1",
//         "name": "Task 1",
//         "description": "Description 1",
//         "assignedTo": "Susanti",
//         "dueDate": "2020-09-30",
//         "status": "To Do"
//     },
//     {
//         "id": "todo2",
//         "name": "Task 2",
//         "description": "Description 2",
//         "assignedTo": "Nick",
//         "dueDate": "2020-10-20",
//         "status": "In Progress"
//     },
//     {
//         "id": "todo3",
//         "name": "Task 3",
//         "description": "Description 3",
//         "assignedTo": "Robin",
//         "dueDate": "2020-11-12",
//         "status": "Review"
//     },
//     {
//         "id": "todo4",
//         "name": "Task 4",
//         "description": "Description 4",
//         "assignedTo": "Group",
//         "dueDate": "2020-10-05",
//         "status": "Done"
//     },
//     {
//         "id": "todo5",
//         "name": "Task 5",
//         "description": "zzzzzz.... this is example of very long descriptions. and i repeat again this is example of very long descriptions.",
//         "assignedTo": "Guest",
//         "dueDate": "2020-09-18",
//         "status": "Done"
//     }
// ];

// localStorage.setItem('TaskList', JSON.stringify(tasksJson));

// #endregion


/*************************** Create TaskManager Class ***************************/
// #region

let TaskManager = class  {
    constructor() {
        this.tasks = [];
        this.currentId = this.tasks ? this.tasks.length+1 : 1;
    }

    // function that retrieves only tasks with status that matches the selected status. 
    searchTask = keyword => this.tasks.filter(task => {
        keyword = keyword.toLowerCase();

        if(task.name.toLowerCase().includes(keyword) ||
            task.description.toLowerCase().includes(keyword) || 
            task.dueDate.toLowerCase().includes(keyword) || 
            task.assignedTo.toLowerCase().includes(keyword) || 
            task.status.toLowerCase().includes(keyword)) {
                return task;
        }
    }); 

    // functions that add a new task object into the tasks array.   
    addTask = task => {
        task.id = this.currentId;
        this.currentId++;
        
        if(!this.tasks)
            this.tasks = [];

        this.tasks.push(task);
        this.saveTask();
    }

    saveTask() {
        if(this.tasks) localStorage.setItem('TaskList', JSON.stringify(this.tasks));
    }

    // function that retrieves all tasks in the Tasks array.
    getAllTasks = () => {
        this.tasks = JSON.parse(localStorage.getItem('TaskList'));
        if(this.tasks !== null && this.tasks !== undefined ) {
            const lastItem = this.tasks.length;
            this.currentId = lastItem ? lastItem.id+1 : 1;
        }
    }

    // function that retrieves only tasks with status that matches the selected status. 
    getTaskById = id => {
        this.getAllTasks();
        return this.tasks.find(task => task.id == id);
    }

    // function that retrieves only tasks with status that matches the selected status. 
    getAllTasksByStatus = status => {
        this.getAllTasks();
        return this.tasks.filter(task => task.status === status);
    }

    // function that retrieves only tasks with status that matches the selected status. 
    getAllTasksByExpiry = () => {
        this.getAllTasks();
        return this.tasks.filter(task => task.dueDate <= new Date().toISOString().substring(0, 10) && task.status.toLowerCase() !== 'done');
    }

    // function that find and delete a selected task.  
    deleteTask = id => {
        this.getAllTasks();
        const selectedIndex = this.tasks.findIndex(task => task.id == id);
        const deletedTask = this.tasks.splice(selectedIndex, selectedIndex >= 0 ? 1 : 0);
        this.saveTask();

        // the return here is for future use
        return deletedTask;
    }

    // function that find and update the status of a selected task.  
    updateTaskStatus = (id) => {
        this.getAllTasks();
        this.tasks.map(task => {
            if(task.id == id)
                task.status = 'Done';
        });
        this.saveTask();
    }

    // function that find and update the asignee of the selected task.  
    assignTask = (id, assignee) => {
        this.getAllTasks();
        this.tasks.map(task => {
            if(task.id == id)
                task.assignedTo = assignee;
        });
        this.saveTask()
    }

    // function that find and update a selected task.  
    updateTask = (id, task) => {
        this.getAllTasks();
        this.tasks.map(item => {
            if(item.id == id) {
                item.name = task.name;
                item.description = task.description;
                item.dueDate = task.dueDate;
                item.assignedTo = task.assignedTo;
                item.status = task.status;
            }
            else 
                return task;
            });
        this.saveTask();
    }

    render(tasks) {
        let tasksHtml = ''; 
        
        if(tasks) 
            tasks.map(task => {
                const taskHtml = createTaskHtml(task);
                tasksHtml += (taskHtml + '\n');
            });
        else
            if(this.tasks)
                this.tasks.map(task => {
                    const taskHtml = createTaskHtml(task);
                    tasksHtml += (taskHtml + '\n');
                });

        const ulTaskList = document.querySelector('#task-list')
        if(ulTaskList) {
            ulTaskList.innerHTML = tasksHtml;
        }
    }
}

// #endregion

//#endregion



/************************************ Task 8 ************************************/
// #region

const setTaskStatusColor = (dueDate, status) => {
    let taskColor = {}; 
    if(dueDate <= new Date().toISOString().substring(0, 10) && status.replace(/\s/g, '') !== 'Done')
        taskColor = { color:'danger', rgbaColor:'rgba(217, 83, 79, 0.5)'};
    else if(dueDate > new Date().toISOString().substring(0, 10)) {
        if(status.replace(/\s/g, '') === 'ToDo')
            taskColor = { color:'info', rgbaColor:'rgba(91, 192, 222, 0.5)'};
        else if(status.replace(/\s/g, '') === 'InProgress')
            taskColor = { color:'primary', rgbaColor:'rgba(2, 117, 216, 0.4)'};
        else if(status.replace(/\s/g, '') === 'Review')
            taskColor = { color:'warning', rgbaColor:'rgba(240, 173, 78, 0.5)'};
    }
    
    if(status === 'Done')
        taskColor = { color:'success', rgbaColor:'rgba(92, 184, 92, 0.5)'};

    return taskColor
}

// #endregion



/************************************ Task 7 ************************************/
// #region

// create the html element of a task based on information of the task parameters
const createTaskHtml = (task) => {
    let taskColor = '';
    let doneButtonVisibility = '';

    if(task) {
        taskColor = setTaskStatusColor(task.dueDate, task.status);
        doneButtonVisibility = task.status === 'Done' ? 'invisible' : 'visible'; 
    
    const taskItemHtml = 
    `<li id="${task.id}" class="list-group-item list-group-item-action bg-transparent shadow mb-2 mb-md-4">
        <div class="card border-${taskColor.color} text-${taskColor.color}" style="background-color:${taskColor.rgbaColor}">
            <div class="card-header bg-transparent pt-1 pb-0 py-md-3">
                <div class="status d-flex justify-content-between py-0">
                    <p class="status">${task.status}</p>                
                    <button class="btn btn-${taskColor.color} text-${taskColor.color} rounded-circle ${doneButtonVisibility} done-button">
                        <i class="fa fa-check text-white done-icon"></i>
                    </button>
                </div>
                <p class="duedate">Due Date: <date class="duedate">${task.dueDate}</date></p>
            </div>
            <div class="card-body py-1 py-md-3">
                <h6 class="card-title">${task.name}</h6>
                <p class="card-text">${task.description}</p>
            </div>
            <div class="card-footer py-1 py-md-3 bg-transparent d-flex justify-content-between">
                <h5 class="assigned-to">${task.assignedTo}</h5>
                <button class="btn btn-danger rounded-circle text-white delete-button"><i class="fa fa-trash-o text-white delete-icon"></i></button>
            </div>  
        </div>
    </li>`;

    return taskItemHtml;
    }
}

// #endregion



/************************************ Task 6 ************************************/
// #region 

/**************************** Create new task objects ****************************/
// #region

// Object Literal
const objetcLiteral = {};

// "Constructor Function" that creates new task object.
function Task(name, description, assignedTo, dueDate, status) {
    this.id = '';
    this.name = name;
    this.description = description;
    this.assignedTo = assignedTo;
    this.dueDate = dueDate;
    this.status = status;
}

// creating task items.
// const task1 = new Task('task 1', 'description 1', 'Susanti', '2020-11-20', 'To Do');
// const task2 = new Task('task 2', 'description 2', 'Nick', '2020-12-30', 'In Progress');
// const task3 = new Task('task 3', 'description 3', 'Lakshmi', '2020-10-27', 'Review');
// const task4 = new Task('task 4', 'description 4', 'Robin', '2020-11-12', 'Done');
// const task5 = new Task('task 5', 'zzzzzz.... this is example of very long descriptions. and i repeat again this is example of very long descriptions.', 'Group', '2020-09-12', 'To Do');

//#endregion

/****************************** Testing Data Manipulation *******************************/
// #region

/******************** Create an Instance of TaskManager ********************/
let taskList = new TaskManager();

/******************** CRUD -> Create ********************/
// taskList.addTask(task1);
// taskList.addTask(task2);
// taskList.addTask(task3);
// taskList.addTask(task4);
// taskList.addTask(task5);

/******************** CRUD -> Read ********************/
// taskList.getAllTasks();

// taskList.getAllTasksWithStatus('To Do');
// console.log(taskList.getAllTasksWithStatus('To Do'));

/******************** CRUD -> Delete ********************/
// const deleteThisTask = taskList.tasks.find(item => item.id === 'todo2')
// taskList.deleteTask('todo2');
// console.log(taskList.deleteTask(deleteThisTask));

/******************** CRUD -> Update ********************/
// taskList.updateTaskStatus('todo4', 'Review')

// first create a new task info to replace the value of an exsiting task  
// const updatedTask = new Task();
// updatedTask.name = 'Sprint 3';
// updatedTask.description = 'Replace todo3';
// updatedTask.dueDate = '2020-09-30';
// updatedTask.assignedTo = 'Susanti';
// updatedTask.status = 'To Do';
// taskList.updateTask('todo3', updatedTask);
// taskList.assignTask('todo1', 'Edison')
// console.log(taskList.getAllTasks());

// taskList.render();

// #endregion

// #endregion