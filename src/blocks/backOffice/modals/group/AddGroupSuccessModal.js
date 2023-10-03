import React from 'react';
import { Link } from 'react-router-dom';

import "./AddGroupSuccessModal.css"


const AddGroupSuccessModal = ({ show, onClose }) => {
    if (!show) {
        return null; // Do not render the modal if show is false
        {console.log("it didn't show")}
    }

    return (

        <div className={`addGroup-success-modal ${show ? 'show' : 'hide'}`}>

            <div className="modalBackground">

                <div className="modalContainers">
                    <div className="titleCloseBtn">
                        <button onClick={onClose}>X</button>
                    </div>

                    <div className="modalTitle">
                        <h2>Added Successfully!</h2>
                    </div>

                    <div className="modalBody">
                        <p>Your Group was added successfully.</p>
                    </div>

                    <div className="modalFooter">
                        <Link to="/Dashboard/addGroup" className="btn btn-danger" onClick={onClose}>
                            Close and refresh
                        </Link>
                    </div>

                </div>

            </div>

        </div>
    );
}
export default AddGroupSuccessModal;