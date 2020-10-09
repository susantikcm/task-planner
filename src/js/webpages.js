let rootDiv = document.querySelector('#root');
if(rootDiv) {
    rootDiv.innerHTML =
    `<div class="container-fluid p-0">
        <nav class="navbar navbar-light bg-transparent navbar-expand-lg sticky-top shadow py-0 mb-auto">
            <a href="#" class="navbar-brand d-none d-md-block">snl-project</a> 
            <button class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse"> 
                <span class="navbar-toggler-icon"></span> 
            </button> 
            <div class="collapse navbar-collapse" id="navbarCollapse"> 
                <ul class="navbar-nav mr-auto"> 
                    <li class="navbar-item"> 
                        <a href="#" class="nav-link" onclick="displayTaskList()">Home</a> 
                    </li> 
                    <li class="navbar-item"> 
                        <a href="#" class="nav-link" onclick="displayTaskForm()"">Create Tasks</a> 
                    </li> 
                </ul> 
                <form id="search-form" class="form-inline form-group-sm d-md-block d-none my-2 my-lg-0"> 
                    <input id="search-input" class="form-control input-sm bg-transparent mr-sm-2" type="search" placeholder="Search..." aria-label="Search"> 
                    <button class="btn btn-sm btn-light my-2 my-sm-0" type="submit">Search</button> 
                </form> 
            </div> 
            <button id="plus-button" class="btn btn-sm rounded-circle d-block d-md-none text-white border ml-2">+</button>
        </nav>
        <!-- <form id="search-form" class="row form-inline form-group-sm d-md-none d-block my-2 my-lg-0"> 
            <input id="search-input" class="form-control mr-sm-2 py-0" type="search" placeholder="Search..." aria-label="Search"> 
            <button class="btn btn-sm btn-outline-dark my-2 my-sm-0" type="submit"><i class="fa fa-search"></button> 
        </form>  -->

        <main class="row mx-1 my-4">
            <section id="tasks" class="col">
                <div id="task-header">
                    <h4>Tasks:</h4>
                    <div class="row justify-content-between my-3">
                        <form id="form-select-status" class="form-inline col-md-9">
                            <div class="form-group">
                                <label for="status">Select by Status &nbsp;</label>
                                <select id="select-status" class="form-control bg-transparent shadow">Select by Status &nbsp;
                                    <option>Select..</option>
                                    <option>To Do</option>
                                    <option>In Progress</option>
                                    <option>Review</option>
                                    <option>Done</option>
                                    <option>Expired</option>
                                </select>
                            </div>
                            <button id="back-button" class="btn btn-sm btn-outline-dark font-weight-bold d-none ml-2">Back</button>
                        </form>
                        <button id="add-button" class="btn btn-outline-warning text-info font-weight-bold rounded-pill shadow d-none d-md-block mr-3">New Task</button>
                    </div>
                </div>

                <ul id="task-list" class="list-group">
                </ul>
            </section>

            <section id="create-task" class="col d-none">
                <h4>Create Task</h4>
                <form id="task-form" class="mt-3">
                    <input id="task-id" style="display:none;" />
                    <div class="form-group row">
                        <label for="name" class="col-md-3 col-form-label">Name</label>
                        <div class="col-md-6">
                            <input id="name" class="form-control shadow" type="text" />
                        <div class="invalid-feedback">Name shouldnt be empty or more than 64 characters.</div>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="description" class="col-md-3 col-form-label">Description</label>
                        <div class="col-md-6">
                            <textarea id="description" class="form-control shadow"></textarea>
                            <div class="invalid-feedback">Description shouldnt be empty or more than 128 characters.</div>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="assigned-to" class="col-md-3 col-form-label">Assigned To</label>
                        <div class="col-md-6">
                            <select id="assigned-to" class="form-control shadow">
                            <option></option>
                            <option>Lakshmi</option>
                            <option>Nick</option>
                            <option>Susanti</option>
                            <option>Robin</option>
                            <option>Guest</option>
                            <option>Group</option>
                        </select>
                        <div class="invalid-feedback">Assigned name shouldnt be empty or more than 8 characters.</div></div>
                    </div>

                    <div class="form-group row">
                        <label for="due-date" class="col-md-3 col-form-label">Due Date:</label>
                        <div class="col-md-6">
                            <input id="due-date" class="form-control shadow" type="date" />
                            <div class="invalid-feedback">Please choose a date after today.</div>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="status" class="col-md-3 ol-form-label">Status</label>
                        <div class="col-md-6">
                            <select id="status" class="form-control shadow">
                                <option>To Do</option>
                                <option>In Progress</option>
                                <option>Review</option>
                                <option>Done</option>
                            </select>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col offset-md-3 col-md-6 px-3 my-4 d-flex justify-content-between">
                            <input type="button" name="cancel" class="btn btn-outline-dark shadow" value="cancel" onClick="cancelNewTask()" />         
                            <input type="submit" name="submit" class="btn btn-outline-dark shadow" value="Save" />         
                                <!-- <button type="cancel" class="btn btn-outline-dark">Cancel</button>
                            <button type="submit" class="btn btn-outline-dark">Submit</button> -->
                        </div> 
                    </div>
                </form>
            </section>
        </main>
    </div>`
}