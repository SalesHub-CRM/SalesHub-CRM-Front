import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import React from "react";

const EditTask = () => {
    const {register, handleSubmit, formState:{errors}}= useForm();
    const dispatch = useDispatch();
    const submit = async(data)=>{

    }
    return(
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
                                                type="submit">Edit task
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
export default EditTask;