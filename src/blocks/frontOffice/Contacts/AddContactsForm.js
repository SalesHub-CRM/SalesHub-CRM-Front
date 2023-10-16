import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import Footer from "../Footer";
import React, {useState} from "react";
import {useNavigate, useParams} from "react-router";
import {CreateContact} from "../../../redux/actions/ContactsActions";
import AddContactSuccessModal from "../modals/contact/AddContactSuccessModal";
import {Link} from "react-router-dom";


const AddContactsForm = () => {
    const {register, handleSubmit, formState:{errors}}= useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {clientId} = useParams();

    const [showAddModal, setShowAddModal] = useState(false);

    const refreshPage = () => {
        window.location.reload();
        console.log("refresh")
    };

    const submit = async(data)=>{

        let formData = new FormData();

        formData.append("salutation",data.salutation);
        formData.append("title",data.title);
        formData.append("firstname",data.firstname);
        formData.append("lastname",data.lastname);
        formData.append("email",data.email);
        formData.append("company",data.company);
        formData.append("phone",data.phone);
        formData.append("address",data.address);
        formData.append("address2",data.address2);
        formData.append("city",data.city);
        formData.append("zipcode",data.zipcode);
        formData.append("clientId",clientId);

        try {
            await dispatch(CreateContact(formData));
            setShowAddModal(true);
        }
        catch (error) {
            console.error('Operation failed:', error);
        }

    }


    return(
        <div className="AddContactPage">
            <div className="container mt-5">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-xl-10">
                        <div className="card rounded-3 text-black">
                            <div className="row g-0">

                                <AddContactSuccessModal show={showAddModal} onClose={() => {
                                    setShowAddModal(false);
                                    refreshPage();
                                }} clientId={clientId}
                                />

                                <div className="card-body p-md-5 mx-md-4">

                                    <div className="homepage-titles creatAccountTitle">
                                        <h4 className="mt-1 mb-5 pb-1">Create a contact </h4>
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
                                                <label className="form-label" htmlFor="form2Example11">Title :</label>
                                                <input type="text" id="form2Example11" className="form-control"
                                                       placeholder="Title" {...register("title", {required: true})}/>
                                                {(errors.title?.type) &&
                                                    <div className="alert alert-danger" role="alert">
                                                        first name is required
                                                    </div>}
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

                                        </div>

                                        <div className="formUnit d-flex justify-content-between">

                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form2Example11">Address :</label>
                                                <input type="text" id="form2Example11" className="form-control"
                                                       placeholder="Address" {...register("address", {required: true})}/>
                                                {(errors.address?.type) &&
                                                    <div className="alert alert-danger" role="alert">
                                                        Address is required
                                                    </div>}
                                            </div>

                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form2Example11">Second address :</label>
                                                <input type="text" id="form2Example11" className="form-control"
                                                       placeholder="Second address" {...register("address2", {required: true})}/>
                                                {(errors.address2?.type) &&
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


                                        <div className="d-flex justify-content-around pt-1 mb-5 mt-5 pb-1">
                                            <button
                                                className="btn btn-primary btn-block fa-lg gradient-custom-1 mb-3"
                                                type="submit">Create contact
                                            </button>

                                            <button className="btn btn-danger btn-block fa-lg gradient-custom-1 mb-3"
                                                    onClick={() => navigate(`/home/client/clientDetails/${clientId}`)}>Return to client
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

export default AddContactsForm;