import {Link} from "react-router-dom";
import React from "react";
import "./EditClientSuccessModal.css";


const EditClientSuccessModal = ({ show, onClose, clientId }) => {

    if (!show) {
        return null; // Do not render the modal if show is false
        {console.log("it didn't show")}
    }

    return (

        <div className={`editClient-success-modal ${show ? 'show' : 'hide'}`}>

            <div className="modalBackground">

                <div className="modalContainers">
                    <div className="titleCloseBtn">
                        <button onClick={onClose}>X</button>
                    </div>

                    <div className="modalTitle">
                        <h2>Edited Successfully!</h2>
                    </div>

                    <div className="modalBody">
                        <p>Your Client was edited successfully.</p>
                    </div>

                    <div className="modalFooter">
                        <Link to={`/home/client/clientDetails/${clientId}`} className="btn btn-danger" onClick={onClose}>
                            Close and return to details
                        </Link>
                    </div>

                </div>

            </div>

        </div>
    );

}

export default EditClientSuccessModal;