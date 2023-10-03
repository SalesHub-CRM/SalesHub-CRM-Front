import {Link} from "react-router-dom";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {CreateGroup} from "../../../redux/actions/GroupsActions";
import AddGroupSuccessModal from "../modals/group/AddGroupSuccessModal";

const AddGroupForm = () => {
    const {register, handleSubmit, formState:{errors}}= useForm();
    const dispatch = useDispatch();
    const dataUser = JSON.parse(localStorage.getItem('user'));
    console.log(dataUser.id);

    const [showAddModal, setShowAddModal] = useState(false);

    const refreshPage = () => {
        window.location.reload();
        console.log("refresh")
    };


    const submit = async(data)=>{
        var formData = new FormData();
        formData.append("name",data.name);
        formData.append("adminId",dataUser.id);

        try {
            await dispatch(CreateGroup(formData));
            setShowAddModal(true)
        }
        catch (error) {
            console.error('Registration failed:', error);
        }

    }



    return(
        <div className="DashboardHome">
            <div className="container mt-5">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-xl-10">
                        <div className="card rounded-3 text-black">
                            <div className="row g-0">

                                <div className="card-body p-md-5 mx-md-4">

                                    {/* Display the AddLeadSuccessModal component */}
                                    <AddGroupSuccessModal show={showAddModal} onClose={() => {
                                        setShowAddModal(false);
                                        refreshPage(); // Refresh the page when the modal is closed
                                    }}
                                    />

                                    <div className="homepage-titles creatAccountTitle">
                                        <h4 className="mt-1 mb-5 pb-1">Create a Group </h4>
                                    </div>

                                    <form onSubmit={handleSubmit(submit)}>



                                        <div className="formUnit d-flex justify-content-center">
                                            <div className="form-outline col-5 mb-5">
                                                <label className="form-label" htmlFor="form2Example11">Group name :</label>
                                                <input type="text" id="form2Example11" className="form-control"
                                                       placeholder="Group name" {...register("name", {required: true})}/>
                                                {(errors.name?.type) &&
                                                    <div className="alert alert-danger" role="alert">
                                                        Group name is required
                                                    </div>}
                                            </div>

                                        </div>


                                        <div className="d-flex justify-content-around pt-1 mt-5 mb-5 pb-1">
                                            <button
                                                className="btn btn-primary btn-block fa-lg gradient-custom-1 mb-3"
                                                type="submit">Create Group
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
export default AddGroupForm;