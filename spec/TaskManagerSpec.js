describe('Task Manager', () => {
    let taskManager;
    let newTask, extraTask, updatedTask;

    beforeEach(() => {
        taskManager = new TaskManager();
        newTask = new Task('task 1', 'description 1', 'Susanti', '2020-10-20', 'To Do');
    });

    describe('#constructor', () => {
        describe('when initializing new TaskManager', () => {
            it('should create variable "tasks" as empty array', () => {
                expect(taskManager.tasks).toEqual([]);
            });

            it('should set value of "currentId" equals to 1', () => {
                expect(taskManager.currentId).toEqual(1);
            }); 
        });
    });

    describe('#CRUD', () => {
        beforeEach(() => {
            taskManager.addTask(newTask);
        });

        describe('#searchTask', () => {
            describe('when a search keyword is passed as parameter', () => {
                it('should get all tasks that contains the search keyword in lowercase', () => {
                    // add extra Task, so we have 2 tasks for testing purpose
                    extraTask = new Task('extra task', 'create testing for searching tasks', 'Nick', '2021-01-21', 'Review');
                    taskManager.addTask(extraTask);

                    const result1 = taskManager.searchTask('Nick')
                    expect(result1).toEqual([extraTask]);

                    const result2 = taskManager.searchTask('To Do')
                    expect(result2).toEqual([newTask]);
                }); 
            });        
        });

        describe('#addTask', () => {
            describe('when passing new "task" object as parameter', () => {
                it('should add the task object to the tasks array', () => {
                    expect(taskManager.tasks[0]).toEqual(newTask);
                }); 

                it('should increment the value of currentId by 1', () => {
                    expect(taskManager.currentId).toEqual(2);
                }); 
            });        
        });

        describe('#deleteTask', () => {
            describe(`when passing a task's id as parameter`, () => {
                it('should remove the associated task from the tasks array', () => {      
                    taskManager.deleteTask(newTask.id);
                    expect(taskManager.tasks).not.toContain(newTask);
                });
            });
        });

        describe('#getTaskById', () => {
            describe(`when passing a task's id as parameter`, () => {                
                it('should get one associated task from the tasks array', () => {
                    const result = taskManager.getTaskById(newTask.id);

                    expect(taskManager.tasks[0]).toEqual(result);
                });
            });
        });

        describe('#getAllTasksByStatus', () => {
            describe(`when passing a task's status as parameter`, () => {
                it('should get the associated tasks from the tasks array', () => {
                    const result = taskManager.getAllTasksByStatus(newTask.status);

                    const tasks = JSON.parse(JSON.stringify([newTask]));                   
                    
                    // mock dynamic id for testing purpose
                    newTask.id = result[0].id;
 
                    expect(result).toEqual(tasks);
                });
            });
        });

        describe('#getAllTasks', () => {
            describe('when saved "TaskList" are retrieved from localStorage', () => {
                it('should set the tasks into the tasks array', () => {
                    const tasks = [];
                    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(tasks));
                    
                    taskManager.getAllTasks();
                    
                    expect(taskManager.tasks).toEqual(tasks);
                });

                it('should set value of "currentId" equals to length of tasks array + 1', () => {
                    expect(taskManager.currentId).toEqual(taskManager.tasks.length+1);
                }); 
            });
        });

        describe('#updateTaskStatus', () => {
            describe(`when passing parameters id and status`, () => {
                it('should update the status of the task with matching id', () => {
                    taskManager.updateTaskStatus(newTask.id);

                    expect(taskManager.tasks[0].status).toEqual('Done');
                });
            });
        });    

        describe('#assignTask', () => {
            describe(`when passing parameters id and assignee`, () => {
                it('should update the "Assigned to" of the task with matching id', () => {
                    taskManager.assignTask(newTask.id, 'Nick');

                    expect(taskManager.tasks[0].assignedTo).toEqual('Nick');
                });
            });
        });    

        describe('#updateTask', () => {
            describe(`when passing parameters id and task object`, () => {
                it('should overwrite existing data of the task with matching id, with data from task object paraemter', () => {
                    updatedTask = new Task('task 10', 'description 10', 'Robin', '2021-11-21', 'In Progress');
                    taskManager.updateTask(newTask.id, updatedTask);

                    // mock id to be equals to existing newTask.id for testing purpose
                    updatedTask.id = newTask.id;

                    expect(taskManager.tasks[0]).toEqual(JSON.parse(JSON.stringify(updatedTask)));
                });
            });
        });    
        
        describe('#save', () => {
            describe('when tasks array exists in the taskManager', () => {
                it('should save the tasks array into the local storage with key name as "TaskList"', () => {
                    const spy = spyOn(localStorage, 'setItem');

                    taskManager.saveTask();

                    // check the first call of the setItem() function in the spy obj, 
                    //then get the args object containing "TasKList" data saved in the localStorage
                    expect(spy.calls.first().args).toEqual(['TaskList', JSON.stringify(taskManager.tasks)]);
                });

                // I set the currentId to be equal to the length of tasks array + 1
                // and it is tested on the constructor part
            });
        });

        describe('#render', () => {
            describe('when a "new tasks" array is passed as parameter', () => {
                it('should render the tasks array as the innerHTML of the ul element with id="task-list"', () => {
                    // MOCK the value of "id", because it is dynamically created
                    newTask.id = '1';
                    const tasks = [newTask];
                    const ulTaskList = { innerHTML: '' };
        
                    spyOn(document, 'querySelector').and.returnValue(ulTaskList);
            
                    taskManager.render(tasks);

                    expect(ulTaskList.innerHTML).toContain('<li id="1" class="list-group-item list-group-item-action bg-transparent shadow mb-2 mb-md-4">');
                    expect(ulTaskList.innerHTML).toContain('<div class="card border-info text-info" style="background-color:rgba(91, 192, 222, 0.5)">');
                    expect(ulTaskList.innerHTML).toContain('<div class="card-header bg-transparent pt-1 pb-0 py-md-3">');
                    expect(ulTaskList.innerHTML).toContain('<div class="status d-flex justify-content-between py-0">');
                    expect(ulTaskList.innerHTML).toContain('<p class="status">To Do</p>');
                    expect(ulTaskList.innerHTML).toContain('<button class="btn btn-info text-info rounded-circle visible done-button">');
                    expect(ulTaskList.innerHTML).toContain('<i class="fa fa-check text-white done-icon"></i>');
                    expect(ulTaskList.innerHTML).toContain('</button>');
                    expect(ulTaskList.innerHTML).toContain('</div>');
                    expect(ulTaskList.innerHTML).toContain('<p class="duedate">Due Date: <date class="duedate">2020-10-20</date></p>');
                    expect(ulTaskList.innerHTML).toContain('</div>');
                    expect(ulTaskList.innerHTML).toContain('<div class="card-body py-1 py-md-3">');
                    expect(ulTaskList.innerHTML).toContain('<h6 class="card-title">task 1</h6>');
                    expect(ulTaskList.innerHTML).toContain('<p class="card-text">description 1</p>');
                    expect(ulTaskList.innerHTML).toContain('</div>');
                    expect(ulTaskList.innerHTML).toContain('<div class="card-footer py-1 py-md-3 bg-transparent d-flex justify-content-between"');
                    expect(ulTaskList.innerHTML).toContain('<h5 class="assigned-to">Susanti</h5>');
                    expect(ulTaskList.innerHTML).toContain('<button class="btn btn-danger rounded-circle text-white delete-button"><i class="fa fa-trash-o text-white delete-icon"></i></button>');
                    expect(ulTaskList.innerHTML).toContain('</div>');
                    expect(ulTaskList.innerHTML).toContain('</div>');
                    expect(ulTaskList.innerHTML).toContain('</li>');
                });
            });
            
            
            describe('when tasks array exists in the taskManager', () => {
                it('should render the test in the innerHTML of the tasksList', () => {
                    const ulTaskList = { innerHTML: '' };
        
                    spyOn(document, 'querySelector').and.returnValue(ulTaskList);
            
                    taskManager.render();

                    expect(ulTaskList.innerHTML).toContain('<li id="1" class="list-group-item list-group-item-action bg-transparent shadow mb-2 mb-md-4">');
                    expect(ulTaskList.innerHTML).toContain('<div class="card border-info text-info" style="background-color:rgba(91, 192, 222, 0.5)">');
                    expect(ulTaskList.innerHTML).toContain('<div class="card-header bg-transparent pt-1 pb-0 py-md-3">');
                    expect(ulTaskList.innerHTML).toContain('<div class="status d-flex justify-content-between py-0">');
                    expect(ulTaskList.innerHTML).toContain('<p class="status">To Do</p>');
                    expect(ulTaskList.innerHTML).toContain('<button class="btn btn-info text-info rounded-circle visible done-button">');
                    expect(ulTaskList.innerHTML).toContain('<i class="fa fa-check text-white done-icon"></i>');
                    expect(ulTaskList.innerHTML).toContain('</button>');
                    expect(ulTaskList.innerHTML).toContain('</div>');
                    expect(ulTaskList.innerHTML).toContain('<p class="duedate">Due Date: <date class="duedate">2020-10-20</date></p>');
                    expect(ulTaskList.innerHTML).toContain('</div>');
                    expect(ulTaskList.innerHTML).toContain('<div class="card-body py-1 py-md-3">');
                    expect(ulTaskList.innerHTML).toContain('<h6 class="card-title">task 1</h6>');
                    expect(ulTaskList.innerHTML).toContain('<p class="card-text">description 1</p>');
                    expect(ulTaskList.innerHTML).toContain('</div>');
                    expect(ulTaskList.innerHTML).toContain('<div class="card-footer py-1 py-md-3 bg-transparent d-flex justify-content-between"');
                    expect(ulTaskList.innerHTML).toContain('<h5 class="assigned-to">Susanti</h5>');
                    expect(ulTaskList.innerHTML).toContain('<button class="btn btn-danger rounded-circle text-white delete-button"><i class="fa fa-trash-o text-white delete-icon"></i></button>');
                    expect(ulTaskList.innerHTML).toContain('</div>');
                    expect(ulTaskList.innerHTML).toContain('</div>');
                    expect(ulTaskList.innerHTML).toContain('</li>');

                    // expect(ulTaskList.innerHTML).toContain(`
                    // <li id="todo2" class="list-group-item list-group-item-action bg-transparent font-weight-bold mb-2 mb-md-4">
                    //     <div class="card border-info shadow text-info" style="background-color:rgba(91, 192, 222, 0.05)">
                    //         <div class="card-header bg-transparent pt-1 pb-0 py-md-3">
                    //             <div class="status d-flex justify-content-between py-0">
                    //                 <p class="status">To Do</p>                
                    //                 <button class="btn btn-info text-info rounded-circle visible done-button">
                    //                     <i class="fa fa-check text-white done-icon"></i>
                    //                 </button>
                    //             </div>
                    //             <p class="duedate">Due Date: <date class="duedate">2020-10-20</date></p>
                    //         </div>
                    //         <div class="card-body py-1 py-md-3">
                    //             <h6 class="card-title">task 1</h6>
                    //             <p class="card-text">description 1</p>
                    //         </div>
                    //         <div class="card-footer py-1 py-md-3 bg-transparent d-flex justify-content-between">
                    //             <h5 class="assigned-to">Susanti</h5>
                    //             <button class="btn btn-danger rounded-circle text-white delete-button"><i class="fa fa-trash-o text-white delete-icon"></i></button>
                    //         </div>  
                    //     </div>
                    // </li>
                    // `);
                });
            });
        });
    });
});