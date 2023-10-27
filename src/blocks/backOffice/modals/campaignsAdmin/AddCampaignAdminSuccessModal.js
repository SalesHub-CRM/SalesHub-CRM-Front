import {Link} from "react-router-dom";
import React from "react";
import "./AddCampaignAdminSuccessModal.css";


const AddCampaignAdminSuccessModal = ({ show, onClose,productId }) => {

    if (!show) {
        return null;
    }

    return (


        <div className={`addCampaignAdmin-success-modal ${show ? 'show' : 'hide'}`}>

            <div className="modalBackground">

                <div className="modalContainers">
                    <div className="titleCloseBtn">
                        <button onClick={onClose}>X</button>
                    </div>

                    <div className="modalTitle">
                        <h2>Added Successfully!</h2>
                    </div>

                    <div className="modalBody">
                        <p>Your campaign was added successfully.</p>
                    </div>

                    <div className="modalFooter">
                        <Link to={`/Dashboard/AddCampaignsAdmin/${productId}`} className="btn btn-danger" onClick={onClose}>
                            Close and refresh
                        </Link>
                    </div>

                </div>

            </div>

        </div>
    );

}

export default AddCampaignAdminSuccessModal