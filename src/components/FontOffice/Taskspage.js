import {useState} from "react";
import DisplayTasks from "../../blocks/frontOffice/Tasks/DisplayTasks";
import AddTasksForm from "../../blocks/frontOffice/Tasks/AddTasksForm";
import '../../blocks/frontOffice/Tasks/tasks.css';
import {Link, Route, Routes} from "react-router-dom";
import TaskDetails from "../../blocks/frontOffice/Tasks/TaskDetails";
import EditTask from "../../blocks/frontOffice/Tasks/EditTask";

const Taskspage = () => {


    return(
        <div>
            <div className="d-flex justify-content-between taskNav">
                <div>
                    <span>Manage tasks</span>
                </div>

                <div>
                    <Link className="btn btn-light" to="/home/task">Show List</Link>
                    <Link className="btn btn-light" to="/home/task/addTask">Add Task</Link>
                </div>
            </div>


            <div className="tasksMainPage">
                <Routes>
                    <Route path="/" element={<DisplayTasks/>}/>
                    <Route path="/addTask" element={<AddTasksForm/>}/>
                    <Route path="/taskDetails/:taskId" element={<TaskDetails/>}/>
                    <Route path="/editTask/:taskId" element={<EditTask/>}/>
                </Routes>
            </div>
        </div>
    )
}
export default Taskspage;