import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router";
import React, {useEffect} from "react";
import {GetProductById} from "../../../redux/actions/ProductsActions";


const ProductDetailsAdmin = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {productId} = useParams();
    const Product = useSelector(state => state.Product.getProductById);


    useEffect(()=>{
        dispatch(GetProductById(productId))
    },[])

    console.log(Product)

    const currentDate = new Date();
    const prodStartFormat = new Date(Product.productionstart);
    const prodEndFormat = new Date(Product.productionend);
    const createdFormat = new Date(Product.createdat);
    const updatedFormat = new Date(Product.updatedat);


    if(Object.keys(Product).length===0)
    {
        return(
            <div className="DashboardHome">
                <div className="container mt-5">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-xl-10">
                            <div>
                                <h1>Loading...</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    else{
        return(

            <div className="DashboardHome">
                <div className="container mt-5">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-xl-10">
                            <div className="card rounded-3 text-black mb-5">
                                <div className="row g-0">

                                    <div className="card-body p-md-5 mx-md-4">


                                        {/*img and general info*/}
                                        <div className="d-flex justify-content-around taskDetMarg">

                                            <div>
                                                <img className="leadImage" src="/assets/images/productIcon1.png" alt="user icon"/>
                                            </div>


                                            <div>

                                                <h2><span style={{fontWeight:"650"}}>Product :</span>  <span style={{fontWeight:"400"}}>{Product.name}</span></h2>

                                                <div className="mt-5 mb-5">
                                                    <h4><span style={{fontWeight:"650"}}>Start of production :</span>  <span style={{fontWeight:"400"}}>{prodStartFormat.toLocaleDateString("en-GB")}</span></h4>
                                                    <h4><span style={{fontWeight:"650"}}>End of production :</span>  <span style={{fontWeight:"400"}}>{prodEndFormat.toLocaleDateString("en-GB")}</span></h4>
                                                </div>
                                                {
                                                    currentDate>prodEndFormat &&
                                                    <h3 style={{color:"red"}}>This product is no longer in production</h3>
                                                }

                                            </div>
                                        </div>

                                        {/*other details*/}

                                        <h2 className="text-center">Additional information</h2>


                                        <div className=" mt-5">

                                                <p><span className="detailsSpan">Price  :</span> {Product.price}</p>
                                                <p><span className="detailsSpan">Description  :</span> {Product.description}</p>
                                                <p><span className="detailsSpan">Created at :</span> {createdFormat.toLocaleDateString("en-GB")}</p>
                                                <p><span className="detailsSpan">Last updated :</span> {updatedFormat.toLocaleDateString("en-GB")}</p>
                                                <p><span className="detailsSpan">Number of associated opportunities :</span> {Product.opportunities.length}</p>
                                                <p><span className="detailsSpan">Number of associated campaigns :</span> {Product.campaigns.length}</p>

                                        </div>


                                        <div className="d-flex justify-content-around mt-5 mb-5">
                                            <button className="btn btn-info" onClick={() => navigate(`/Dashboard/editProductAdmin/${productId}`)}>Edit this product</button>
                                            <button className="btn btn-danger" onClick={() => navigate(`/Dashboard/listProductsAdmin`)}>Back to list</button>
                                        </div>

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

export default ProductDetailsAdmin;