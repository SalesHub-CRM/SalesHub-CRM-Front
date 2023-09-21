import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router";
import React, {useEffect, useState} from "react";
import {GetGroupById, UpdateGroup} from "../../../redux/actions/GroupsActions";
import {useForm} from "react-hook-form";
import EditSuccessModal from "../modals/group/EditSuccessModal";


const EditGroup = () => {

    const {register, handleSubmit, formState:{errors}}= useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const group = useSelector(state=>state.Group.getGroupById);
    const {groupId} = useParams();
    const dataUser = JSON.parse(localStorage.getItem('user'));
    //console.log(dataUser.id);

    const [isEditSuccess, setIsEditSuccess] = useState(false);


    const handleModalClose = () => {
        setIsEditSuccess(false);
        navigate("/Dashboard/listGroups");
        console.log("Modal closed, isEditSuccess set to false");
    };


    useEffect(()=>{
        dispatch(GetGroupById(groupId));
    },[dispatch,groupId]);


    const submit = async(data)=>{
        var formData = new FormData();
        formData.append("name",data.name);
        formData.append("adminId",dataUser.id);

        try {
            console.log("Updating group...");
            await dispatch(UpdateGroup(formData,group.id));
            setIsEditSuccess(true);
            console.log("Group updated successfully");
        }
        catch (error) {
            console.error('Update failed:', error);
        }

    }


    if (!group || Object.keys(group).length===0)
    {
        return (

            <div className="DashboardHome">
                <div className="container mt-5">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-xl-10">
                            <div className="card rounded-3 text-black">
                                <div className="row g-0">

                                    <div className="card-body p-md-5 mx-md-4">
                                        <h1>Loading...</h1>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }


    else {
        return(
            <div className="DashboardHome">
                <div className="container mt-5">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-xl-10">
                            <div className="card rounded-3 text-black">
                                <div className="row g-0">

                                    <div className="card-body p-md-5 mx-md-4">
                                        {/* Display the AddSuccessModal component */}
                                        <EditSuccessModal show={ isEditSuccess} onClose={handleModalClose} />

                                        <div className="homepage-titles creatAccountTitle">
                                            <h4 className="mt-1 mb-5 pb-1">Edit Group </h4>
                                        </div>

                                        <form onSubmit={handleSubmit(submit)}>



                                            <div className="formUnit d-flex justify-content-center">
                                                <div className="form-outline col-5 mb-5">
                                                    <label className="form-label" htmlFor="form2Example11">Group name :</label>
                                                    <input type="text" id="form2Example11" className="form-control"
                                                           placeholder="Group name" defaultValue={group.name} {...register("name", {required: true})}/>
                                                    {(errors.name?.type) &&
                                                        <div className="alert alert-danger" role="alert">
                                                            Group name is required
                                                        </div>}
                                                </div>

                                            </div>


                                            <div className="d-flex justify-content-around pt-1 mt-5 mb-5 pb-1">
                                                <button
                                                    className="btn btn-primary btn-block fa-lg gradient-custom-1 mb-3"
                                                    type="submit">Edit Group
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

}

export default EditGroup;