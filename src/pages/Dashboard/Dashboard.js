import React, {useEffect} from "react";
import "./Dashboard.css";
import {Routes, Route, useNavigate} from "react-router";
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
import {useDispatch, useSelector} from "react-redux";
import {setConnected} from "../../redux/actions/AuthenticationActions";
import ListClientsAdmin from "../../blocks/backOffice/Clients/ListClientsAdmin";
import ClientDetailsAdmin from "../../blocks/backOffice/Clients/ClientDetailsAdmin";
import DisplayContactsAdmin from "../../blocks/backOffice/Contacts/DisplayContactsAdmin";
import AddContactAdmin from "../../blocks/backOffice/Contacts/AddContactAdmin";
import EditContactAdmin from "../../blocks/backOffice/Contacts/EditContactAdmin";
import ContactDetailsAdmin from "../../blocks/backOffice/Contacts/ContactDetailsAdmin";



const Dashboard = () => {

    //this code will automatically redirect to /login if there is no user connected

    const dispatch = useDispatch();
    const navigate=useNavigate();
    const AuthState = useSelector(state => state.Auth);
    const user =JSON.parse(localStorage.getItem('user'))

    useEffect(()=>{
        const token = JSON.parse(localStorage.getItem('authTokens'));
        if(!token)
        {
            localStorage.removeItem('authTokens');
            navigate('/login');
        }
        else{
            dispatch(setConnected(token,user));
        }
    },[AuthState.isConnected,dispatch, navigate])


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
                    {/*client routes*/}
                    <Route path='/listClients' element={<ListClientsAdmin/>}/>
                    <Route path='/ClientDetails/:clientId' element={<ClientDetailsAdmin/>}/>
                    {/*contact routes*/}
                    <Route path='/listContacts/:clientId' element={<DisplayContactsAdmin/>}/>
                    <Route path='/AddContactAdmin/:clientId' element={<AddContactAdmin/>}/>
                    <Route path='/ContactDetailsAdmin/:clientId/:contactId' element={<ContactDetailsAdmin/>}/>
                    <Route path='/EditContactAdmin/:clientId/:contactId' element={<EditContactAdmin/>}/>


                </Routes>
            </div>
        </div>
    )
}

export default Dashboard;