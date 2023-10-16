import {useState} from "react";
import DisplayCases from "../../blocks/frontOffice/Cases/DisplayCases";
import AddCasesForm from "../../blocks/frontOffice/Cases/AddCasesForm";
import '../../blocks/frontOffice/Cases/cases.css';
import {Link, Route, Routes} from "react-router-dom";
import CaseDetails from "../../blocks/frontOffice/Cases/CaseDetails";
import EditCases from "../../blocks/frontOffice/Cases/EditCases";

const Casespage = () => {
    const [show, setShow] = useState(0)

    return(
        <div>
            <div className="d-flex justify-content-between caseNav">
                <div>
                    <span>Manage cases</span>
                </div>

                <div>
                    <Link className="btn btn-light" to="/home/case">show list</Link>
                    <Link className="btn btn-light" to="/home/case/addCase">Add case</Link>
                </div>

            </div>

            <div className="casesMainPage">
                <Routes>
                    <Route path="/" element={<DisplayCases/>}/>
                    <Route path="/addCase" element={<AddCasesForm/>}/>
                    <Route path="/caseDetails/:caseId" element={<CaseDetails/>}/>
                    <Route path="/editCase/:caseId/:clientId" element={<EditCases/>}/>
                </Routes>
            </div>



        </div>
    )
}
export default Casespage;