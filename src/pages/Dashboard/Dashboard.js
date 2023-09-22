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
import AddEmployeeForm from "../../blocks/backOffice/Employee/AddEmployeeForm";
import ListEmployees from "../../blocks/backOffice/Employee/ListEmployees";
import EmployeeDetails from "../../blocks/backOffice/Employee/EmployeeDetails";



const Dashboard = () => {
    return(
        <div>

            <TopBar/>

            <div className="contain">
                <SideBar/>
                <Routes>
                    {/*default path*/}
                    <Route path='/' element={<Home/>}/>
                    {/*group routes*/}
                    <Route path='/addGroup' element={<AddGroupForm/>}/>
                    <Route path='/listGroups' element={<ListGroups/>}/>
                    <Route path='/groupDetails/:groupId' element={<GroupDetails/>}/>
                    <Route path='/editGroup/:groupId' element={<EditGroup/>}/>
                    {/*employee routes*/}
                    <Route path='/addEmployee' element={<AddEmployeeForm/>}/>
                    <Route path='/listEmployees' element={<ListEmployees/>}/>
                    <Route path='/employeeDetails/:empId' element={<EmployeeDetails/>}/>
                </Routes>
            </div>
        </div>
    )
}

export default Dashboard;