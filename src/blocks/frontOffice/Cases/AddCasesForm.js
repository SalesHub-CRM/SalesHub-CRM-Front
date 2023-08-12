import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import React from "react";

const AddCasesForm = () => {
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
                                        <h4 className="mt-1 mb-5 pb-1">Create a case </h4>
                                    </div>

                                    <form onSubmit={handleSubmit(submit)}>

                                        <div className="formUnit d-flex justify-content-between">
                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form2Example11">Subject :</label>
                                                <input type="text" id="form2Example11" className="form-control"
                                                       placeholder="subject of the case" {...register("subject", {required: true})}/>
                                                {(errors.subject?.type) &&
                                                    <div className="alert alert-danger" role="alert">
                                                        Case subject is required
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
                                                <label className="form-label" htmlFor="form2Example11">Case type :</label>
                                                <select className="form-select" {...register("type")}>
                                                    <option value="PROBLEM">Problem</option>
                                                    <option value="FEATUREREQUEST">Feature request</option>
                                                    <option value="QUESTION">Question</option>

                                                </select>

                                            </div>

                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form2Example11">Case priority :</label>
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
                                                type="submit">Create case
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
export default AddCasesForm;