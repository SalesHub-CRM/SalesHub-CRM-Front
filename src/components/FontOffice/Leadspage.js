import {useState} from "react";
import DisplayLeads from "../../blocks/frontOffice/Leads/DisplayLeads";
import AddLeadForm from "../../blocks/frontOffice/Leads/AddLeadForm";
import LeadDetails from "../../blocks/frontOffice/Leads/LeadDetails";
import '../../blocks/frontOffice/Leads/leads.css'
/*import {Route} from "react-router-dom";*/
import {Link, Route, Routes, useNavigate} from "react-router-dom";
import EditLeads from "../../blocks/frontOffice/Leads/EditLeads";


const Leadspage = () => {


    return(
      <div>
          <div className="d-flex justify-content-between leadNav">
              <div>
                  <span>Manage leads</span>
              </div>

              <div>

                  <Link className="btn btn-light" to="/home/lead">show list</Link>
                  <Link className="btn btn-light" to="/home/lead/addLead">Add lead</Link>

              </div>
          </div>


          <div className="leadsMainPage">

              <Routes>
                  <Route path="/" element={<DisplayLeads />} />
                  <Route path="/addLead" element={<AddLeadForm />} />
                  <Route path="/leadDetails/:leadId" element={<LeadDetails />} />
                  <Route path="/editlead/:leadId" element={<EditLeads />} />
              </Routes>

              {/*{show===0 && <DisplayLeads handleDetailsClick={handleDetailsClick}/>}
              {show===1 && <AddLeadForm/>}*/}
          </div>

          {/*{showLeadDetails && (

          )}*/}

      </div>
  )
}

export default Leadspage;