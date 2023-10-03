import React from 'react';
import { Link } from 'react-router-dom';
import "./EditLeadSuccessModal.css";

const EditLeadSuccessModal = ({ show, onClose }) => {
    console.log("EditLeadSuccessModal show prop:", show);

    if (!show) {
        return null; // Do not render the modal if show is false
        {console.log("it didn't show")}
    }

    return (

        <div className={`editLead-success-modal ${show ? 'show' : 'hide'}`}>

            <div className="modalBackground">

                <div className="modalContainers">
                    <div className="titleCloseBtn">
                        <button onClick={onClose}>X</button>
                    </div>

                    <div className="modalTitle">
                        <h2>Edited Successfully!</h2>
                    </div>

                    <div className="modalBody">
                        <p>Your Lead was edited successfully.</p>
                    </div>

                    <div className="modalFooter">
                        <Link to="/home/lead" className="btn btn-danger" onClick={onClose}>
                            Close and return to leads list
                        </Link>
                    </div>

                </div>

            </div>

        </div>
    );

}

export default EditLeadSuccessModal;