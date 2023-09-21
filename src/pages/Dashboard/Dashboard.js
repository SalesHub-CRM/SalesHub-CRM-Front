import React from "react";
import "./Dashboard.css";
import {Routes,Route} from "react-router";
import TopBar from "../../blocks/backOffice/TopBar/TopBar";
import SideBar from "../../blocks/backOffice/SideBar/SideBar";
import Home from "../../blocks/backOffice/Home/Home";
import AddGroupForm from "../../blocks/backOffice/Group/AddGroupForm";
import ListGroups from "../../blocks/backOffice/Group/ListGroups";
import GroupDetails from "../../blocks/backOffice/Group/GroupDetails";
import EditGroup from "../../blocks/backOffice/Group/EditGroup";



const Dashboard = () => {
    return(
        <div>

            <TopBar/>

            <div className="contain">
                <SideBar/>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/addGroup' element={<AddGroupForm/>}/>
                    <Route path='/listGroups' element={<ListGroups/>}/>
                    <Route path='/groupDetails/:groupId' element={<GroupDetails/>}/>
                    <Route path='/editGroup/:groupId' element={<EditGroup/>}/>
                </Routes>
            </div>
        </div>
    )
}

export default Dashboard;