
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PublicRouteHandler from "./utils/PublicRouteHandler";
import PrivateRoute from "./utils/PrivateRoute";
import Dashboard from "./pages/Dashboard/Dashboard";
import LeadDetails from "./blocks/frontOffice/Leads/LeadDetails";
import EditLeads from "./blocks/frontOffice/Leads/EditLeads";

function App() {
  return (
    <BrowserRouter>
        <Routes>
            {/*standard routes*/}
            <Route path='/home/*' element={<Home/>}/>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path="/home/lead/:leadId" element={<LeadDetails />} />
            <Route path="/home/editlead/:leadId" element={<EditLeads />} />
            {/*change dashboard to connected only later*/}
            <Route path='/Dashboard/*' element={<Dashboard/>}/>
            {/*registration and login here*/}
            <Route exact path='/' element={<PublicRouteHandler />} ></Route>
            {/*routes that require a user to be connected to access*/}
            <Route exact path='/' element={<PrivateRoute />} ></Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
