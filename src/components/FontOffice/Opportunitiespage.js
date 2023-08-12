import {useState} from "react";
import DisplayOpportunities from "../../blocks/frontOffice/Opportunities/DisplayOpportunities";
import AddOpportunitiesForm from "../../blocks/frontOffice/Opportunities/AddOpportunitiesForm";
import '../../blocks/frontOffice/Opportunities/opportunities.css';

const Opportunitiespage = () => {
    const [show, setShow] = useState(0)

    return(
        <div>
            <div className="d-flex justify-content-between oppNav">
                <div>
                    <span>Manage opportunities</span>
                </div>

                <div>
                    <button className="btn btn-light" onClick={() => setShow(0)}>show list</button>
                    <button className="btn btn-light" onClick={() => setShow(1)}>Add opportunity</button>
                </div>
            </div>


            <div className="oppsMainPage">
                {show===0 && <DisplayOpportunities/>}
                {show===1 && <AddOpportunitiesForm/>}
            </div>
        </div>
    )
}

export default Opportunitiespage;