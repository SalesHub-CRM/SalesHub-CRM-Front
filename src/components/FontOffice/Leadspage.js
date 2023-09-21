import {useState} from "react";
import DisplayLeads from "../../blocks/frontOffice/Leads/DisplayLeads";
import AddLeadForm from "../../blocks/frontOffice/Leads/AddLeadForm";
import LeadDetails from "../../blocks/frontOffice/Leads/LeadDetails";
import '../../blocks/frontOffice/Leads/leads.css'
/*import {Route} from "react-router-dom";*/
import { Route, Routes, useNavigate } from "react-router-dom";
import EditLeads from "../../blocks/frontOffice/Leads/EditLeads";


const Leadspage = () => {

    const [show, setShow] = useState(0)

    const [showLeadDetails, setShowLeadDetails] = useState(false);

    const [selectedLeadId, setSelectedLeadId] = useState(null);


    const handleDetailsClick = (leadId) => {
        setSelectedLeadId(leadId); // Set the selected lead ID
        setShowLeadDetails(true); // Show the LeadDetails component
    };


    return(
      <div>
          <div className="d-flex justify-content-between leadNav">
              <div>
                  <span>Manage leads</span>
              </div>

              <div>
                  <button className="btn btn-light" onClick={() => setShow(0)}>show list</button>
                  <button className="btn btn-light" onClick={() => setShow(1)}>Add lead</button>
              </div>
          </div>


          <div className="leadsMainPage">
              {show===0 && <DisplayLeads handleDetailsClick={handleDetailsClick}/>}
              {show===1 && <AddLeadForm/>}
          </div>

          {showLeadDetails && (
              <Routes>
                  <Route path="/lead/:leadId" element={<LeadDetails />} />
                  <Route path="/home/editlead/:leadId" element={<EditLeads />} />
              </Routes>
          )}

      </div>
  )
}

export default Leadspage;