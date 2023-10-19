import {useState} from "react";
import DisplayClients from "../../blocks/frontOffice/Clients/DisplayClients";
import AddClientsForm from "../../blocks/frontOffice/Clients/AddClientsForm";
import '../../blocks/frontOffice/Clients/clients.css';
import {Link, Route, Routes} from "react-router-dom";
import ClientDetails from "../../blocks/frontOffice/Clients/ClientDetails";
import EditClients from "../../blocks/frontOffice/Clients/EditClients";

const Clientspage = () => {

    return(
        <div>
            <div className="d-flex justify-content-between clientNav">
                <div>
                    <span>Manage clients</span>
                </div>

                <div>
                    <Link className="btn btn-light" style={{marginRight:"30px"}} to="/home/client">Show List</Link>
                    <Link className="btn btn-light" to="/home/client/addClient">Add Client</Link>
                </div>
            </div>


            <div className="clientsMainPage">
                <Routes>
                    <Route path="/" element={<DisplayClients/>}/>
                    <Route path="/addClient" element={<AddClientsForm/>}/>
                    <Route path="/clientDetails/:clientId" element={<ClientDetails/>}/>
                    <Route path="/editClient/:clientId" element={<EditClients/>}/>
                </Routes>
            </div>
        </div>
    )
}

export default Clientspage;