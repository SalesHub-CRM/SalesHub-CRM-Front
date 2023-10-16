import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router";
import React, {useEffect, useState} from "react";
import {GetCaseById, GetClientByCaseId} from "../../../redux/actions/CasesActions";


const CaseDetails = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {caseId} = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const Case = useSelector(state => state.Case.getCaseById);
    const Client = useSelector(state => state.Case.getClientByCaseId)
    const dataUser =JSON.parse(localStorage.getItem('user'));



    useEffect(()=>{

        dispatch(GetCaseById(caseId))

    },[]);


    useEffect(()=>{
        dispatch(GetClientByCaseId(caseId))
    },[])


    console.log("case",Case);
    console.log("client",Client);

    const createdAtFormat = new Date(Case.createdat)
    const updatedAtFormat = new Date(Case.updatedat)

    const formatType = (type) => {
        if (type === "FEATUREREQUEST") {
            return "Feature request";
        }
        return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
    };

    const formatPriority = (priority) => {
        return priority.charAt(0).toUpperCase() + priority.slice(1).toLowerCase();
    };


    let priorityStyle = {};


        if (Case.priority === 'HIGH') {
            priorityStyle.color = 'red';
        } else if (Case.priority === 'NORMAL') {
            priorityStyle.color = '#2A36EF';
        } else if (Case.priority === 'LOW') {
            priorityStyle.color = 'green';
        }



    if(Object.keys(Case).length===0)
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
                <div className="container mt-5 mb-5">
                    {/*img and general info*/}
                    <div className="d-flex justify-content-around taskDetMarg">

                        <div>
                            <img className="leadImage" src="/assets/images/case1.jpg" alt="user icon"/>
                        </div>


                        <div className="align-self-center">

                            <h1>Requesting client : {Client.name}</h1>
                            <h2 className="mt-3">Type of case : {formatType(Case.type)}</h2>
                            <h3 className="mt-3" style={priorityStyle}> <span style={{color:'#000000'}}> Priority : </span>{formatPriority(Case.priority)}</h3>

                        </div>
                    </div>

                    {/*other details*/}

                    <h2 className="text-center">Additional information</h2>


                    <div className="d-flex justify-content-around mt-5">
                        <div>
                            <h4 className="text-center mb-5 mt-4">Case info</h4>
                            <p><span className="detailsSpan">Subject :</span>{Case.subject} </p>
                            <p><span className="detailsSpan">Description :</span> {Case.description}</p>
                            <p><span className="detailsSpan">Created at :</span> {createdAtFormat.toLocaleDateString("en-GB")}</p>
                            <p><span className="detailsSpan">Last updated at :</span> {updatedAtFormat.toLocaleDateString("en-GB")}</p>

                        </div>
                        <div>
                            <h4 className="text-center mb-5 mt-4">Client Contact</h4>
                            <p><span className="detailsSpan">Phone : </span> {Client.phone}</p>
                            <p><span className="detailsSpan">Fax :</span> {Client.fax}</p>
                            <p><span className="detailsSpan">Email :</span> {Client.email} $</p>
                            <p><span className="detailsSpan">Website :</span> {Client.website}</p>

                        </div>

                    </div>

                </div>

                <div className="d-flex justify-content-around mt-5 mb-5">
                    <button className="btn btn-info" onClick={() => navigate(`/home/case/editCase/${Case.id}/${Client.id}`)}>Edit this Case</button>
                    <button className="btn btn-danger" onClick={() => navigate(`/home/case`)}>Back to list</button>
                </div>


            </div>
        )
    }

}

export default CaseDetails