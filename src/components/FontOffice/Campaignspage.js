import {useState} from "react";
import DisplayCampaigns from "../../blocks/frontOffice/Campaigns/DisplayCampaigns";
import AddCampaignsForm from "../../blocks/frontOffice/Campaigns/AddCampaignsForm";
import '../../blocks/frontOffice/Campaigns/campaigns.css';

const Campaignspage = () => {

    const [show, setShow] = useState(0)

    return(
        <div>
            <div className="d-flex justify-content-between campaignNav">
                <div>
                    <span>Manage campaigns</span>
                </div>

                <div>
                    <button className="btn btn-light" onClick={() => setShow(0)}>show list</button>
                    <button className="btn btn-light" onClick={() => setShow(1)}>Add campaign</button>
                </div>
            </div>


            <div className="campaignsMainPage">
                {show===0 && <DisplayCampaigns/>}
                {show===1 && <AddCampaignsForm/>}
            </div>
        </div>
    )
}
export default Campaignspage;