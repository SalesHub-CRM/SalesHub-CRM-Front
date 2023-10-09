import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router";
import React, {useEffect} from "react";
import {GetClientById} from "../../../redux/actions/ClientsActions";


const ClientDetails = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const dataUser = JSON.parse(localStorage.getItem('user'));
    const {clientId} = useParams();
    const Client = useSelector(state => state.Client.getClientById);


    let formattedType="";
    const createdAtFormat=new Date(Client.createdat);
    const updatedAtFormat=new Date(Client.updatedat);

    useEffect(()=>{
        dispatch(GetClientById(clientId));
    },[])

    console.log("client",Client)


    if(Client.type)
    {
        formattedType = Client.type?.charAt(0).toUpperCase()+Client.type.slice(1).toLowerCase();
    }


    if(Object.keys(Client).length===0)
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
                            <img className="leadImage" src="/assets/images/client2.jpg" alt="user icon"/>
                        </div>


                        <div className="align-self-center">

                            <h1>Company : {Client.name}</h1>
                            <h2>Parent : {Client.parentname}</h2>
                            <h2>Relation with us :{formattedType}</h2>

                        </div>
                    </div>

                    {/*other details*/}

                    <h2 className="text-center">Additional information</h2>


                    <div className="d-flex justify-content-around mt-5">
                        <div>
                            <h4 className="text-center mb-5 mt-4">Contact info</h4>
                            <p><span className="detailsSpan">Email :</span>{Client.email} </p>
                            <p><span className="detailsSpan">Website :</span> {Client.website}</p>
                            <p><span className="detailsSpan">Phone :</span> {Client.phone}</p>
                            <p><span className="detailsSpan">Fax :</span> {Client.fax}</p>
                            <p><span className="detailsSpan">Billing address :</span> {Client.billingaddress}</p>
                            <p><span className="detailsSpan">Shipping address :</span> {Client.shippingaddress}</p>

                        </div>
                        <div>
                            <h4 className="text-center mb-5 mt-4">Other</h4>
                            <p><span className="detailsSpan">Industry : </span> {Client.industry}</p>
                            <p><span className="detailsSpan">Number of employees :</span> {Client.employeenumber}</p>
                            <p><span className="detailsSpan">Annual revenue :</span> {Client.annualrevenue} $</p>
                            <p><span className="detailsSpan">Number of associated contacts :</span> {Client.contacts.length}</p>
                            <p><span className="detailsSpan">Created at :</span> {createdAtFormat.toLocaleDateString("en-GB")}</p>
                            <p><span className="detailsSpan">Last updated at :</span> {updatedAtFormat.toLocaleDateString("en-GB")}</p>

                        </div>


                    </div>

                </div>

                <div className="d-flex justify-content-around mt-5 mb-5">
                    <button className="btn btn-info" onClick={() => navigate(`/home/client/editClient/${Client.id}`)}>Edit this client</button>
                    <button className="btn btn-info" onClick={() => navigate(`/home/client/editClient/${Client.id}`)}>Add contacts</button>
                </div>


            </div>
        )
    }

}

export default ClientDetails;