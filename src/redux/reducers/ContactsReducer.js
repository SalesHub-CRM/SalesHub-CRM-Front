
const initialState={
    createContact:{},
    updateContact:{},
    getContactById:{},
    ListContacts:{},
    ListContactsByGroup:[],
    ListContactsByClient:[],
    DeleteContacts:{},
    errors:{},
}

export const CREATE_CONTACT="CREATECONTACT";
export const UPDATE_CONTACT="UPDATECONTACT";
export const GET_CONTACT="GETCONTACT";
export const LIST_CONTACT="LISTCONTACT";
export const LIST_CONTACT_BY_GROUP="LISTCONTACTBYGROUP";
export const LIST_CONTACT_BY_CLIENT="LISTCONTACTBYCLIENT";
export const DELETE_CONTACT="DELETECONTACT";
export const ERROR = "ERROR";


export default function (state = initialState,action){
    switch (action.type) {

        case CREATE_CONTACT:

            return {
                createContact:"contact created"
            }


        case UPDATE_CONTACT:
            return {
                ...state,
                isEditedSuccess:true,
                updateContact: action.payload
            }



        case GET_CONTACT:
            return{
                ...state,
                getContactById:action.payload
            }


        case LIST_CONTACT:
            return{
                ...state,
                ListContacts:action.payload
            }


        case LIST_CONTACT_BY_GROUP:
            return{
                ...state,
                ListContactsByGroup:action.payload
            }


        case LIST_CONTACT_BY_CLIENT:
            return{
                ...state,
                ListContactsByClient:action.payload
            }


        case DELETE_CONTACT:
            const contactId=action.payload
            return{
                ...state,
                ListContactsByClient: state.ListContactsByClient.filter((contact)=>contact.id!==contactId)
            }


        case ERROR:
            return{
                error:action.payload
            }


        default:{
            return state;
        }
    }
}