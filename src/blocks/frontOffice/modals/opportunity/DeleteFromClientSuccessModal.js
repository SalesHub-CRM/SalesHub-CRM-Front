import {Link} from "react-router-dom";
import React from "react";
import "./DeleteFromClientSuccessModal.css";


const DeleteFromClientSuccessModal = ({ show, onClose, clientId}) => {

    if (!show) {
        return null;
    }

    return (

        <div className={`deleteFromClient-success-modal ${show ? 'show' : 'hide'}`}>

            <div className="modalBackground">

                <div className="modalContainers">
                    <div className="titleCloseBtn">
                        <button onClick={onClose}>X</button>
                    </div>

                    <div className="modalTitle">
                        <h2>Deleted Successfully!</h2>
                    </div>

                    <div className="modalBody">
                        <p>Your delete action was successful.</p>
                    </div>

                    <div className="modalFooter">
                        <Link to={`/home/opportunity/OppByClient/${clientId}`} className="btn btn-danger" onClick={onClose}>
                            Close and refresh
                        </Link>
                    </div>

                </div>

            </div>

        </div>
    );

}

export default DeleteFromClientSuccessModal;