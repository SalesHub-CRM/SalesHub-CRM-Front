import {useState} from "react";
import DisplayLeads from "../../blocks/frontOffice/Leads/DisplayLeads";
import AddLeadForm from "../../blocks/frontOffice/Leads/AddLeadForm";
import '../../blocks/frontOffice/Leads/leads.css'

const Leadspage = () => {

    const [show, setShow] = useState(0)

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
              {show===0 && <DisplayLeads/>}
              {show===1 && <AddLeadForm/>}
          </div>
      </div>
  )
}

export default Leadspage;