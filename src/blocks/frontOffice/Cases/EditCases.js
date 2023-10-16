import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router";
import {CreateCase, GetCaseById, UpdateCase} from "../../../redux/actions/CasesActions";
import EditCaseSuccessModal from "../modals/case/EditCaseSuccessModal";

const EditCases = () => {
    const {register, handleSubmit, formState:{errors}}= useForm();
    const {caseId,clientId} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const Case = useSelector(state => state.Case.getCaseById);
    const [isEditSuccess, setIsEditSuccess] = useState(false);

    useEffect(()=>{

        dispatch(GetCaseById(caseId))

    },[]);

    const handleModalClose = () => {
        setIsEditSuccess(false);
        navigate(`/home/case/caseDetails/${Case.id}`);
    };

    const submit = async(data)=>{

        let formData = new FormData();

        formData.append("subject",data.subject);
        formData.append("description",data.description);
        formData.append("type",data.type);
        formData.append("priority",data.priority);
        formData.append("clientId",clientId);


        try {
            await dispatch(UpdateCase(formData,caseId));
            setIsEditSuccess(true);
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

                                <EditCaseSuccessModal show={isEditSuccess} onClose={handleModalClose} caseId={caseId}/>

                                <div className="card-body p-md-5 mx-md-4">


                                    <div className="homepage-titles creatAccountTitle">
                                        <h4 className="mt-1 mb-5 pb-1">Edit a case </h4>
                                    </div>

                                    <form onSubmit={handleSubmit(submit)}>

                                        <div className="formUnit d-flex justify-content-between">
                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form2Example11">Subject :</label>
                                                <input type="text" id="form2Example11" className="form-control"
                                                       placeholder="subject of the case" {...register("subject", {required: true})}
                                                defaultValue={Case.subject}/>
                                                {(errors.subject?.type) &&
                                                    <div className="alert alert-danger" role="alert">
                                                        Case subject is required
                                                    </div>}
                                            </div>

                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form2Example11">Description :</label>
                                                <input type="text" id="form2Example11" className="form-control"
                                                       placeholder="short description" {...register("description", {required: true})}
                                                defaultValue={Case.description}/>
                                                {(errors.description?.type) &&
                                                    <div className="alert alert-danger" role="alert">
                                                        The description is required
                                                    </div>}
                                            </div>
                                        </div>


                                        <div className="formUnit d-flex justify-content-between">

                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form2Example11">Case type :</label>
                                                <select className="form-select" {...register("type")}
                                                defaultValue={Case.type}>
                                                    <option value="PROBLEM">Problem</option>
                                                    <option value="FEATUREREQUEST">Feature request</option>
                                                    <option value="QUESTION">Question</option>

                                                </select>

                                            </div>

                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form2Example11">Case priority :</label>
                                                <select className="form-select" {...register("priority")}
                                                defaultValue={Case.priority}>
                                                    <option value="LOW">Low</option>
                                                    <option value="NORMAL">Normal</option>
                                                    <option value="HIGH">High</option>
                                                </select>

                                            </div>

                                        </div>


                                        <div className="d-flex justify-content-around pt-1 mb-5 mt-5 pb-1">
                                            <button
                                                className="btn btn-primary btn-block fa-lg gradient-custom-1 mb-3"
                                                type="submit">Edit case
                                            </button>
                                            <button className="btn btn-danger btn-block fa-lg gradient-custom-1 mb-3"
                                                    onClick={() => navigate(`/home/case/caseDetails/${Case.id}`)}>Back to details
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
export default EditCases;