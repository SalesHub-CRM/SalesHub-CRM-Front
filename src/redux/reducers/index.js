import {combineReducers} from "redux";
import AuthenticationReducer from "./AuthenticationReducer";
import CampaignsReducer from "./CampaignsReducer"
import CasesReducer from "./CasesReducer";
import ClientsReducer from "./ClientsReducer";
import ContactsReducer from "./ContactsReducer";
import GroupsReducer from "./GroupsReducer";
import LeadsReducer from "./LeadsReducer";
import ProductsReducer from "./ProductsReducer";
import TasksReducer from "./TasksReducer";
import OpportunitiesReducer from "./OpportunitiesReducer";


export default combineReducers({
    Auth:AuthenticationReducer,
    Campaign:CampaignsReducer,
    Case:CasesReducer,
    Client:ClientsReducer,
    Contact:ContactsReducer,
    Group:GroupsReducer,
    Lead:LeadsReducer,
    Opportunity:OpportunitiesReducer,
    Product:ProductsReducer,
    Task:TasksReducer,

})