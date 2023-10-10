import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import Footer from "../Footer";
import React, {useEffect, useRef, useState} from "react";
import {ListGroupsByAdmin} from "../../../redux/actions/GroupsActions";
import {CreateClient} from "../../../redux/actions/ClientsActions";
import AddClientSuccessModal from "../modals/client/AddClientSuccessModal";
import {useNavigate} from "react-router";

const AddClientsForm = () => {
    const {register, handleSubmit, formState:{errors}}= useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const dataUser = JSON.parse(localStorage.getItem('user'));
    const groups = useSelector(state=>state.Group.ListGroups);


    useEffect(()=>{
        if(dataUser?.roles.includes("ROLE_ADMIN"))
        {
            dispatch(ListGroupsByAdmin(dataUser.id));
        }
    },[])


    const groupSelectRef = useRef(null);

    const [showAddModal, setShowAddModal] = useState(false);

    const refreshPage = () => {
        window.location.reload();
        console.log("refresh")
    };



    const submit = async(data)=>{

        let formData = new FormData();

        formData.append("name",data.name);
        formData.append("parentname",data.parentname);
        formData.append("email",data.email);
        formData.append("website",data.website);
        formData.append("phone",data.phone);
        formData.append("fax",data.fax);
        formData.append("employeenumber",data.employeenumber);
        formData.append("annualrevenue",data.annualrevenue);
        formData.append("industry",data.industry);
        formData.append("type",data.type);
        formData.append("shippingaddress",data.shippingaddress);
        formData.append("billingaddress",data.billingaddress);
        formData.append("employeeId",dataUser.id);

        if(dataUser?.roles.includes("ROLE_ADMIN"))
        {
            const selectedGroupId = groupSelectRef.current.value;
            formData.append("groupId",selectedGroupId)
            console.log("group id adm",selectedGroupId)
        }
        else {
            formData.append("groupId",dataUser.groupId)
            console.log("group id emp",dataUser.groupId)
        }

        try {
            await dispatch(CreateClient(formData));
            setShowAddModal(true)
        }
        catch (error) {
            console.error('Operation failed:', error);
        }
    }



    return(
        <div className="AddLeadPage">
            <div className="container mt-5">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-xl-10">
                        <div className="card rounded-3 text-black">
                            <div className="row g-0">
                                {/* Display the success modal */}
                                <AddClientSuccessModal show={showAddModal} onClose={() => {
                                    setShowAddModal(false);
                                    refreshPage();
                                }}
                                />

                                <div className="card-body p-md-5 mx-md-4">


                                    <div className="homepage-titles creatAccountTitle">
                                        <h4 className="mt-1 mb-5 pb-1">Create a client </h4>
                                    </div>

                                    <form onSubmit={handleSubmit(submit)}>

                                        <div className="formUnit d-flex justify-content-between">
                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form2Example11">Name :</label>
                                                <input type="text" id="form2Example11" className="form-control"
                                                       placeholder="Client name" {...register("name", {required: true})}/>
                                                {(errors.name?.type) &&
                                                    <div className="alert alert-danger" role="alert">
                                                        Clients' name is required
                                                    </div>}
                                            </div>

                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form2Example11">Parent company :</label>
                                                <input type="text" id="form2Example11" className="form-control"
                                                       placeholder="Parent company" {...register("parentname", {required: true})}/>
                                                {(errors.parentname?.type) &&
                                                    <div className="alert alert-danger" role="alert">
                                                        The parent company is required
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
                                                <label className="form-label" htmlFor="form2Example11">Website :</label>
                                                <input type="text" id="form2Example11" className="form-control"
                                                       placeholder="www.company.com" {...register("website", {required: true})}/>
                                                {(errors.website?.type) &&
                                                    <div className="alert alert-danger" role="alert">
                                                        The company website is required
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
                                                <label className="form-label" htmlFor="form2Example11">Fax number</label>
                                                <input  type="number" id="form2Example11" className="form-control"
                                                        placeholder="12345678" {...register("fax", { required: true, minLength: 8, maxLength:8 })}/>
                                                {errors.fax?.type === "required" && <div className="alert alert-danger" role="alert">
                                                    Fax number is required
                                                </div>}
                                                {errors.fax?.type === "minLength" && <div className="alert alert-danger" role="alert">
                                                    the Fax number must have 8 digits
                                                </div>}
                                                {errors.fax?.type === "maxLength" && <div className="alert alert-danger" role="alert">
                                                    the Fax number must have 8 digits
                                                </div>}
                                            </div>


                                        </div>


                                        <div className="formUnit d-flex justify-content-between">
                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form2Example11">Number of Employees :</label>
                                                <input type="number" id="form2Example11" className="form-control"
                                                       placeholder="200" {...register("employeenumber", {required: true})}/>
                                                {errors.employeenumber?.type === "required" && <div className="alert alert-danger" role="alert">
                                                    The number of employees is required
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
                                                <label className="form-label" htmlFor="form2Example11">Client type :</label>
                                                <select className="form-select" {...register("type")}>
                                                    <option value="ANALYST">Analyst</option>
                                                    <option value="COMPETITOR">Competitor</option>
                                                    <option value="CUSTOMER">Customer</option>
                                                    <option value="INVESTOR">Investor</option>
                                                    <option value="PARTNER">Partner</option>
                                                </select>

                                            </div>

                                        </div>

                                        <div className="formUnit d-flex justify-content-between">
                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form2Example11">Shipping address :</label>
                                                <input type="text" id="form2Example11" className="form-control"
                                                       placeholder="address" {...register("shippingaddress", {required: true})}/>
                                                {(errors.shippingaddress?.type) &&
                                                    <div className="alert alert-danger" role="alert">
                                                        Shipping address is required
                                                    </div>}
                                            </div>

                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form2Example11">Billing address :</label>
                                                <input type="text" id="form2Example11" className="form-control"
                                                       placeholder="address" {...register("billingaddress", {required: true})}/>
                                                {(errors.billingaddress?.type) &&
                                                    <div className="alert alert-danger" role="alert">
                                                        Billing address is required
                                                    </div>}
                                            </div>
                                        </div>

                                        <div className="formUnit d-flex justify-content-center">

                                            {dataUser?.roles.includes("ROLE_ADMIN") ? (
                                                <div className="form-outline col-5 mb-5">
                                                    <label className="form-label" htmlFor="form2Example11">Please choose the group :</label>
                                                    <select className="form-select" ref={groupSelectRef} defaultValue="">
                                                        <option value="" disabled>Select a group</option>
                                                        {groups?.map(group => (
                                                            <option key={group.id} value={group.id}>{group.name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            ) : null}

                                        </div>

                                        <div className="d-flex justify-content-around pt-1 mb-5 mt-5 pb-1">
                                            <button
                                                className="btn btn-primary btn-block fa-lg gradient-custom-1 mb-3"
                                                type="submit">Create client
                                            </button>

                                            <button
                                                className="btn btn-danger btn-block fa-lg gradient-custom-1 mb-3"
                                                onClick={() => navigate(`/home/client`)}>Back to list
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
export default AddClientsForm;