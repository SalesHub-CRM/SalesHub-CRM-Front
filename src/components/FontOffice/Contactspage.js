

import '../../blocks/frontOffice/Contacts/contacts.css';
import {useState} from "react";
import DisplayContacts from "../../blocks/frontOffice/Contacts/DisplayContacts";
import AddContactsForm from "../../blocks/frontOffice/Contacts/AddContactsForm";
const Contactspage = () => {
    const [show, setShow] = useState(0)

    return(
        <div>
            <div className="d-flex justify-content-between contactNav">
                <div>
                    <span>Manage contacts</span>
                </div>

                <div>
                    <button className="btn btn-light" onClick={() => setShow(0)}>show list</button>
                    <button className="btn btn-light" onClick={() => setShow(1)}>Add contact</button>
                </div>
            </div>


            <div className="contactsMainPage">
                {show===0 && <DisplayContacts/>}
                {show===1 && <AddContactsForm/>}
            </div>
        </div>
    )
}
export default Contactspage;