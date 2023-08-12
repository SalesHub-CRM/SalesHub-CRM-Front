import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import React from "react";

const EditOpportunities = () => {
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
                                        <h4 className="mt-1 mb-5 pb-1">Edit an opportunity </h4>
                                    </div>

                                    <form onSubmit={handleSubmit(submit)}>

                                        <div className="formUnit d-flex justify-content-between">
                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form2Example11">Name :</label>
                                                <input type="text" id="form2Example11" className="form-control"
                                                       placeholder="opportunity name" {...register("name", {required: true})}/>
                                                {(errors.name?.type) &&
                                                    <div className="alert alert-danger" role="alert">
                                                        Name is required
                                                    </div>}
                                            </div>

                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form3Example90">Close date :</label>
                                                <input type="date" id="form3Example90"
                                                       className="form-control form-control-lg" {...register("closedate", {required: true})} />
                                                {errors.closedate?.type &&
                                                    <div className="alert alert-danger" role="alert">
                                                        Close date is required
                                                    </div>}
                                            </div>

                                        </div>





                                        <div className="formUnit d-flex justify-content-between">
                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form2Example11">Amount :</label>
                                                <input type="number" id="form2Example11" className="form-control"
                                                       placeholder="200" {...register("amount", {required: true})}/>
                                                {errors.amount?.type === "required" && <div className="alert alert-danger" role="alert">
                                                    The amount is required
                                                </div>}

                                            </div>

                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form2Example11">Probability (%) :</label>
                                                <input type="number" id="form2Example11" className="form-control"
                                                       placeholder="20" {...register("probability", {required: true, max:100 })}/>
                                                {errors.probability?.type === "required" && <div className="alert alert-danger" role="alert">
                                                    The probability is required
                                                </div>}
                                                {errors.probability?.type === "max" && <div className="alert alert-danger" role="alert">
                                                    The probability can't go over 100% !
                                                </div>}

                                            </div>


                                        </div>




                                        <div className="formUnit d-flex justify-content-between">

                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form2Example11">Campaign type :</label>
                                                <select className="form-select" {...register("type")}>
                                                    <option value="QUALIFICATION">Qualification</option>
                                                    <option value="PROPOSAL">Proposal</option>
                                                    <option value="NEGOTIATION">Negotiation</option>
                                                    <option value="CLOSEDWON">Closed won</option>
                                                    <option value="CLOSEDLOST">Closed lost</option>
                                                </select>

                                            </div>

                                        </div>




                                        <div className="d-flex justify-content-around pt-1 mb-5 pb-1">
                                            <button
                                                className="btn btn-primary btn-block fa-lg gradient-custom-1 mb-3"
                                                type="submit">Edit opportunity
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
export default EditOpportunities;