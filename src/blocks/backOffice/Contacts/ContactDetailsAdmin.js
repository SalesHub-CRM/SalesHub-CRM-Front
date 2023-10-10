import {useNavigate, useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {GetContactById} from "../../../redux/actions/ContactsActions";


const ContactDetailsAdmin = () => {

    const { clientId, contactId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const Contact = useSelector(state => state.Contact.getContactById);

    const createdFormat = new Date(Contact.createdat)
    const updatedFormat = new Date(Contact.updatedat)

    useEffect(()=>{
        dispatch(GetContactById(contactId));
    },[])

    console.log("contact",Contact)


    if(Object.keys(Contact).length===0)
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

                                        <div className="container mt-5 mb-5">
                                            {/*img and general info*/}
                                            <div className="d-flex justify-content-around taskDetMarg">

                                                <div>
                                                    <img className="leadImage" src="/assets/images/contact1.jpg" alt="user icon"/>
                                                </div>


                                                <div className="align-self-center">

                                                    <h2><span style={{fontWeight:"650"}}>Contact :</span>  <span style={{fontWeight:"400"}}>{Contact.salutation.toUpperCase()}. {Contact.firstname} {Contact.lastname}</span></h2>
                                                    <h4 className="mt-4"><span style={{fontWeight:"650"}}>Title :</span> <span style={{fontWeight:"400"}}>{Contact.title}</span> </h4>
                                                    <h4><span style={{fontWeight:"650"}}>Phone :</span>  <span style={{fontWeight:"400"}}>{Contact.phone}</span></h4>
                                                    <h4><span style={{fontWeight:"650"}}>Email :</span>  <span style={{fontWeight:"400"}}>{Contact.email}</span></h4>


                                                </div>
                                            </div>

                                            {/*other details*/}

                                            <h2 className="text-center">Additional information</h2>


                                            <div className="d-flex justify-content-around mt-5">
                                                <div>
                                                    <p className="detailsPar"><span className="detailsSpan">Main address :</span> {Contact.address}</p>
                                                    <p className="detailsPar"><span className="detailsSpan">Second address :</span> {Contact.address2}</p>
                                                    <p className="detailsPar"><span className="detailsSpan">City :</span> {Contact.city}</p>
                                                    <p className="detailsPar"><span className="detailsSpan">Zip code :</span> {Contact.zipcode}</p>
                                                    <p className="detailsPar"><span className="detailsSpan">Created at :</span> {createdFormat.toLocaleDateString("en-GB")}</p>
                                                    <p className="detailsPar"><span className="detailsSpan">Last updated at :</span> {updatedFormat.toLocaleDateString("en-GB")}</p>

                                                </div>

                                            </div>

                                        </div>

                                        <div className="d-flex justify-content-around mt-5 mb-5">
                                            <button className="btn btn-info" onClick={() => navigate(`/Dashboard/EditContactAdmin/${clientId}/${contactId}`)}>Edit this contact</button>
                                            <button className="btn btn-danger" onClick={() => navigate(`/Dashboard/listContacts/${clientId}`)}>Back to contact list</button>
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

export default ContactDetailsAdmin