import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import React from "react";

const EditCampaigns = () => {
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
                                        <h4 className="mt-1 mb-5 pb-1">Edit a campaign </h4>
                                    </div>

                                    <form onSubmit={handleSubmit(submit)}>

                                        <div className="formUnit d-flex justify-content-between">
                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form2Example11">Name :</label>
                                                <input type="text" id="form2Example11" className="form-control"
                                                       placeholder="campaign name" {...register("name", {required: true})}/>
                                                {(errors.name?.type) &&
                                                    <div className="alert alert-danger" role="alert">
                                                        Campaigns' name is required
                                                    </div>}
                                            </div>

                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form2Example11">Description :</label>
                                                <input type="text" id="form2Example11" className="form-control"
                                                       placeholder="short description" {...register("description", {required: true})}/>
                                                {(errors.description?.type) &&
                                                    <div className="alert alert-danger" role="alert">
                                                        The description is required
                                                    </div>}
                                            </div>
                                        </div>


                                        <div className="formUnit d-flex justify-content-between">

                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form3Example90">Start date :</label>
                                                <input type="date" id="form3Example90"
                                                       className="form-control form-control-lg" {...register("startdate", {required: true})} />
                                                {errors.startdate?.type &&
                                                    <div className="alert alert-danger" role="alert">
                                                        Start date is required
                                                    </div>}
                                            </div>

                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form3Example90">End date :</label>
                                                <input type="date" id="form3Example90"
                                                       className="form-control form-control-lg" {...register("enddate", {required: true})} />
                                                {errors.enddate?.type &&
                                                    <div className="alert alert-danger" role="alert">
                                                        End date is required
                                                    </div>}
                                            </div>

                                        </div>


                                        <div className="formUnit d-flex justify-content-between">
                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form2Example11">Number of involved Employees :</label>
                                                <input type="number" id="form2Example11" className="form-control"
                                                       placeholder="200" {...register("employeenumber", {required: true})}/>
                                                {errors.employeenumber?.type === "required" && <div className="alert alert-danger" role="alert">
                                                    The number of involved employees is required
                                                </div>}

                                            </div>

                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form2Example11">Expected response :</label>
                                                <input type="number" id="form2Example11" className="form-control"
                                                       placeholder="200" {...register("expectedresponse", {required: true})}/>
                                                {errors.expectedresponse?.type === "required" && <div className="alert alert-danger" role="alert">
                                                    The expected response is required
                                                </div>}

                                            </div>


                                        </div>

                                        <div className="formUnit d-flex justify-content-between">
                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form2Example11">Budget :</label>
                                                <input  type="number" id="form2Example11" className="form-control"
                                                        placeholder="12345678" {...register("budget", { required: true })}/>
                                                {errors.budget?.type === "required" && <div className="alert alert-danger" role="alert">
                                                    The budget is required
                                                </div>}

                                            </div>

                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form2Example11">Actual cost</label>
                                                <input  type="number" id="form2Example11" className="form-control"
                                                        placeholder="12345678" {...register("actualcost", { required: true })}/>
                                                {errors.actualcost?.type === "required" && <div className="alert alert-danger" role="alert">
                                                    The actual cost is required
                                                </div>}

                                            </div>


                                        </div>


                                        <div className="formUnit d-flex justify-content-between">

                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form2Example11">Expected revenue</label>
                                                <input  type="number" id="form2Example11" className="form-control"
                                                        placeholder="12345678" {...register("expectedrevenue", { required: true })}/>
                                                {errors.expectedrevenue?.type === "required" && <div className="alert alert-danger" role="alert">
                                                    The expected revenue is required
                                                </div>}

                                            </div>

                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form2Example11">Campaign type :</label>
                                                <select className="form-select" {...register("type")}>
                                                    <option value="ADVERTISEMENT">Advertisement</option>
                                                    <option value="EMAIL">Emails</option>
                                                    <option value="TELEMARKETING">Telemarketing</option>
                                                    <option value="BANNERADS">Banner ads</option>
                                                    <option value="SEMINAR">Seminars</option>
                                                    <option value="PUBLICRELATIONS">Public relations</option>
                                                </select>

                                            </div>

                                        </div>

                                        <div className="formUnit d-flex justify-content-between">
                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form2Example11">Campaign status :</label>
                                                <select className="form-select" {...register("status")}>
                                                    <option value="INPROGRESS">In progress</option>
                                                    <option value="COMPLETED">Completed</option>
                                                    <option value="ABORTED">Aborted</option>
                                                    <option value="PLANNED">Planned</option>
                                                </select>

                                            </div>
                                        </div>


                                        <div className="d-flex justify-content-around pt-1 mb-5 pb-1">
                                            <button
                                                className="btn btn-primary btn-block fa-lg gradient-custom-1 mb-3"
                                                type="submit">Edit campaign
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

export default EditCampaigns;