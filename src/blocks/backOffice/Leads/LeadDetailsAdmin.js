import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router";
import React, {useEffect} from "react";
import {GetLeadById} from "../../../redux/actions/LeadsActions";


const LeadDetailsAdmin = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const dataUser = JSON.parse(localStorage.getItem('user'));
    const Lead = useSelector(state => state.Lead.getLeadById);
    const { leadId } = useParams();


    const createdformat = new Date(Lead.createdat);
    const updatedfrmat = new Date(Lead.updatedat);
    let formattedStatus ="";

    if(Lead.status)
    {
        formattedStatus=Lead.status?.charAt(0).toUpperCase() + Lead.status.slice(1).toLowerCase();
    }


    useEffect(() => {
        dispatch(GetLeadById(leadId))
    },[dispatch, leadId] );


    if(Object.keys(Lead).length===0)
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
                                                <img className="leadImage" src="/assets/images/userIcon.png" alt="user icon"/>
                                            </div>


                                            <div>
                                                <h3>{Lead.salutation.toUpperCase()}. {Lead.firstname} {Lead.lastname}</h3>
                                                <div className="mt-5">
                                                    <p><span className="detailsSpan">Title :</span> {Lead.title}</p>
                                                    <p><span className="detailsSpan">Phone :</span> {Lead.phone}</p>
                                                    <p><span className="detailsSpan">Email :</span> {Lead.email}</p>
                                                    <p><span className="detailsSpan">Address :</span> {Lead.address}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/*other details*/}

                                        <h2 className="text-center">Additional information</h2>


                                        <div className="d-flex justify-content-around mt-5">
                                            <div>
                                                <p><span className="detailsSpan">Created by  :</span> {Lead.user.firstname} {Lead.user.lastname}</p>
                                                <p><span className="detailsSpan">Company :</span> {Lead.company}</p>
                                                <p><span className="detailsSpan">Industry :</span> {Lead.industry}</p>
                                                <p><span className="detailsSpan">Source :</span> {Lead.source}</p>
                                                <p><span className="detailsSpan">City :</span> {Lead.city}</p>

                                                <p><span className="detailsSpan">Zipcode :</span> {Lead.zipcode}</p>

                                            </div>

                                            <div>
                                                <p><span className="detailsSpan">Status :</span> {formattedStatus}</p>
                                                <p><span className="detailsSpan">Annual revenue :</span> {Lead.annualrevenue}</p>
                                                <p><span className="detailsSpan">Employee Number :</span> {Lead.employeenumber}</p>
                                                <p><span className="detailsSpan">Created at :</span> {createdformat.toLocaleDateString("en-GB")}</p>
                                                <p><span className="detailsSpan">Last updated at :</span> {updatedfrmat.toLocaleDateString("en-GB")}</p>
                                            </div>
                                        </div>



                                        <div className="d-flex justify-content-around mt-5 mb-5">
                                            <button className="btn btn-danger" onClick={() => navigate(`/Dashboard/listLeads`)}>Back to list</button>
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

export default LeadDetailsAdmin;