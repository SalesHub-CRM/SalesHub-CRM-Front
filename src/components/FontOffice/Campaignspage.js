import '../../blocks/frontOffice/Campaigns/campaigns.css';
import {Route, Routes} from "react-router-dom";
import AddCampaignsForm from "../../blocks/frontOffice/Campaigns/AddCampaignsForm";
import ListOurCampaigns from "../../blocks/frontOffice/Campaigns/ListOurCampaigns";
import EditCampaigns from "../../blocks/frontOffice/Campaigns/EditCampaigns";
import CampaignDetails from "../../blocks/frontOffice/Campaigns/CampaignDetails";
import ListCampaignsByProduct from "../../blocks/frontOffice/Campaigns/ListCampaignsByProduct";

const Campaignspage = () => {


    return(
        <div>
            <div className="campaignsMainPage">
                <Routes>
                    <Route path="/" element={<ListOurCampaigns/>}/>
                    <Route path="/ListCampByProd/:productId" element={<ListCampaignsByProduct/>}/>
                    <Route path="/AddCampaign/:productId" element={<AddCampaignsForm/>}/>
                    <Route path="/CampaignDetails/:campaignId" element={<CampaignDetails/>}/>
                    <Route path="/EditCampaign/:campaignId" element={<EditCampaigns/>}/>
                </Routes>
            </div>
        </div>
    )
}
export default Campaignspage;