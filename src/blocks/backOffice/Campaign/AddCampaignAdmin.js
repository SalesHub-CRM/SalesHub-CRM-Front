import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {useNavigate, useParams} from "react-router";
import React, {useState} from "react";
import {CreateCampaign} from "../../../redux/actions/CampaignsActions";
import AddCampaignAdminSuccessModal from "../modals/campaignsAdmin/AddCampaignAdminSuccessModal";


const AddCampaignAdmin = () => {

    const {register, handleSubmit, formState:{errors},setError,clearErrors}= useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {productId} = useParams();
    const [showAddModal, setShowAddModal] = useState(false);

    const validateDateOrder=(start,end)=>{
        const startDate=new Date(start);
        const endDate=new Date(end);
        return startDate<endDate;
    }


    const submit = async(data)=>{
        const isDateValid=validateDateOrder(data.startdate,data.enddate);

        if (!isDateValid){
            setError("startdate",{
                type:"manual",
                message:"the start date must come before the end date !"
            });
            return;
        }
        clearErrors("startdate");

        let formData = new FormData();

        formData.append("name",data.name);
        formData.append("description",data.description);
        formData.append("startdate",data.startdate);
        formData.append("enddate",data.enddate);
        formData.append("employeenumber",data.employeenumber);
        formData.append("expectedresponse",data.expectedresponse);
        formData.append("budget",data.budget);
        formData.append("actualcost",data.actualcost);
        formData.append("expectedrevenue",data.expectedrevenue);
        formData.append("type",data.type);
        formData.append("status",data.status);
        formData.append("productId",productId);

        try {
            await dispatch(CreateCampaign(formData));
            setShowAddModal(true);
        }
        catch (error) {
            console.error('Operation failed:', error);
        }

    }

    const refreshPage = () => {
        window.location.reload();
    };


    return(
        <div className="DashboardHome">
            <div className="container mt-5">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-xl-10">
                        <div className="card rounded-3 text-black">
                            <div className="row g-0">


                                <AddCampaignAdminSuccessModal productId={productId} show={showAddModal}
                                onClose={()=>{
                                    setShowAddModal(false);
                                    refreshPage()}}/>


                                <div className="card-body p-md-5 mx-md-4">


                                    <div className="homepage-titles creatAccountTitle">
                                        <h4 className="mt-1 mb-5 pb-1">Create a campaign </h4>
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
                                                       className={`form-control form-control-lg ${errors.startdate ? "is-invalid" : ""}`}
                                                       {...register("startdate", {required: true})} />
                                                {errors.startdate?.type &&
                                                    <div className="alert alert-danger" role="alert">
                                                        Start date is required
                                                    </div>}
                                                {errors.startdate && !errors.startdate?.type && (
                                                    <div className="alert alert-danger">{errors.startdate.message}</div>
                                                )}
                                            </div>

                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form3Example90">End date :</label>
                                                <input type="date" id="form3Example90"
                                                       className={`form-control form-control-lg ${errors.enddate ? "is-invalid" : ""}`}
                                                       {...register("enddate", {required: true})} />
                                                {errors.enddate?.type &&
                                                    <div className="alert alert-danger" role="alert">
                                                        End date is required
                                                    </div>}
                                                {errors.enddate && !errors.enddate?.type && (
                                                    <div className="invalid-feedback">{errors.enddate.message}</div>
                                                )}
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


                                        <div className="d-flex justify-content-around pt-1 mb-5 mt-5 pb-1">
                                            <button
                                                className="btn btn-primary btn-block fa-lg gradient-custom-1 mb-3"
                                                type="submit">Create campaign
                                            </button>

                                            <button
                                                className="btn btn-danger btn-block fa-lg gradient-custom-1 mb-3" onClick={() => navigate(`/Dashboard/productDetailsAdmin/${productId}`)}>
                                                Back to product details
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

export default AddCampaignAdmin;