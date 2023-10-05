import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router";
import { GetLeadById, UpdateLead} from "../../../redux/actions/LeadsActions";
import EditLeadSuccessModal from "../modals/lead/EditLeadSuccessModal";

const EditLeads = () => {
    const dataUser = JSON.parse(localStorage.getItem('user'));
    const {register, handleSubmit, formState:{errors}}= useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const Lead = useSelector(state => state.Lead.getLeadById);
    const { leadId } = useParams();


    const [isEditSuccess, setIsEditSuccess] = useState(false);


    const handleModalClose = () => {
        setIsEditSuccess(false);
        navigate("/home/lead");
        console.log("Modal closed, isEditSuccess set to false");
    };

    useEffect(() => {
        dispatch(GetLeadById(leadId))
    },[dispatch, leadId] );

    console.log(Lead)

    const submit = async(data)=>{
        var formData = new FormData();
        formData.append("salutation",data.salutation);
        formData.append("firstname",data.firstname);
        formData.append("lastname",data.lastname);
        formData.append("title",data.title);
        formData.append("company",data.company);
        formData.append("email",data.email);
        formData.append("phone",data.phone);
        formData.append("address",data.address);
        formData.append("city",data.city);
        formData.append("zipcode",data.zipcode);
        formData.append("source",data.source);
        formData.append("industry",data.industry);
        formData.append("employeenumber",data.employeenumber);
        formData.append("annualrevenue",data.annualrevenue);
        formData.append("status",data.status);
        formData.append("employeeID",dataUser.id);

        try {
            await dispatch(UpdateLead(formData,leadId));
            setIsEditSuccess(true);
            console.log("isEditSuccess:", isEditSuccess);
        }
        catch (error) {
            console.error('Registration failed:', error);
        }
    }
    return(
        <div className="AddLeadPage">
            <div className="container mt-5">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-xl-10">
                        <div className="card rounded-3 text-black">
                            <div className="row g-0">

                                <div className="card-body p-md-5 mx-md-4">

                                    {/* Display the AddLeadSuccessModal component */}
                                    <EditLeadSuccessModal show={ isEditSuccess} onClose={handleModalClose} leadId={Lead.id}/>

                                    <div className="homepage-titles creatAccountTitle">
                                        <h4 className="mt-1 mb-5 pb-1">Create a lead </h4>
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
                                                       placeholder="First name" {...register("firstname", {required: true})}
                                                       defaultValue={Lead.firstname}/>
                                                {(errors.firstname?.type) &&
                                                    <div className="alert alert-danger" role="alert">
                                                        first name is required
                                                    </div>}
                                            </div>

                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form2Example11">Last name :</label>
                                                <input type="text" id="form2Example11" className="form-control"
                                                       placeholder="Last name" defaultValue={Lead.lastname} {...register("lastname", {required: true})}/>
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
                                                       placeholder="Email" defaultValue={Lead.email} {...register("email", {
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
                                                <label className="form-label" htmlFor="form2Example11">Title :</label>
                                                <input type="text" id="form2Example11" className="form-control"
                                                       placeholder="Title" defaultValue={Lead.title} {...register("title", {required: true})}/>
                                                {(errors.title?.type) &&
                                                    <div className="alert alert-danger" role="alert">
                                                        The title is required
                                                    </div>}
                                            </div>

                                        </div>

                                        <div className="formUnit d-flex justify-content-between">

                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form2Example11">Company :</label>
                                                <input type="text" id="form2Example11" className="form-control"
                                                       placeholder="Company" defaultValue={Lead.company} {...register("company", {required: true})}/>
                                                {(errors.company?.type) &&
                                                    <div className="alert alert-danger" role="alert">
                                                        Company is required
                                                    </div>}
                                            </div>

                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form2Example11">Phone number</label>
                                                <input  type="number" id="form2Example11" className="form-control"
                                                        placeholder="12345678" defaultValue={Lead.phone} {...register("phone", { required: true, minLength: 8, maxLength:8 })}/>
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

                                        </div>

                                        <div className="formUnit d-flex justify-content-between">
                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form2Example11">Address :</label>
                                                <input type="text" id="form2Example11" className="form-control"
                                                       placeholder="Address" defaultValue={Lead.address} {...register("address", {required: true})}/>
                                                {(errors.address?.type) &&
                                                    <div className="alert alert-danger" role="alert">
                                                        Address is required
                                                    </div>}
                                            </div>

                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form2Example11">City :</label>
                                                <input type="text" id="form2Example11" className="form-control"
                                                       placeholder="city" defaultValue={Lead.city} {...register("city", {required: true})}/>
                                                {(errors.city?.type) &&
                                                    <div className="alert alert-danger" role="alert">
                                                        city is required
                                                    </div>}
                                            </div>

                                        </div>


                                        <div className="formUnit d-flex justify-content-between">

                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form2Example11">ZipCode :</label>
                                                <input type="number" id="form2Example11" className="form-control"
                                                       placeholder="zipcode" defaultValue={Lead.zipcode} {...register("zipcode", {required: true})}/>
                                                {(errors.zipcode?.type) &&
                                                    <div className="alert alert-danger" role="alert">
                                                        ZipCode is required
                                                    </div>}
                                            </div>

                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form2Example11">Source :</label>
                                                <input type="text" id="form2Example11" className="form-control"
                                                       placeholder="Source" defaultValue={Lead.source} {...register("source", {required: true})}/>
                                                {(errors.source?.type) &&
                                                    <div className="alert alert-danger" role="alert">
                                                        Source is required
                                                    </div>}
                                            </div>

                                        </div>



                                        <div className="formUnit d-flex justify-content-between">

                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form2Example11">Number of Employees :</label>
                                                <input type="number" id="form2Example11" className="form-control"
                                                       placeholder="200" defaultValue={Lead.employeenumber} {...register("employeenumber", {required: true})}/>
                                                {errors.employeenumber?.type === "required" && <div className="alert alert-danger" role="alert">
                                                    The number of employees is required
                                                </div>}

                                            </div>

                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form2Example11">Industry :</label>
                                                <input type="text" id="form2Example11" className="form-control"
                                                       placeholder="industry" defaultValue={Lead.industry} {...register("industry", {required: true})}/>
                                                {(errors.industry?.type) &&
                                                    <div className="alert alert-danger" role="alert">
                                                        Industry is required
                                                    </div>}
                                            </div>

                                        </div>

                                        <div className="formUnit d-flex justify-content-between">

                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form2Example11">Annual revenue :</label>
                                                <input type="number" id="form2Example11" className="form-control"
                                                       placeholder="200" defaultValue={Lead.annualrevenue} {...register("annualrevenue", {required: true})}/>
                                                {errors.annualrevenue?.type === "required" && <div className="alert alert-danger" role="alert">
                                                    The annual revenue is required
                                                </div>}

                                            </div>

                                        </div>



                                        <div className="d-flex justify-content-around pt-1 mb-5 pb-1">
                                            <button
                                                className="btn btn-primary btn-block fa-lg gradient-custom-1 mb-3"
                                                type="submit">Update lead
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