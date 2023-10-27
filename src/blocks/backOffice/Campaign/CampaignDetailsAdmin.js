import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router";
import React, {useEffect} from "react";
import {GetCampaignById} from "../../../redux/actions/CampaignsActions";


const CampaignDetailsAdmin = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {campaignId} = useParams();
    const Campaign = useSelector(state => state.Campaign.getCampaignById);

    useEffect(()=>{
        dispatch(GetCampaignById(campaignId));
    },[])

    console.log("Campaign",Campaign)

    const createdFormat = new Date(Campaign.createdat);
    const updatedFormat = new Date(Campaign.updatedat);
    const startedFormat = new Date(Campaign.startdate);
    const endedFormat = new Date(Campaign.enddate);
    const currentDate = new Date();

    const formattedStatus=(status)=>{
        if (status === "INPROGRESS"){
            return "In progress";
        }
        else{
            return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
        }
    }


    const formattedType=(type)=>{
        if(type==="BANNERADS"){
            return "Banner ads";
        }
        else if (type === "PUBLICRELATIONS")
        {
            return "Public relations";
        }
        else{
            return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
        }
    }


    if(Object.keys(Campaign).length===0)
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
                                        <div className="d-flex justify-content-between taskDetMarg">

                                            <div style={{width:"40%"}}>
                                                <img className="leadImage" src="/assets/images/campaign1.png" alt="user icon"/>
                                            </div>

                                            <div style={{width:"55%"}}>

                                                <h2><span style={{fontWeight:"650"}}>Campaign :</span>  <span style={{fontWeight:"400"}}>{Campaign.name}</span></h2>

                                                <div className="information mt-5 mb-5">

                                                    {currentDate>endedFormat ? (
                                                        <>
                                                            <h3 style={{color:"red"}}>This Campaign ended on {endedFormat.toLocaleDateString("en-GB")}</h3>
                                                        </>
                                                    ) : Campaign.status ==="ABORTED" ?(
                                                        <>
                                                            <h3 style={{color:"red"}}>This Campaign has been aborted</h3>
                                                        </>
                                                    ) : Campaign.status ==="COMPLETED" ?(
                                                        <>
                                                            <h3 style={{color:"green"}}>This Campaign has been completed on {endedFormat.toLocaleDateString("en-GB")}</h3>
                                                        </>
                                                    ) :(
                                                        <>
                                                            <h4><span style={{fontWeight:"650"}}>Start date :</span>  <span style={{fontWeight:"400"}}>{startedFormat.toLocaleDateString("en-GB")}</span></h4>
                                                            <h4><span style={{fontWeight:"650"}}>End Date :</span>  <span style={{fontWeight:"400"}}>{endedFormat.toLocaleDateString("en-GB")}</span></h4>
                                                            <h4><span style={{fontWeight:"650"}}>Type :</span>  <span style={{fontWeight:"400"}}>{formattedType(Campaign.type)}</span></h4>
                                                            <h4><span style={{fontWeight:"650"}}>Status :</span>  <span style={{fontWeight:"400"}}>{formattedStatus(Campaign.status)}</span></h4>
                                                        </>
                                                    )}

                                                </div>


                                            </div>
                                        </div>

                                        {/*other details*/}

                                        <h2 className="text-center">Additional information</h2>

                                        <div className="d-flex mt-5 mb-5 justify-content-around">


                                            {/*details about the campaign*/}
                                            <div className="mt-5 mb-5">
                                                <h4 className="text-center mb-4">Campaign details</h4>
                                                <p><span className="detailsSpan">Budget  :</span> {Campaign.budget} DT</p>
                                                <p><span className="detailsSpan">Actual Cost  :</span> {Campaign.actualcost} DT</p>
                                                {
                                                    Campaign.budget>Campaign.actualcost ? (
                                                        <>
                                                            <p><span className="detailsSpan" style={{color:"green"}}>We had a surplus of {Campaign.budget - Campaign.actualcost} DT</span></p>
                                                        </>
                                                    ) : Campaign.budget<Campaign.actualcost ? (
                                                        <>
                                                            <p><span className="detailsSpan" style={{color:"red"}}>We had a deficit of {Campaign.budget - Campaign.actualcost} DT</span></p>
                                                        </>
                                                    ) :(
                                                        <>
                                                            <p><span className="detailsSpan" style={{color:"blue"}}>The costs were equal to the expenses.</span></p>
                                                        </>
                                                    )
                                                }
                                                <p><span className="detailsSpan">Description  :</span> {Campaign.description}</p>
                                                <p><span className="detailsSpan">Number of involved personnel :</span> {Campaign.employeenumber}</p>
                                                <p><span className="detailsSpan">Expected audience response :</span> {Campaign.expectedresponse}</p>
                                                <p><span className="detailsSpan">Expected revenue :</span> {Campaign.expectedrevenue}</p>


                                            </div>


                                            {/*details about the product*/}
                                            <div className="mt-5 mb-5">
                                                <h4 className="text-center mb-4">Product details</h4>
                                                <p><span className="detailsSpan">Name  :</span> {Campaign.productObject.name}</p>
                                                <p><span className="detailsSpan">Price  :</span> {Campaign.productObject.price}</p>
                                                <p><span className="detailsSpan">Description  :</span> {Campaign.productObject.description}</p>
                                                <p><span className="detailsSpan">Number of associated opportunities :</span> {Campaign.productObject.opportunities.length}</p>
                                                <p><span className="detailsSpan">Number of associated campaigns :</span> {Campaign.productObject.campaigns.length}</p>

                                                <div className="d-flex justify-content-around mt-5 mb-3">
                                                    <button className="btn btn-success" onClick={() => navigate(`/Dashboard/productDetailsAdmin/${Campaign.productObject.id}`)}>See all details</button>
                                                </div>

                                            </div>


                                        </div>

                                        <div className="d-flex justify-content-around mt-5 mb-5">
                                            <button className="btn btn-danger" onClick={() => navigate(`/Dashboard/listCampaignsByProductAdmin/${Campaign.productObject.id}`)}>All Campaigns for this product</button>
                                            <button className="btn btn-info" onClick={() => navigate(`/Dashboard/EditCampaignAdmin/${campaignId}`)}>Edit this campaign</button>
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

export default CampaignDetailsAdmin;