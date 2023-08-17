
const initialState={
    createContact:{},
    getContactById:{},
    ListContacts:{},
    DeleteContacts:{},
    errors:{},
}

export const CREATE_CONTACT="CREATECONTACT";
export const GET_CONTACT="GETCONTACT";
export const LIST_CONTACT="LISTCONTACT";
export const DELETE_CONTACT="DELETECONTACT";
export const ERROR = "ERROR";


export default function (state = initialState,action){
    switch (action.type) {

        case CREATE_CONTACT:

            return {
                createContact:"contact created"
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


        case DELETE_CONTACT:
            return{
                DeleteContacts:"contact deleted"
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