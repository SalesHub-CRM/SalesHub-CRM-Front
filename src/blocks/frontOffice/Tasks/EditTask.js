import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router";
import { GetTaskById, UpdateTask} from "../../../redux/actions/TasksActions";
import {GetGroupById, ListGroupsByAdmin} from "../../../redux/actions/GroupsActions";
import EditTaskSuccessModal from "../modals/task/EditTaskSuccessModal";

const EditTask = () => {
    const {register, handleSubmit, formState:{errors}}= useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {taskId} = useParams();
    const Task = useSelector(state => state.Task.getTaskById);
    const [isLoading, setIsLoading] = useState(true);
    const dataUser = JSON.parse(localStorage.getItem('user'));


    useEffect(()=>{
        dispatch(GetTaskById(taskId));
    },[])

    console.log("task",Task)


    const groups = useSelector(state=>state.Group.ListGroups);
    const employeeGroup = useSelector(state => state.Group.getGroupById);


    useEffect(()=>{

        try {
            if(dataUser?.roles.includes("ROLE_ADMIN"))
            {
                dispatch(ListGroupsByAdmin(dataUser.id));
                setIsLoading(false);
            }
        }
        catch (error) {
            console.error("Something went wrong:", error);
            setIsLoading(false);
        }

    },[])


    useEffect(()=>{

        try {
            if(!dataUser?.roles.includes("ROLE_ADMIN"))
            {
                dispatch(GetGroupById(dataUser.groupId));
                setIsLoading(false);
                console.log("useEffect employeeGroup",employeeGroup)
            }
        }
        catch (error) {
            console.error("Something went wrong:", error);
            setIsLoading(false);
        }


    },[])


    const [selectedGroup, setSelectedGroup] = useState(null);
    const [selectedGroupObject, setSelectedGroupObject] = useState(null);

    const groupSelectRef = useRef(null);
    const employeeSelectRef = useRef(null);

    const handleGroupSelectChange = (e) => {
        const groupId = e.target.value;
        setSelectedGroup(groupId);
    };


    useEffect(() => {

        if (selectedGroup !== "") {

            const foundGroup = groups.find(group => group.id === parseInt(selectedGroup));

            if (foundGroup && foundGroup.employees) {
                setSelectedGroupObject(foundGroup);
            } else {
                setSelectedGroupObject(null);
            }
        } else {
            setSelectedGroupObject(null);
        }
    }, [selectedGroup, groups]);

    console.log("selectedGroupObject",selectedGroupObject)

    //modal handling

    const [isEditSuccess, setIsEditSuccess] = useState(false);

    const handleModalClose = () => {
        setIsEditSuccess(false);
        navigate(`/home/task/taskDetails/${Task.id}`);
        console.log("Modal closed, isEditSuccess set to false");
    };



    const submit = async(data)=>{

        var formData = new FormData();
        formData.append("subject",data.subject);
        formData.append("comment",data.comment);
        formData.append("duedate",data.duedate);
        formData.append("status",data.status);
        formData.append("priority",data.priority);
        formData.append("employeeId",dataUser.id);

        if(!dataUser?.roles.includes("ROLE_ADMIN"))
        {
            formData.append("groupId",dataUser.groupId);
            formData.append("assignedto",data.assignedto);
            console.log(data.assignedto)
        }

        else{
            console.log("selectedGroup",selectedGroup)
            formData.append("groupId",selectedGroup);
            formData.append("assignedto",data.assignedto);
        }

        try {
            await dispatch(UpdateTask(formData,Task.id));
            setIsEditSuccess(true);
        }
        catch (error) {
            console.error('Operation failed:', error);
        }

    }


    if(isLoading || (!Array.isArray(employeeGroup) && !employeeGroup))
    {
        return (
            <div className="DashboardHome">
                <div className="container mt-5">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-xl-10">
                            <div>
                                <h1>Loading....</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    else {
        return (
            <div className="AddTaskPage">
                <div className="container mt-5">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-xl-10">
                            <div className="card rounded-3 text-black">
                                <div className="row g-0">

                                    {/* Display the AddLeadSuccessModal component */}
                                    <EditTaskSuccessModal show={ isEditSuccess} onClose={handleModalClose} taskId={Task.id}/>


                                    <div className="card-body p-md-5 mx-md-4">


                                        <div className="homepage-titles creatAccountTitle">
                                            <h4 className="mt-1 mb-5 pb-1">Create a task </h4>
                                        </div>

                                        <form onSubmit={handleSubmit(submit)}>

                                            <div className="formUnit d-flex justify-content-between">
                                                <div className="form-outline col-5 mb-4">
                                                    <label className="form-label" htmlFor="form2Example11">Subject
                                                        :</label>
                                                    <input type="text" id="form2Example11" className="form-control"
                                                           placeholder="task subject" {...register("subject", {required: true})}
                                                           defaultValue={Task.subject}/>
                                                    {(errors.subject?.type) &&
                                                        <div className="alert alert-danger" role="alert">
                                                            The task subject is required
                                                        </div>}
                                                </div>

                                                <div className="form-outline col-5 mb-4">
                                                    <label className="form-label" htmlFor="form2Example11">Commentary
                                                        :</label>
                                                    <input type="text" id="form2Example11" className="form-control"
                                                           placeholder="short commentary about the task" {...register("comment", {required: true})}
                                                    defaultValue={Task.comment}/>
                                                    {(errors.comment?.type) &&
                                                        <div className="alert alert-danger" role="alert">
                                                            The commentary is required
                                                        </div>}
                                                </div>
                                            </div>


                                            <div className="formUnit d-flex justify-content-between">

                                                <div className="form-outline col-5 mb-4">
                                                    <label className="form-label" htmlFor="form2Example11">Task status
                                                        :</label>
                                                    <select className="form-select" {...register("status")} defaultValue={Task.status}>
                                                        <option value="NOTSTARTED">Not Started</option>
                                                        <option value="INPROGRESS">In progress</option>
                                                        <option value="WAITING">Waiting</option>
                                                        <option value="COMPLETED">Completed</option>
                                                        <option value="DEFERRED">Deferred</option>
                                                    </select>

                                                </div>

                                                <div className="form-outline col-5 mb-4">
                                                    <label className="form-label" htmlFor="form2Example11">Task priority
                                                        :</label>
                                                    <select className="form-select" {...register("priority")} defaultValue={Task.priority}>
                                                        <option value="LOW">Low</option>
                                                        <option value="NORMAL">Normal</option>
                                                        <option value="HIGH">High</option>
                                                    </select>

                                                </div>

                                            </div>


                                            <div className="formUnit d-flex justify-content-between">

                                                <div className="form-outline col-5 mb-4">
                                                    <label className="form-label" htmlFor="form3Example90">Due date
                                                        :</label>
                                                    <input type="date" id="form3Example90"
                                                           className="form-control form-control-lg" {...register("duedate", {required: true})}
                                                    defaultValue={Task.duedate ? new Date(Task.duedate).toISOString().substr(0, 10) : ''}/>
                                                    {errors.duedate?.type &&
                                                        <div className="alert alert-danger" role="alert">
                                                            Due date is required
                                                        </div>}
                                                </div>

                                                {!dataUser?.roles.includes("ROLE_ADMIN") ? (
                                                    <div className="form-outline col-5 mb-5">
                                                        <label className="form-label" htmlFor="form2Example11">Please
                                                            choose the employee :</label>
                                                        <select className="form-select" {...register("assignedto", {required: true})} defaultValue={Task.assignedto}>
                                                            <option value="" disabled>Assign to an employee</option>

                                                            {employeeGroup.employees && employeeGroup.employees.length > 0 && (
                                                                employeeGroup?.employees.map(employee => (
                                                                    <option key={employee.id} value={employee.id}>

                                                                        {employee.firstname} {employee.lastname}
                                                                    </option>
                                                                ))
                                                            )}
                                                        </select>
                                                        {errors.assignedto?.type &&
                                                            <div className="alert alert-danger" role="alert">
                                                                You need to assign an employee to this task
                                                            </div>}
                                                    </div>
                                                ) : null}

                                            </div>

                                            <div className="formUnit d-flex justify-content-between">

                                                {/*Render this select if the user is an admin*/}
                                                {dataUser?.roles.includes("ROLE_ADMIN") && (
                                                    <>
                                                        <div className="form-outline col-5 mb-4">
                                                            <label className="form-label" htmlFor="form2Example11">Choose a Group:</label>
                                                            <select className="form-select" ref={groupSelectRef} onChange={handleGroupSelectChange}
                                                                    value={selectedGroup} defaultValue="">

                                                                <option value="" disabled>Select a group</option>
                                                                {groups && groups.length > 0 && (
                                                                    groups?.map(group => (
                                                                        <option key={group.id} value={group.id}>
                                                                            {group.name}
                                                                        </option>
                                                                    ))
                                                                )}
                                                            </select>
                                                        </div>
                                                        {/*Render this select when the user selects a group in the previous select*/}
                                                        {selectedGroupObject && (

                                                            <div className="form-outline col-5 mb-5">
                                                                <label className="form-label" htmlFor="form2Example11">Please choose the employee :</label>
                                                                <select className="form-select" ref={employeeSelectRef} {...register("assignedto")} defaultValue="">
                                                                    <option value="" disabled>Assign to an employee</option>

                                                                    {selectedGroupObject?.employees && selectedGroupObject?.employees.length > 0 && (
                                                                        selectedGroupObject.employees.map(employee => (
                                                                            <option key={employee.id} value={employee.id}>
                                                                                {employee.firstname} {employee.lastname}
                                                                            </option>
                                                                        ))
                                                                    )}
                                                                </select>
                                                            </div>
                                                        )}
                                                    </>
                                                )}

                                            </div>


                                            <div className="d-flex justify-content-around pt-1 mb-5 pb-1">
                                                <button
                                                    className="btn btn-primary btn-block fa-lg gradient-custom-1 mb-3"
                                                    type="submit">Update task
                                                </button>

                                            </div>

                                        </form>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }





    /*return(
        <div className="AddLeadPage">
            <div className="container mt-5">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-xl-10">
                        <div className="card rounded-3 text-black">
                            <div className="row g-0">

                                <div className="card-body p-md-5 mx-md-4">


                                    <div className="homepage-titles creatAccountTitle">
                                        <h4 className="mt-1 mb-5 pb-1">Edit a task </h4>
                                    </div>

                                    <form onSubmit={handleSubmit(submit)}>

                                        <div className="formUnit d-flex justify-content-between">
                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form2Example11">Subject :</label>
                                                <input type="text" id="form2Example11" className="form-control"
                                                       placeholder="task subject" {...register("subject", {required: true})}/>
                                                {(errors.subject?.type) &&
                                                    <div className="alert alert-danger" role="alert">
                                                        The task subject is required
                                                    </div>}
                                            </div>

                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form2Example11">Commentary :</label>
                                                <input type="text" id="form2Example11" className="form-control"
                                                       placeholder="short commentary about the task" {...register("comment", {required: true})}/>
                                                {(errors.comment?.type) &&
                                                    <div className="alert alert-danger" role="alert">
                                                        The commentary is required
                                                    </div>}
                                            </div>
                                        </div>


                                        <div className="formUnit d-flex justify-content-between">

                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form2Example11">Assigned to :</label>
                                                <select className="form-select" {...register("status")}>
                                                    <option value="emp1">Employee 1</option>
                                                    <option value="emp2">Employee 2</option>
                                                    <option value="emp3">Employee 3</option>
                                                </select>

                                            </div>

                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form3Example90">Due date :</label>
                                                <input type="date" id="form3Example90"
                                                       className="form-control form-control-lg" {...register("duedate", {required: true})} />
                                                {errors.duedate?.type &&
                                                    <div className="alert alert-danger" role="alert">
                                                        Due date is required
                                                    </div>}
                                            </div>

                                        </div>


                                        <div className="formUnit d-flex justify-content-between">

                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form2Example11">Task status :</label>
                                                <select className="form-select" {...register("status")}>
                                                    <option value="NOTSTARTED">Not Started</option>
                                                    <option value="INPROGRESS">In progress</option>
                                                    <option value="WAITING">Waiting</option>
                                                    <option value="COMPLETED">Completed</option>
                                                    <option value="DEFERRED">Deferred</option>
                                                </select>

                                            </div>

                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form2Example11">Task priority :</label>
                                                <select className="form-select" {...register("priority")}>
                                                    <option value="LOW">Low</option>
                                                    <option value="NORMAL">Normal</option>
                                                    <option value="HIGH">High</option>
                                                </select>

                                            </div>

                                        </div>


                                        <div className="d-flex justify-content-around pt-1 mb-5 pb-1">
                                            <button
                                                className="btn btn-primary btn-block fa-lg gradient-custom-1 mb-3"
                                                type="submit">Update task
                                            </button>

                                        </div>

                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )*/
}
export default EditTask;