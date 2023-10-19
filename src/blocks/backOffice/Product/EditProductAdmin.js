import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router";
import React, {useEffect, useState} from "react";
import {GetProductById, UpdateProduct} from "../../../redux/actions/ProductsActions";
import EditProductAdminSuccessModal from "../modals/product/EditProductAdminSuccessModal";


const EditProductAdmin = () => {

    const {register, handleSubmit, formState:{errors},setError,clearErrors}= useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const {productId} = useParams();
    const Product = useSelector(state => state.Product.getProductById);
    const [isEditSuccess, setIsEditSuccess] = useState(false);

    useEffect(()=>{
        dispatch(GetProductById(productId));
    },[]);

    const handleModalClose = () => {
        setIsEditSuccess(false);
        navigate(`/Dashboard/productDetailsAdmin/${productId}`);
    };

    const validateDateOrder=(start,end)=>{
        const startDate=new Date(start);
        const endDate=new Date(end);
        return startDate<endDate;
    }


    const submit = async(data)=>{

        const isDateValid=validateDateOrder(data.productionstart,data.productionend);

        if (!isDateValid){
            setError("productionstart",{
                type:"manual",
                message:"the production start date must come before the production end date !"
            });
            return;
        }
        clearErrors("productionstart");

        var formData = new FormData();

        formData.append("name",data.name);
        formData.append("description",data.description);
        formData.append("productionstart",data.productionstart);
        formData.append("productionend",data.productionend);
        formData.append("price",data.price);
        formData.append("ownerId",user.id)

        try {
            await dispatch(UpdateProduct(formData,productId));
            setIsEditSuccess(true)
        }
        catch (error) {
            console.error('Operation failed:', error);
        }
    }


    return(
        <div className="DashboardHome">
            <div className="container mt-5">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-xl-10">
                        <div className="card rounded-3 text-black">
                            <div className="row g-0">

                                <EditProductAdminSuccessModal show={isEditSuccess} productId={productId} onClose={handleModalClose}/>

                                <div className="card-body p-md-5 mx-md-4">

                                    <div className="homepage-titles creatAccountTitle">
                                        <h4 className="mt-1 mb-5 pb-1">Update a product </h4>
                                    </div>

                                    <form onSubmit={handleSubmit(submit)}>

                                        <div className="formUnit d-flex justify-content-between">
                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form2Example11">Name :</label>
                                                <input type="text" id="form2Example11" className="form-control"
                                                       placeholder="product name" {...register("name", {required: true})}
                                                defaultValue={Product.name}/>
                                                {(errors.name?.type) &&
                                                    <div className="alert alert-danger" role="alert">
                                                        Name is required
                                                    </div>}
                                            </div>

                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form2Example11">Description :</label>
                                                <input type="text" id="form2Example11" className="form-control"
                                                       placeholder="short description" {...register("description", {required: true})}
                                                defaultValue={Product.description}/>
                                                {(errors.description?.type) &&
                                                    <div className="alert alert-danger" role="alert">
                                                        The description is required
                                                    </div>}
                                            </div>

                                        </div>

                                        <div className="formUnit d-flex justify-content-between">

                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form3Example90">Production starting date :</label>
                                                <input type="date" id="form3Example90"
                                                       className={`form-control form-control-lg ${errors.productionstart ? "is-invalid" : ""}`}
                                                       {...register("productionstart", {required: true})}
                                                       defaultValue={Product.productionstart ? new Date(Product.productionstart).toISOString().substr(0, 10) : ''}
                                                       />
                                                {errors.productionstart?.type &&
                                                    <div className="alert alert-danger" role="alert">
                                                        Production starting date is required
                                                    </div>}
                                                {errors.productionstart && (
                                                    <div className="invalid-feedback">{errors.productionstart.message}</div>
                                                )}
                                            </div>

                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form3Example90">Production ending date :</label>
                                                <input type="date" id="form3Example90"
                                                       className={`form-control form-control-lg ${errors.productionend ? "is-invalid" : ""}`}
                                                       {...register("productionend", {required: true})}
                                                       defaultValue={Product.productionend ? new Date(Product.productionend).toISOString().substr(0, 10) : ''}
                                                />
                                                {errors.productionend?.type &&
                                                    <div className="alert alert-danger" role="alert">
                                                        Production ending date is required
                                                    </div>}
                                                {errors.productionend && (
                                                    <div className="invalid-feedback">{errors.productionend.message}</div>
                                                )}
                                            </div>

                                        </div>


                                        <div className="formUnit d-flex justify-content-between">
                                            <div className="form-outline col-5 mb-4">
                                                <label className="form-label" htmlFor="form2Example11">Price :</label>
                                                <input type="number" id="form2Example11" className="form-control"
                                                       placeholder="200" {...register("price", {required: true})}
                                                defaultValue={Product.price}/>
                                                {errors.price?.type === "required" && <div className="alert alert-danger" role="alert">
                                                    The price is required
                                                </div>}

                                            </div>

                                        </div>


                                        <div className="d-flex justify-content-around pt-1 mb-5 pb-1">
                                            <button
                                                className="btn btn-primary btn-block fa-lg gradient-custom-1 mb-3"
                                                type="submit">Update product
                                            </button>

                                            <button
                                                className="btn btn-danger btn-block fa-lg gradient-custom-1 mb-3"
                                                onClick={() => navigate(`/Dashboard/productDetailsAdmin/${productId}`)}>Return to details
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

export default EditProductAdmin;