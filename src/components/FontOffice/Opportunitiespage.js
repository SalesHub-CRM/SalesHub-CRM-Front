import {useState} from "react";
import ListMyOpportunities from "../../blocks/frontOffice/Opportunities/ListMyOpportunities";
import AddOpportunitiesWithProduct from "../../blocks/frontOffice/Opportunities/AddOpportunitiesWithProduct";
import '../../blocks/frontOffice/Opportunities/opportunities.css';
import {Route, Routes} from "react-router-dom";
import ListOpportunitiesByProduct from "../../blocks/frontOffice/Opportunities/ListOpportunitiesByProduct";
import OpportunityDetails from "../../blocks/frontOffice/Opportunities/OpportunityDetails";
import EditOpportunities from "../../blocks/frontOffice/Opportunities/EditOpportunities";
import AddOpportunitiesWithClient from "../../blocks/frontOffice/Opportunities/AddOpportunitiesWithClient";
import ListOpportunitiesByClient from "../../blocks/frontOffice/Opportunities/ListOpportunitiesByClient";

const Opportunitiespage = () => {

    return(
        <div>

            <div className="oppsMainPage">
                <Routes>
                    <Route path="/" element={<ListMyOpportunities/>}/>
                    <Route path="/OppByProduct/:productId" element={<ListOpportunitiesByProduct/>}/>
                    <Route path="/OppByClient/:clientId" element={<ListOpportunitiesByClient/>}/>
                    <Route path="/AddOpportunityProduct/:productId" element={<AddOpportunitiesWithProduct/>}/>
                    <Route path="/AddOpportunityClient/:clientId" element={<AddOpportunitiesWithClient/>}/>
                    <Route path="/OppDetails/:oppId" element={<OpportunityDetails/>}/>
                    <Route path="/editOpportunity/:oppId" element={<EditOpportunities/>}/>
                </Routes>
            </div>
        </div>
    )
}

export default Opportunitiespage;