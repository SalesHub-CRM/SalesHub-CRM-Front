import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router";
import {ListClientsByGroup} from "../../../redux/actions/ClientsActions";
import {CreateCase} from "../../../redux/actions/CasesActions";
import AddCaseSuccessModal from "../modals/case/AddCaseSuccessModal";

const AddCasesForm = () => {
    const {register, handleSubmit, formState:{errors}}= useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const Clients = useSelector(state => state.Client.ListClientsByGroup);
    const dataUser = JSON.parse(localStorage.getItem('user'));


    useEffect(()=>{

        if(!dataUser?.roles.includes("ROLE_ADMIN"))
        {
            try {
                dispatch(ListClientsByGroup(dataUser.groupId));
                setIsLoading(false);
            }

            catch (error) {
                console.error("Something went wrong:", error);
                setIsLoading(false);
            }
        }

    },[])


    console.log("user",dataUser)
    console.log("clients",Clients)


    //modal handling

    const [showAddModal, setShowAddModal] = useState(false);

    const refreshPage = () => {
        window.location.reload();
        console.log("refresh")
    };


    const submit = async(data)=>{

        let formData = new FormData();

        formData.append("subject",data.subject);
        formData.append("description",data.description);
        formData.append("type",data.type);
        formData.append("priority",data.priority);
        formData.append("clientId",data.clientId);


        try {
            await dispatch(CreateCase(formData));
            setShowAddModal(true);
        }
        catch (error) {
            console.error('Operation failed:', error);
        }

    }


    if(isLoading || (!Array.isArray(Clients) && !Clients))
    {
        return (
            <div className="DashboardHome">
                <div className="container mt-5">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-xl-10">
                            <div>
                                <h1>Loading....</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


    else
    {
        return(
            <div className="AddLeadPage">
                <div className="container mt-5">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-xl-10">
                            <div className="card rounded-3 text-black">
                                <div className="row g-0">

                                    <AddCaseSuccessModal show={showAddModal} onClose={()=>
                                    {
                                        setShowAddModal(false);
                                        refreshPage();
                                    }}/>

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


                                            <div className="formUnit d-flex justify-content-between">

                                                    <div className="form-outline col-5 mb-5">
                                                        <label className="form-label" htmlFor="form2Example11">Please
                                                            choose the client :</label>
                                                        <select className="form-select" {...register("clientId", {required: true})} defaultValue="">
                                                            <option value="" disabled>Select client</option>

                                                            {Clients && Clients.length > 0 && (
                                                                Clients?.map(client => (
                                                                    <option key={client.id} value={client.id}>

                                                                        {client.name}
                                                                    </option>
                                                                ))
                                                            )}
                                                        </select>
                                                        {errors.clientId?.type &&
                                                            <div className="alert alert-danger" role="alert">
                                                                You need to assign a client to this case
                                                            </div>}
                                                    </div>

                                            </div>



                                            <div className="d-flex justify-content-around pt-1 mb-5 mt-5 pb-1">
                                                <button
                                                    className="btn btn-primary btn-block fa-lg gradient-custom-1 mb-3"
                                                    type="submit">Create case
                                                </button>

                                                <button
                                                    className="btn btn-danger btn-block fa-lg gradient-custom-1 mb-3"
                                                    onClick={() => navigate(`/home/case`)}>Back to list
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
export default AddCasesForm;