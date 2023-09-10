import React from 'react';
import { Link } from 'react-router-dom';
import "./RegistrationSuccessModal.css";
const RegistrationSuccessModal = ({ show, onClose }) => {

    if (!show) {
        return null; // Do not render the modal if show is false
        {console.log("it didn't show")}
    }


    return (

        <div className={`registration-success-modal ${show ? 'show' : 'hide'}`}>

            <div className="modalBackground">

                <div className="modalContainers">
                    <div className="titleCloseBtn">
                        <button onClick={onClose}>X</button>
                    </div>

                    <div className="modalTitle">
                        <h2>Registration Successful!</h2>
                    </div>

                    <div className="modalBody">
                        <p>Your registration was successful.</p>
                    </div>

                    <div className="modalFooter">
                        <Link to="/login" className="btn btn-danger" onClick={onClose}>
                            Go to Login
                        </Link>
                    </div>

                </div>

            </div>

        </div>
    );
};


export default RegistrationSuccessModal;