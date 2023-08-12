import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import React from "react";

const EditLeads = () => {
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
                                        <h4 className="mt-1 mb-5 pb-1">Edit a lead </h4>
                                    </div>

                                    <form onSubmit={handleSubmit(submit)}>

                                        <div className="formUnit d-flex justify-content-between">
                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form2Example11">Salutation :</label>
                                                <select className="form-select" {...register("salutation")}>
                                                    <option value="mr">Mr</option>
                                                    <option value="ms">Ms</option>
                                                </select>

                                            </div>

                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form2Example11">Status :</label>
                                                <select className="form-select" {...register("status")}>
                                                    <option value="NEW">New</option>
                                                    <option value="CONTACTED">Contacted</option>
                                                    <option value="QUALIFIED">Qualified</option>
                                                    <option value="UNQUALIFIED">Unqualified</option>
                                                    <option value="CONVERTED">Converted</option>
                                                </select>

                                            </div>
                                        </div>

                                        <div className="formUnit d-flex justify-content-between">
                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form2Example11">First name :</label>
                                                <input type="text" id="form2Example11" className="form-control"
                                                       placeholder="First name" {...register("firstname", {required: true})}/>
                                                {(errors.firstname?.type) &&
                                                    <div className="alert alert-danger" role="alert">
                                                        first name is required
                                                    </div>}
                                            </div>

                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form2Example11">Last name :</label>
                                                <input type="text" id="form2Example11" className="form-control"
                                                       placeholder="Last name" {...register("lastname", {required: true})}/>
                                                {(errors.lastname?.type) &&
                                                    <div className="alert alert-danger" role="alert">
                                                        last name is required
                                                    </div>}
                                            </div>
                                        </div>


                                        <div className="formUnit d-flex justify-content-between">

                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form2Example11">Email :</label>
                                                <input type="text" id="form2Example11" className="form-control"
                                                       placeholder="Email" {...register("email", {
                                                    required: true,
                                                    pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
                                                })}/>
                                                {errors.email?.type === "required" &&
                                                    <div className="alert alert-danger" role="alert">
                                                        email is required
                                                    </div>}
                                                {errors.email?.type === "pattern" &&
                                                    <div className="alert alert-danger" role="alert">
                                                        email format is invalid
                                                    </div>}
                                            </div>

                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form2Example11">Company :</label>
                                                <input type="text" id="form2Example11" className="form-control"
                                                       placeholder="Company" {...register("company", {required: true})}/>
                                                {(errors.company?.type) &&
                                                    <div className="alert alert-danger" role="alert">
                                                        Company is required
                                                    </div>}
                                            </div>

                                        </div>

                                        <div className="formUnit d-flex justify-content-between">
                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form2Example11">Phone number</label>
                                                <input  type="number" id="form2Example11" className="form-control"
                                                        placeholder="12345678" {...register("phone", { required: true, minLength: 8, maxLength:8 })}/>
                                                {errors.phone?.type === "required" && <div className="alert alert-danger" role="alert">
                                                    phone number is required
                                                </div>}
                                                {errors.phone?.type === "minLength" && <div className="alert alert-danger" role="alert">
                                                    the phone number must have 8 digits
                                                </div>}
                                                {errors.phone?.type === "maxLength" && <div className="alert alert-danger" role="alert">
                                                    the phone number must have 8 digits
                                                </div>}
                                            </div>

                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form2Example11">Address :</label>
                                                <input type="text" id="form2Example11" className="form-control"
                                                       placeholder="Address" {...register("address", {required: true})}/>
                                                {(errors.address?.type) &&
                                                    <div className="alert alert-danger" role="alert">
                                                        Address is required
                                                    </div>}
                                            </div>
                                        </div>


                                        <div className="formUnit d-flex justify-content-between">
                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form2Example11">City :</label>
                                                <input type="text" id="form2Example11" className="form-control"
                                                       placeholder="city" {...register("city", {required: true})}/>
                                                {(errors.city?.type) &&
                                                    <div className="alert alert-danger" role="alert">
                                                        city is required
                                                    </div>}
                                            </div>

                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form2Example11">ZipCode :</label>
                                                <input type="number" id="form2Example11" className="form-control"
                                                       placeholder="zipcode" {...register("zipcode", {required: true})}/>
                                                {(errors.zipcode?.type) &&
                                                    <div className="alert alert-danger" role="alert">
                                                        ZipCode is required
                                                    </div>}
                                            </div>
                                        </div>



                                        <div className="formUnit d-flex justify-content-between">

                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form2Example11">Source :</label>
                                                <input type="text" id="form2Example11" className="form-control"
                                                       placeholder="Source" {...register("source", {required: true})}/>
                                                {(errors.source?.type) &&
                                                    <div className="alert alert-danger" role="alert">
                                                        Source is required
                                                    </div>}
                                            </div>

                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form2Example11">Number of Employees :</label>
                                                <input type="number" id="form2Example11" className="form-control"
                                                       placeholder="200" {...register("employeenumber", {required: true})}/>
                                                {errors.employeenumber?.type === "required" && <div className="alert alert-danger" role="alert">
                                                    The number of employees is required
                                                </div>}

                                            </div>

                                        </div>

                                        <div className="formUnit d-flex justify-content-between">

                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form2Example11">Industry :</label>
                                                <input type="text" id="form2Example11" className="form-control"
                                                       placeholder="industry" {...register("industry", {required: true})}/>
                                                {(errors.industry?.type) &&
                                                    <div className="alert alert-danger" role="alert">
                                                        Industry is required
                                                    </div>}
                                            </div>

                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form2Example11">Annual revenue :</label>
                                                <input type="number" id="form2Example11" className="form-control"
                                                       placeholder="200" {...register("annualrevenue", {required: true})}/>
                                                {errors.annualrevenue?.type === "required" && <div className="alert alert-danger" role="alert">
                                                    The annual revenue is required
                                                </div>}

                                            </div>

                                        </div>

                                        <div className="d-flex justify-content-around pt-1 mb-5 pb-1">
                                            <button
                                                className="btn btn-primary btn-block fa-lg gradient-custom-1 mb-3"
                                                type="submit">Edit lead
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
export default EditLeads;