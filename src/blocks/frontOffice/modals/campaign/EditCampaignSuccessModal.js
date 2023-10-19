import {Link} from "react-router-dom";
import React from "react";
import "./EditCampaignSuccessModal.css";

const EditCampaignSuccessModal = ({ show, onClose, campaignId }) => {

    if (!show) {
        return null;
    }

    return (

        <div className={`editCampaign-success-modal ${show ? 'show' : 'hide'}`}>

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
                        <Link to={`/home/campaign/CampaignDetails/${campaignId}`} className="btn btn-danger" onClick={onClose}>
                            Close and return to details
                        </Link>
                    </div>

                </div>

            </div>

        </div>
    );

}

export default EditCampaignSuccessModal;