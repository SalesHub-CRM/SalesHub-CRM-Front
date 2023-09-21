
const initialState={
    createLead:{},
    updateLead:{},
    getLeadById:{},
    ListLeads:{},
    DeleteLeads:{},
    errors:{},
}

export const CREATE_LEAD="CREATELEAD";
export const UPDATE_LEAD="UPDATELEAD";
export const GET_LEAD="GETLEAD";
export const LIST_LEAD="LISTLEAD";
export const DELETE_LEAD="DELETELEAD";
export const ERROR = "ERROR";


export default function (state = initialState,action){
    switch (action.type) {
        case CREATE_LEAD:

            return {
                createLead:"lead created"
            }


        case UPDATE_LEAD:

            return {
                updateLead:"lead updated"
            }



        case GET_LEAD:
            return{
                ...state,
                getLeadById:action.payload
            }


        case LIST_LEAD:
            return{
                ...state,
                ListLeads:action.payload
            }


        case DELETE_LEAD:
            return{
                /*DeleteLeads:"lead deleted"*/
                ...state,
                ListLeads: state.ListLeads.filter(lead => lead.id !== action.payload),
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