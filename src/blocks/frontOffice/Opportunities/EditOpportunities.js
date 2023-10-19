import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router";
import {GetOpportunityById, UpdateOpportunity} from "../../../redux/actions/OpportunitiesActions";
import {GetProductById} from "../../../redux/actions/ProductsActions";
import {GetClientById} from "../../../redux/actions/ClientsActions";
import EditOppSuccessModal from "../modals/opportunity/EditOppSuccessModal";

const EditOpportunities = () => {
    const {register, handleSubmit, formState:{errors}}= useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {oppId} = useParams();
    const Opportunity = useSelector(state => state.Opportunity.getOpportunityById);
    const Product = useSelector(state => state.Product.getProductById);
    const Client = useSelector(state => state.Client.getClientById);
    const user =JSON.parse(localStorage.getItem('user'));
    const [isEditSuccess, setIsEditSuccess] = useState(false);


    useEffect(()=>{
        dispatch(GetOpportunityById(oppId))
    },[]);


    useEffect(()=>{
        if(Opportunity.productId)
        {
            dispatch(GetProductById(Opportunity.productId));
        }
    },[Opportunity.productId])

    useEffect(()=>{
        if(Opportunity.clientId)
        {
            dispatch(GetClientById(Opportunity.clientId));
        }
    },[Opportunity.clientId]);


    const handleModalClose = () => {
        setIsEditSuccess(false);
        navigate(`/home/opportunity/OppDetails/${oppId}`);
    };


    const submit = async(data)=>{

        let formData = new FormData();

        formData.append("name",data.name);
        formData.append("closedate",data.closedate);
        formData.append("amount",data.amount);
        formData.append("probability",data.probability);
        formData.append("stage",data.stage);
        formData.append("employeeId",user.id);
        formData.append("clientId",Opportunity.clientId);
        formData.append("productId",Opportunity.productId);

        try {
            await dispatch(UpdateOpportunity(formData,oppId));
            setIsEditSuccess(true);
        }
        catch (error) {
            console.error('Operation failed:', error);
        }

    }

    console.log("Opportunity",Opportunity)

    if(Object.keys(Opportunity).length===0 || Object.keys(Product).length===0 || Object.keys(Client).length===0)
    {
        return(
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }


    else{
        return(
            <div className="AddLeadPage">
                <div className="container mt-5">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-xl-10">
                            <div className="card rounded-3 text-black">
                                <div className="row g-0">

                                    <EditOppSuccessModal show={isEditSuccess} oppId={oppId} onClose={handleModalClose}/>

                                    <div className="card-body p-md-5 mx-md-4">


                                        <div className="homepage-titles creatAccountTitle">
                                            <h4 className="mt-1 mb-5 pb-1">Edit an opportunity </h4>
                                        </div>

                                        <div className="mb-5 mt-5 d-flex justify-content-around">
                                            <p><span className="detailsSpan">For client : </span>{Client.name}</p>
                                            <p><span className="detailsSpan">About product : </span>{Product.name}</p>
                                        </div>

                                        <form onSubmit={handleSubmit(submit)}>

                                            <div className="formUnit d-flex justify-content-between">
                                                <div className="form-outline col-5 mb-4">
                                                    <label className="form-label" htmlFor="form2Example11">Name :</label>
                                                    <input type="text" id="form2Example11" className="form-control"
                                                           placeholder="opportunity name" defaultValue={Opportunity.name}
                                                           {...register("name", {required: true})}/>
                                                    {(errors.name?.type) &&
                                                        <div className="alert alert-danger" role="alert">
                                                            Name is required
                                                        </div>}
                                                </div>

                                                <div className="form-outline col-5 mb-4">
                                                    <label className="form-label" htmlFor="form3Example90">Close date :</label>
                                                    <input type="date" id="form3Example90"
                                                           className="form-control form-control-lg" defaultValue={Opportunity.closedate ? new Date(Opportunity.closedate).toISOString().substr(0, 10) : ''}
                                                           {...register("closedate", {required: true})} />
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
                                                           placeholder="200" defaultValue={Opportunity.amount}
                                                           {...register("amount", {required: true})}/>
                                                    {errors.amount?.type === "required" && <div className="alert alert-danger" role="alert">
                                                        The amount is required
                                                    </div>}

                                                </div>

                                                <div className="form-outline col-5 mb-4">
                                                    <label className="form-label" htmlFor="form2Example11">Probability (%) :</label>
                                                    <input type="number" id="form2Example11" className="form-control"
                                                           placeholder="20" defaultValue={Opportunity.probability}
                                                           {...register("probability", {required: true, max:100 })}/>
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
                                                    <label className="form-label" htmlFor="form2Example11">Opportunity stage :</label>
                                                    <select className="form-select" defaultValue={Opportunity.stage}
                                                            {...register("stage")}>
                                                        <option value="QUALIFICATION">Qualification</option>
                                                        <option value="PROPOSAL">Proposal</option>
                                                        <option value="NEGOTIATION">Negotiation</option>
                                                        <option value="CLOSEDWON">Closed won</option>
                                                        <option value="CLOSEDLOST">Closed lost</option>
                                                    </select>

                                                </div>

                                            </div>




                                            <div className="d-flex justify-content-around pt-1 mb-5 mt-5 pb-1">
                                                <button
                                                    className="btn btn-primary btn-block fa-lg gradient-custom-1 mb-3"
                                                    type="submit">Edit opportunity
                                                </button>

                                                <button
                                                    className="btn btn-danger btn-block fa-lg gradient-custom-1 mb-3"
                                                    onClick={() => navigate(`/home/opportunity/OppDetails/${oppId}`)}>Back to details
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
export default EditOpportunities;