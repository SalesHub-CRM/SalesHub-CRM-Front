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
import {ListLeadsByAdmin} from "../../redux/actions/LeadsActions";
import ListLeadsAdmin from "../../blocks/backOffice/Leads/ListLeadsAdmin";
import LeadDetailsAdmin from "../../blocks/backOffice/Leads/LeadDetailsAdmin";
import ListTasksAdmin from "../../blocks/backOffice/Tasks/ListTasksAdmin";
import TaskDetailsAdmin from "../../blocks/backOffice/Tasks/TaskDetailsAdmin";
import AddTaskAdmin from "../../blocks/backOffice/Tasks/AddTaskAdmin";
import EditTaskAdmin from "../../blocks/backOffice/Tasks/EditTaskAdmin";
import ListProductsAdmin from "../../blocks/backOffice/Product/ListProductsAdmin";
import AddProductAdmin from "../../blocks/backOffice/Product/AddProductAdmin";
import ProductDetailsAdmin from "../../blocks/backOffice/Product/ProductDetailsAdmin";
import EditProductAdmin from "../../blocks/backOffice/Product/EditProductAdmin";
import ListOpportunitiesByClientAdmin from "../../blocks/backOffice/Opportunity/ListOpportunitiesByClientAdmin";
import OpportunityDetailsAdmin from "../../blocks/backOffice/Opportunity/OpportunityDetailsAdmin";
import ListCampaignsByProductAdmin from "../../blocks/backOffice/Campaign/ListCampaignsByProductAdmin";
import CampaignDetailsAdmin from "../../blocks/backOffice/Campaign/CampaignDetailsAdmin";
import ListOpportunitiesByProductAdmin from "../../blocks/backOffice/Opportunity/ListOpportunitiesByProductAdmin";
import AddCampaignAdmin from "../../blocks/backOffice/Campaign/AddCampaignAdmin";
import EditCampaignAdmin from "../../blocks/backOffice/Campaign/EditCampaignAdmin";



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


    //this useEffect will block normal users from accessing the dashboard

    useEffect(() => {
        if (AuthState.user && AuthState.user.roles && !AuthState.user.roles.includes("ROLE_ADMIN")) {
            navigate("/home");
        }
    }, [AuthState.user, navigate]);


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
                    {/*lead routes*/}
                    <Route path='/listLeads' element={<ListLeadsAdmin/>}/>
                    <Route path='/leadDetailsAdmin/:leadId' element={<LeadDetailsAdmin/>}/>
                    {/*task routes*/}
                    <Route path='/listTasks' element={<ListTasksAdmin/>}/>
                    <Route path='/AddTaskAdmin' element={<AddTaskAdmin/>}/>
                    <Route path='/taskDetailsAdmin/:taskId' element={<TaskDetailsAdmin/>}/>
                    <Route path='/editTaskAdmin/:taskId' element={<EditTaskAdmin/>}/>
                    {/*product routes*/}
                    <Route path='/listProductsAdmin' element={<ListProductsAdmin/>}/>
                    <Route path='/AddProductAdmin' element={<AddProductAdmin/>}/>
                    <Route path='/productDetailsAdmin/:productId' element={<ProductDetailsAdmin/>}/>
                    <Route path='/editProductAdmin/:productId' element={<EditProductAdmin/>}/>
                    {/*opportunity routes*/}
                    <Route path='/listOpportunitiesByClientAdmin/:clientId' element={<ListOpportunitiesByClientAdmin/>}/>
                    <Route path='/listOpportunitiesByProductAdmin/:productId' element={<ListOpportunitiesByProductAdmin/>}/>
                    <Route path='/opportunityDetailsAdmin/:oppId' element={<OpportunityDetailsAdmin/>}/>
                    {/*campaign routes*/}
                    <Route path='/AddCampaignsAdmin/:productId' element={<AddCampaignAdmin/>}/>
                    <Route path='/listCampaignsByProductAdmin/:productId' element={<ListCampaignsByProductAdmin/>}/>
                    <Route path='/CampaignDetailsAdmin/:campaignId' element={<CampaignDetailsAdmin/>}/>
                    <Route path='/EditCampaignAdmin/:campaignId' element={<EditCampaignAdmin/>}/>

                </Routes>
            </div>
        </div>
    )
}

export default Dashboard;