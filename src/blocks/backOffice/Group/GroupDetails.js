import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router";
import {GetGroupById} from "../../../redux/actions/GroupsActions";


const GroupDetails = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const group = useSelector(state=>state.Group.getGroupById);
    const {groupId} = useParams();

    const createdFormat = new Date(group.createdat);
    const updatedFormat = new Date(group.updatedat);

    useEffect(()=>{
        dispatch(GetGroupById(groupId));
    },[dispatch,groupId]);

    console.log("group",group)

    if (Object.keys(group).length===0)
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
                            <div className="card rounded-3 text-black">
                                <div className="row g-0">

                                    <div className="card-body p-md-5 mx-md-4">

                                        <div className="homepage-titles creatAccountTitle">
                                            <h3 className="mt-1 mb-5 pb-1">Group details : </h3>
                                        </div>

                                        <div>
                                            <p><span style={{fontWeight:"bold"}}>Name :</span>  {group.name}</p>
                                            <p><span style={{fontWeight:"bold"}}>Created at :</span> {createdFormat.toLocaleDateString("en-GB")}</p>
                                            <p><span style={{fontWeight:"bold"}}>Updated at :</span> {updatedFormat.toLocaleDateString("en-GB")}</p>
                                            <p><span style={{fontWeight:"bold"}}>Number of employees :</span> {group.employees.length}</p>
                                            <p><span style={{fontWeight:"bold"}}>Total number of clients :</span> {group.clients.length}</p>

                                        </div>

                                    </div>

                                </div>
                                <div className="d-flex justify-content-around mt-5 mb-5">
                                    <button className="btn btn-info" onClick={() => navigate(`/Dashboard/editGroup/${group.id}`)}>Edit this group</button>
                                    <button className="btn btn-danger" onClick={() => navigate(`/Dashboard/listGroups`)}>Back to list</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }


}

export default GroupDetails;