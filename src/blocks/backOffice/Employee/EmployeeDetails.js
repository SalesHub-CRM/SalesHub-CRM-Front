import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router";
import React, {useEffect} from "react";
import {fetchEmployee} from "../../../redux/actions/AuthenticationActions";


const EmployeeDetails = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {empId} = useParams();
    const employee = useSelector((state) => state.Auth.getEmployeeById)


    useEffect(()=>{
        dispatch(fetchEmployee(empId));
    },[dispatch,empId])

    const bdaydformat = new Date(employee.birthdate);
    const createdformat = new Date(employee.createdat);
    const updatedfrmat = new Date(employee.updatedat);

    console.log("employee",employee)

    if (!employee || Object.keys(employee).length===0)
    {
        return (

            <div className="DashboardHome">
                <div className="container mt-5">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-xl-10">
                            <div>
                                <h1>Loading...</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }

    else {
        return(
            <div className="DashboardHome">
                <div className="container mt-5">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-xl-10">
                            <div className="card rounded-3 text-black mb-5">
                                <div className="row g-0">

                                    <div className="card-body p-md-5 mx-md-4">

                                        <div className="homepage-titles creatAccountTitle">
                                            <h3 className="mt-1 mb-5 pb-1">Employee details : </h3>
                                        </div>

                                        <div>
                                            <div className="d-flex justify-content-between">

                                                <div>
                                                    <img className="leadImage" src="/assets/images/userIcon.png" alt="user icon"/>
                                                </div>


                                                <div>
                                                    <h3> {employee.firstname} {employee.lastname}</h3>
                                                    <div className="mt-5">
                                                        <p><span className="detailsSpan">Username :</span> {employee.username}</p>
                                                        <p><span className="detailsSpan">Phone :</span> {employee.phone}</p>
                                                        <p><span className="detailsSpan">Email :</span> {employee.email}</p>
                                                        <p><span className="detailsSpan">Address :</span> {employee.fulladress}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <hr style={{width:'80%', margin:'70px auto'}} />

                                            <div className="d-flex justify-content-around mt-5">
                                                <div>
                                                    <p><span className="detailsSpan">Cin :</span> {employee.cin}</p>
                                                    <p><span className="detailsSpan">City :</span> {employee.city}</p>
                                                    <p><span className="detailsSpan">Zipcode :</span> {employee.zipcode}</p>
                                                </div>

                                                <div>
                                                    <p><span className="detailsSpan">BirthDate :</span> {bdaydformat.toLocaleDateString("en-GB")}</p>
                                                    <p><span className="detailsSpan">Created at :</span> {createdformat.toLocaleDateString("en-GB")}</p>
                                                    <p><span className="detailsSpan">Last updated at :</span> {updatedfrmat.toLocaleDateString("en-GB")}</p>
                                                </div>
                                            </div>

                                        </div>

                                        <div className="d-flex justify-content-around mt-5">
                                            <button className="btn btn-danger" onClick={() => navigate(`/Dashboard/listEmployees`)}>Back to list</button>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }

}

export default EmployeeDetails;