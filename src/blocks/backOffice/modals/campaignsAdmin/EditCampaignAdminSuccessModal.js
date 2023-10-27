import {Link} from "react-router-dom";
import React from "react";
import "./EditCampaignAdminSuccessModal.css";


const EditCampaignAdminSuccessModal = ({ show, onClose, campaignId }) => {

    if (!show) {
        return null;
    }

    return (

        <div className={`editCampaignAdmin-success-modal ${show ? 'show' : 'hide'}`}>

            <div className="modalBackground">

                <div className="modalContainers">
                    <div className="titleCloseBtn">
                        <button onClick={onClose}>X</button>
                    </div>

                    <div className="modalTitle">
                        <h2>Edited Successfully!</h2>
                    </div>

                    <div className="modalBody">
                        <p>Your campaign was edited successfully.</p>
                    </div>

                    <div className="modalFooter">
                        <Link to={`/Dashboard/CampaignDetailsAdmin/${campaignId}`} className="btn btn-danger" onClick={onClose}>
                            Close and return to details
                        </Link>
                    </div>

                </div>

            </div>

        </div>
    );

}

export default EditCampaignAdminSuccessModal