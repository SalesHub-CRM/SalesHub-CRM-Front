

import '../../blocks/frontOffice/Contacts/contacts.css';
import {useState} from "react";
import DisplayContacts from "../../blocks/frontOffice/Contacts/DisplayContacts";
import AddContactsForm from "../../blocks/frontOffice/Contacts/AddContactsForm";
import {Route, Routes} from "react-router-dom";
import ContactDetails from "../../blocks/frontOffice/Contacts/ContactDetails";
import EditContacts from "../../blocks/frontOffice/Contacts/EditContacts";
const Contactspage = () => {
    const [show, setShow] = useState(0)

    return(
        <div>
            {/*<div className="d-flex justify-content-between contactNav">
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
            </div>*/}


            <div className="contactsMainPage">

                <Routes>
                    <Route path='/addContact/:clientId' element={<AddContactsForm/>}/>
                    <Route path='/listContacts/:clientId' element={<DisplayContacts/>}/>
                    <Route path='/editContact/:clientId/:contactId' element={<EditContacts/>}/>
                    <Route path='/contactDetails/:clientId/:contactId' element={<ContactDetails/>}/>

                </Routes>

            </div>

        </div>
    )
}
export default Contactspage;