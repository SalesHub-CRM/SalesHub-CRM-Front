import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router";
import React, {useEffect} from "react";
import {GetTaskById} from "../../../redux/actions/TasksActions";


const TaskDetailsAdmin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const dataUser = JSON.parse(localStorage.getItem('user'));
    const {taskId} = useParams();
    const Task = useSelector(state => state.Task.getTaskById);

    const dueDateFormat = new Date(Task.duedate)
    const createdAtFormat = new Date(Task.createdat)
    const updatedAtFormat = new Date(Task.updatedat)


    useEffect(()=>{
        dispatch(GetTaskById(taskId));
    },[])

    console.log("task",Task)


    //handle displaying, hiding and coloring the due date compared to the actual date

    const currentDate = new Date();
    const dueDate = new Date(Task.duedate);

    let dueDateStyle = {};

    if (Task.status === 'COMPLETED') {
        dueDateStyle.display = 'none';
    } else if (currentDate <= dueDate) {
        dueDateStyle.color = 'green';
    } else {
        dueDateStyle.color = 'red';
    }


    //handle displaying, hiding and coloring priority
    let priorityStyle = {};

    if (Task.status === 'COMPLETED') {
        priorityStyle.display = 'none';
    } else {
        if (Task.priority === 'HIGH') {
            priorityStyle.color = 'red';
        } else if (Task.priority === 'NORMAL') {
            priorityStyle.color = '#2A36EF';
        } else if (Task.priority === 'LOW') {
            priorityStyle.color = 'green';
        }
    }



    if(Object.keys(Task).length===0)
    {
        return(
            <div className="DashboardHome">
                <div className="container mt-5">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-xl-10">
                            <div>
                                <h1>Loading...</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }



    else{
        return(
            <div className="DashboardHome">
                <div className="container mt-5">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-xl-10">
                            <div className="card rounded-3 text-black mb-5">
                                <div className="row g-0">

                                    <div className="card-body p-md-5 mx-md-4">

                                        <div className="container mt-5 mb-5">
                                            {/*img and general info*/}
                                            <div className="d-flex justify-content-around taskDetMarg">

                                                <div>
                                                    <img className="leadImage" src="/assets/images/taskIcon2.png" alt="user icon"/>
                                                </div>


                                                <div className="align-self-center">
                                                    <h1 className={Task.status === 'COMPLETED' ? 'completed' : 'not-completed'}>
                                                        <span style={{color:'#000000'}}>Status : </span>
                                                        {Task.status === 'NOTSTARTED' ? 'NOT STARTED' : Task.status === 'INPROGRESS' ? 'IN PROGRESS' : Task.status}
                                                    </h1>

                                                    <h3 style={dueDateStyle}> <span style={{color:'#000000'}}>Due date : </span> {dueDateFormat.toLocaleDateString("en-GB")}</h3>

                                                    <h3 style={priorityStyle}> <span style={{color:'#000000'}}> Priority : </span>{Task.priority}</h3>

                                                </div>
                                            </div>

                                            {/*other details*/}

                                            <h2 className="text-center">Additional information</h2>


                                            <div className="d-flex justify-content-around mt-5">
                                                <div>

                                                    <p><span className="detailsSpan">Subject :</span> {Task.subject}</p>
                                                    <p><span className="detailsSpan">Commentary :</span> {Task.comment}</p>
                                                    <p><span className="detailsSpan">Created at :</span> {createdAtFormat.toLocaleDateString("en-GB")}</p>

                                                </div>
                                                <div>
                                                    <p><span className="detailsSpan">Created by : </span> {Task.employee.firstname} {Task.employee.lastname}</p>
                                                    <p><span className="detailsSpan">Assigned to :</span> {Task.assignedto.firstname} {Task.assignedto.lastname}</p>
                                                    <p><span className="detailsSpan">Last updated :</span> {updatedAtFormat.toLocaleDateString("en-GB")}</p>

                                                </div>


                                            </div>

                                        </div>

                                        <div className="d-flex justify-content-around mt-5 mb-5">
                                            <button className="btn btn-info" onClick={() => navigate(`/Dashboard/editTaskAdmin/${Task.id}`)}>Edit this task</button>
                                            <button className="btn btn-danger" onClick={() => navigate(`/Dashboard/listTasks`)}>Back to list</button>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default TaskDetailsAdmin;