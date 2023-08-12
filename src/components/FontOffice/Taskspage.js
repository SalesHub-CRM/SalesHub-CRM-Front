import {useState} from "react";
import DisplayTasks from "../../blocks/frontOffice/Tasks/DisplayTasks";
import AddTasksForm from "../../blocks/frontOffice/Tasks/AddTasksForm";
import '../../blocks/frontOffice/Tasks/tasks.css';

const Taskspage = () => {
    const [show, setShow] = useState(0)

    return(
        <div>
            <div className="d-flex justify-content-between taskNav">
                <div>
                    <span>Manage tasks</span>
                </div>

                <div>
                    <button className="btn btn-light" onClick={() => setShow(0)}>show list</button>
                    <button className="btn btn-light" onClick={() => setShow(1)}>Add tasks</button>
                </div>
            </div>


            <div className="tasksMainPage">
                {show===0 && <DisplayTasks/>}
                {show===1 && <AddTasksForm/>}
            </div>
        </div>
    )
}
export default Taskspage;