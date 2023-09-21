import React from 'react';
import { Link } from 'react-router-dom';
import "./EditSuccessModal.css"


const EditSuccessModal = ({ show, onClose }) => {
    if (!show) {
        return null; // Do not render the modal if show is false
        {console.log("it didn't show")}
    }

    return (

        <div className={`editgroup-success-modal ${show ? 'show' : 'hide'}`}>

            <div className="modalBackground">

                <div className="modalContainers">
                    <div className="titleCloseBtn">
                        <button onClick={onClose}>X</button>
                    </div>

                    <div className="modalTitle">
                        <h2>Edited Successfully!</h2>
                    </div>

                    <div className="modalBody">
                        <p>Your Group was edited successfully.</p>
                    </div>

                    <div className="modalFooter">
                        <Link to="/Dashboard/listGroups" className="btn btn-danger" onClick={onClose}>
                            Close and return to group list
                        </Link>
                    </div>

                </div>

            </div>

        </div>
    );
}
export default EditSuccessModal;