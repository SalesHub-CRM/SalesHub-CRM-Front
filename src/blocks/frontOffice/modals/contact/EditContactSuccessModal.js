import {Link} from "react-router-dom";
import React from "react";
import "./EditContactSuccessModal.css";

const EditContactSuccessModal = ({ show, onClose, clientId, contactId }) => {

    if (!show) {
        return null; // Do not render the modal if show is false
        {console.log("it didn't show")}
    }

    return (

        <div className={`editContact-success-modal ${show ? 'show' : 'hide'}`}>

            <div className="modalBackground">

                <div className="modalContainers">
                    <div className="titleCloseBtn">
                        <button onClick={onClose}>X</button>
                    </div>

                    <div className="modalTitle">
                        <h2>Edited Successfully!</h2>
                    </div>

                    <div className="modalBody">
                        <p>Your Contact was edited successfully.</p>
                    </div>

                    <div className="modalFooter">
                        <Link to={`/home/contact/contactDetails/${clientId}/${contactId}`} className="btn btn-danger" onClick={onClose}>
                            Close and return to details
                        </Link>
                    </div>

                </div>

            </div>

        </div>
    );

}

export default EditContactSuccessModal;