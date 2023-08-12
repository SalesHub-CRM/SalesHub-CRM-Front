import {useState} from "react";
import DisplayClients from "../../blocks/frontOffice/Clients/DisplayClients";
import AddClientsForm from "../../blocks/frontOffice/Clients/AddClientsForm";
import '../../blocks/frontOffice/Clients/clients.css';

const Clientspage = () => {
    const [show, setShow] = useState(0)

    return(
        <div>
            <div className="d-flex justify-content-between clientNav">
                <div>
                    <span>Manage clients</span>
                </div>

                <div>
                    <button className="btn btn-light" onClick={() => setShow(0)}>show list</button>
                    <button className="btn btn-light" onClick={() => setShow(1)}>Add clients</button>
                </div>
            </div>


            <div className="clientsMainPage">
                {show===0 && <DisplayClients/>}
                {show===1 && <AddClientsForm/>}
            </div>
        </div>
    )
}

export default Clientspage;