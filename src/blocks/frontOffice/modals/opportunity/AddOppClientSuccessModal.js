import {Link} from "react-router-dom";
import React from "react";
import "./AddOppClientSuccessModal.css"


const AddOppClientSuccessModal = ({ show, onClose, clientId }) => {

    if (!show) {
        return null;
    }

    return (


        <div className={`addOppClient-success-modal ${show ? 'show' : 'hide'}`}>

            <div className="modalBackground">

                <div className="modalContainers">
                    <div className="titleCloseBtn">
                        <button onClick={onClose}>X</button>
                    </div>

                    <div className="modalTitle">
                        <h2>Added Successfully!</h2>
                    </div>

                    <div className="modalBody">
                        <p>Your opportunity was added successfully.</p>
                    </div>

                    <div className="modalFooter">
                        <Link to={`/home/opportunity/AddOpportunityClient/${clientId}`} className="btn btn-danger" onClick={onClose}>
                            Close and refresh
                        </Link>
                    </div>

                </div>

            </div>

        </div>
    );

}

export default AddOppClientSuccessModal;