import {Link} from "react-router-dom";
import React from "react";
import "./EditProductAdminSuccessModal.css";


const EditProductAdminSuccessModal = ({ show, onClose, productId }) => {

    if (!show) {
        return null;
    }

    return (

        <div className={`editProductAdmin-success-modal ${show ? 'show' : 'hide'}`}>

            <div className="modalBackground">

                <div className="modalContainers">
                    <div className="titleCloseBtn">
                        <button onClick={onClose}>X</button>
                    </div>

                    <div className="modalTitle">
                        <h2>Edited Successfully!</h2>
                    </div>

                    <div className="modalBody">
                        <p>Your Product was edited successfully.</p>
                    </div>

                    <div className="modalFooter">
                        <Link to={`/Dashboard/productDetailsAdmin/${productId}`} className="btn btn-danger" onClick={onClose}>
                            Close and return to details
                        </Link>
                    </div>

                </div>

            </div>

        </div>
    );

}

export default EditProductAdminSuccessModal;