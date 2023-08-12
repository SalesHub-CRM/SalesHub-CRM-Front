import {useState} from "react";
import DisplayCases from "../../blocks/frontOffice/Cases/DisplayCases";
import AddCasesForm from "../../blocks/frontOffice/Cases/AddCasesForm";
import '../../blocks/frontOffice/Cases/cases.css';

const Casespage = () => {
    const [show, setShow] = useState(0)

    return(
        <div>
            <div className="d-flex justify-content-between caseNav">
                <div>
                    <span>Manage cases</span>
                </div>

                <div>
                    <button className="btn btn-light" onClick={() => setShow(0)}>show list</button>
                    <button className="btn btn-light" onClick={() => setShow(1)}>Add case</button>
                </div>
            </div>


            <div className="casesMainPage">
                {show===0 && <DisplayCases/>}
                {show===1 && <AddCasesForm/>}
            </div>
        </div>
    )
}
export default Casespage;