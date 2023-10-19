import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router";
import React, {useEffect} from "react";
import {GetOpportunityById} from "../../../redux/actions/OpportunitiesActions";
import {GetProductById} from "../../../redux/actions/ProductsActions";
import {GetClientById} from "../../../redux/actions/ClientsActions";


const OpportunityDetails = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {oppId} = useParams();
    const Opportunity = useSelector(state => state.Opportunity.getOpportunityById);
    const Product = useSelector(state => state.Product.getProductById);
    const Client = useSelector(state => state.Client.getClientById);
    const user =JSON.parse(localStorage.getItem('user'));


    useEffect(()=>{
        dispatch(GetOpportunityById(oppId))
    },[])

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
    },[Opportunity.clientId])


    console.log("Opportunity",Opportunity)
    console.log("Product",Product)
    console.log("Client",Client)


    const createdFormat = new Date(Opportunity.createdat);
    const updatedFormat = new Date(Opportunity.updatedat);
    const closedFormat = new Date(Opportunity.closedate);
    const currentDate = new Date();



    const formattedStage=(stage)=>{
        if(stage ==="CLOSEDWON")
        {
            return "Closed won";
        }
        else if(stage ==="CLOSEDLOST")
        {
            return "Closed lost";
        }
        else
        {
            return stage.charAt(0).toUpperCase() + stage.slice(1).toLowerCase();
        }
    }

    const stageResults=(stage)=>{
        if(stage ==="CLOSEDWON")
        {
            return "We won this opportunity";
        }
        else
        {
            return "We lost this opportunity";
        }
    }


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

            <div>

                <div className="card-body p-md-5 mx-md-4">

                    {/*img and general info*/}
                    <div className="d-flex justify-content-around taskDetMarg">

                        <div>
                            <img className="leadImage" src="/assets/images/opportunity1.png" alt="user icon"/>
                        </div>

                        <div>

                            <h2><span style={{fontWeight:"650"}}>Opportunity :</span>  <span style={{fontWeight:"400"}}>{Opportunity.name}</span></h2>

                            <div className="information mt-5 mb-5">

                                {currentDate>closedFormat ? (
                                    <>
                                        <h3 style={{color:"red"}}>This opportunity was closed on {closedFormat.toLocaleDateString("en-GB")}</h3>
                                        <h2 style={{color : Opportunity.stage==="CLOSEDWON" ? "green" : "red"}}>{stageResults(Opportunity.stage)}</h2>
                                    </>
                                ) : (
                                    <>
                                        <h4><span style={{fontWeight:"650"}}>Closing date :</span>  <span style={{fontWeight:"400"}}>{closedFormat.toLocaleDateString("en-GB")}</span></h4>
                                        <h4><span style={{fontWeight:"650"}}>Probability :</span>  <span style={{fontWeight:"400"}}>{Opportunity.probability} %</span></h4>
                                        <h4><span style={{fontWeight:"650"}}>Amount :</span>  <span style={{fontWeight:"400"}}>{Opportunity.amount}</span></h4>
                                        <h4><span style={{fontWeight:"650"}}>Stage :</span>  <span style={{fontWeight:"400"}}>{formattedStage(Opportunity.stage)}</span></h4>
                                    </>
                                )}

                            </div>


                        </div>
                    </div>

                    {/*other details*/}

                    <h2 className="text-center">Additional information</h2>

                    <div className="d-flex mt-5 mb-5 justify-content-around">
                        {/*details about the client*/}
                        <div className="mt-5 mb-5">
                            <h4 className="text-center mb-4">Client details</h4>
                            <p><span className="detailsSpan">Name  :</span> {Client && Client.name}</p>
                            <p><span className="detailsSpan">Parent company  :</span> {Client && Client.parentname}</p>
                            <p><span className="detailsSpan">Phone :</span> {Client && Client.phone}</p>
                            <p><span className="detailsSpan">Fax :</span> {Client && Client.fax}</p>
                            <p><span className="detailsSpan">Email :</span> {Client && Client.email}</p>

                            <div className="d-flex justify-content-around mt-5 mb-3">
                                <button className="btn btn-success" onClick={() => navigate(`/home/client/clientDetails/${Client.id}`)}>See all details</button>
                            </div>

                        </div>

                        {/*details about the product*/}
                        <div className="mt-5 mb-5">
                            <h4 className="text-center mb-4">Product details</h4>
                            <p><span className="detailsSpan">Name  :</span> {Product && Product.name}</p>
                            <p><span className="detailsSpan">Price  :</span> {Product && Product.price}</p>
                            <p><span className="detailsSpan">Description  :</span> {Product && Product.description}</p>
                            <p><span className="detailsSpan">Number of associated opportunities :</span> {Product && Product.opportunities.length}</p>
                            <p><span className="detailsSpan">Number of associated campaigns :</span> {Product && Product.campaigns.length}</p>

                            <div className="d-flex justify-content-around mt-5 mb-3">
                                <button className="btn btn-success" onClick={() => navigate(`/home/product/productDetails/${Product.id}`)}>See all details</button>
                            </div>

                        </div>

                        {/*details about the employee*/}
                        <div className="mt-5 mb-5">
                            <h4 className="text-center mb-4">Acquired by :</h4>
                            <p><span className="detailsSpan">Employee name  :</span> {Opportunity.employee.firstname} {Opportunity.employee.lastname}</p>
                            <p><span className="detailsSpan">Employee phone  :</span> {Opportunity.employee.phone}</p>
                            <p><span className="detailsSpan">Employee email :</span> {Opportunity.employee.email}</p>
                        </div>

                    </div>

                    <div className="d-flex justify-content-around mt-5 mb-5">
                        <button className="btn btn-danger" onClick={() => navigate(`/home/opportunity/OppByClient/${Client.id}`)}>All opportunities for this client</button>
                        <button className="btn btn-danger" onClick={() => navigate(`/home/opportunity/OppByProduct/${Product.id}`)}>All opportunities for this product</button>
                        {user.id === Opportunity.employee.id &&
                            (
                                <button className="btn btn-info" onClick={() => navigate(`/home/opportunity/editOpportunity/${oppId}`)}>Edit this opportunity</button>
                            )}
                    </div>

                </div>

            </div>






        )
    }

}

export default OpportunityDetails;