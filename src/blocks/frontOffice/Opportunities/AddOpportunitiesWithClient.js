import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router";
import React, {useEffect, useState} from "react";
import {ListProductsByGroupOwner} from "../../../redux/actions/ProductsActions";
import {CreateOpportunity} from "../../../redux/actions/OpportunitiesActions";
import AddOppProdSuccessModal from "../modals/opportunity/AddOppProdSuccessModal";
import AddOppClientSuccessModal from "../modals/opportunity/AddOppClientSuccessModal";


const AddOpportunitiesWithClient = () => {

    const {register, handleSubmit, formState:{errors}}= useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {clientId} = useParams();
    const [showAddModal, setShowAddModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const Products = useSelector(state => state.Product.ListProductsByGroupAdmin);

    const currentDate = new Date().toISOString().split("T")[0];

    useEffect(()=>{
        try {
            if(user){
                dispatch(ListProductsByGroupOwner(user.groupId));
                setIsLoading(false);
            }
        }
        catch (error){
            console.error("Something went wrong:", error);
            setIsLoading(false);
        }
    },[])


    console.log("products",Products)

    const refreshPage = () => {
        window.location.reload();
        console.log("refresh")
    };


    const submit = async(data)=>{

        let formData = new FormData();

        formData.append("name",data.name);
        formData.append("closedate",data.closedate);
        formData.append("amount",data.amount);
        formData.append("probability",data.probability);
        formData.append("stage",data.stage);
        formData.append("employeeId",user.id);
        formData.append("clientId",clientId);
        formData.append("productId",data.productId);

        try {
            await dispatch(CreateOpportunity(formData));
            setShowAddModal(true);
        }
        catch (error) {
            console.error('Operation failed:', error);
        }

    }


    if(isLoading)
    {
        return (
            <div>
                <h1>Loading....</h1>
            </div>
        );
    }



    else {
        return(
            <div className="AddOpportunityPage">
                <div className="container mt-5">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-xl-10">
                            <div className="card rounded-3 text-black">
                                <div className="row g-0">


                                    <AddOppClientSuccessModal show={showAddModal} productId={clientId}
                                                            onClose={()=>
                                                            {
                                                                setShowAddModal(false);
                                                                refreshPage();
                                                            }}/>


                                    <div className="card-body p-md-5 mx-md-4">

                                        <div className="homepage-titles creatAccountTitle">
                                            <h4 className="mt-1 mb-5 pb-1">Create an opportunity </h4>
                                        </div>

                                        <form onSubmit={handleSubmit(submit)}>

                                            <div className="formUnit d-flex justify-content-between">
                                                <div className="form-outline col-5 mb-4">
                                                    <label className="form-label" htmlFor="form2Example11">Name :</label>
                                                    <input type="text" id="form2Example11" className="form-control"
                                                           placeholder="opportunity name" {...register("name", {required: true})}/>
                                                    {(errors.name?.type) &&
                                                        <div className="alert alert-danger" role="alert">
                                                            Name is required
                                                        </div>}
                                                </div>

                                                <div className="form-outline col-5 mb-4">
                                                    <label className="form-label" htmlFor="form3Example90">Close date :</label>
                                                    <input type="date" id="form3Example90"
                                                           className="form-control form-control-lg" {...register("closedate", {required: true,min: currentDate})} />
                                                    {errors.closedate?.type &&
                                                        <div className="alert alert-danger" role="alert">
                                                            Close date is required
                                                        </div>}
                                                    {errors.closedate?.type === "min" && (
                                                        <div className="alert alert-danger" role="alert">
                                                            Close date cannot be before the current date
                                                        </div>
                                                    )}
                                                </div>

                                            </div>

                                            <div className="formUnit d-flex justify-content-between">
                                                <div className="form-outline col-5 mb-4">
                                                    <label className="form-label" htmlFor="form2Example11">Amount :</label>
                                                    <input type="number" id="form2Example11" className="form-control"
                                                           placeholder="200" {...register("amount", {required: true})}/>
                                                    {errors.amount?.type === "required" && <div className="alert alert-danger" role="alert">
                                                        The amount is required
                                                    </div>}

                                                </div>

                                                <div className="form-outline col-5 mb-4">
                                                    <label className="form-label" htmlFor="form2Example11">Probability (%) :</label>
                                                    <input type="number" id="form2Example11" className="form-control"
                                                           placeholder="20" {...register("probability", {required: true, max:100, min:0 })}/>
                                                    {errors.probability?.type === "required" && <div className="alert alert-danger" role="alert">
                                                        The probability is required
                                                    </div>}
                                                    {errors.probability?.type === "max" && <div className="alert alert-danger" role="alert">
                                                        The probability can't go over 100% !
                                                    </div>}
                                                    {errors.probability?.type === "min" && <div className="alert alert-danger" role="alert">
                                                        The probability can't go below 0% !
                                                    </div>}

                                                </div>


                                            </div>




                                            <div className="formUnit d-flex justify-content-between">

                                                <div className="form-outline col-5 mb-4">
                                                    <label className="form-label" htmlFor="form2Example11">Opportunity stage :</label>
                                                    <select className="form-select" {...register("stage")}>
                                                        <option value="QUALIFICATION">Qualification</option>
                                                        <option value="PROPOSAL">Proposal</option>
                                                        <option value="NEGOTIATION">Negotiation</option>
                                                        <option value="CLOSEDWON">Closed won</option>
                                                        <option value="CLOSEDLOST">Closed lost</option>
                                                    </select>
                                                </div>


                                                <div className="form-outline col-5 mb-5">
                                                    <label className="form-label" htmlFor="form2Example11">Please
                                                        choose the product :</label>
                                                    <select className="form-select" {...register("productId", {required: true})} defaultValue="">
                                                        <option value="" disabled>Assign to a product</option>

                                                        {Products && Products.length > 0 && (
                                                            Products?.map(product => (
                                                                <option key={product.id} value={product.id}>

                                                                    {product.name}
                                                                </option>
                                                            ))
                                                        )}
                                                    </select>
                                                    {errors.productId?.type &&
                                                        <div className="alert alert-danger" role="alert">
                                                            You need to assign a product to this opportunity
                                                        </div>}
                                                </div>


                                            </div>




                                            <div className="d-flex justify-content-around pt-1 mb-5 mt-5 pb-1">
                                                <button
                                                    className="btn btn-primary btn-block fa-lg gradient-custom-1 mb-3"
                                                    type="submit">Create opportunity
                                                </button>

                                                <button
                                                    className="btn btn-danger btn-block fa-lg gradient-custom-1 mb-3" onClick={() => navigate(`/home/client/clientDetails/${clientId}`)}>
                                                    Back to client details
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

export default AddOpportunitiesWithClient;