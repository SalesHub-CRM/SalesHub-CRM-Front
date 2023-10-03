
const initialState={
    createLead:{},
    updateLead:{},
    getLeadById:{},
    ListLeads:{},
    listByAdmin:[],
    listByEmployee:[],
    DeleteLeads:{},
    errors:{},
}

export const CREATE_LEAD="CREATELEAD";
export const UPDATE_LEAD="UPDATELEAD";
export const GET_LEAD="GETLEAD";
export const LIST_LEAD="LISTLEAD";
export const LIST_BY_ADMIN="LISTBYADMIN";
export const LIST_BY_EMPLOYEE="LISTBYEMPLOYEE";
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
                ...state,
                isEditSuccess: true,
                updateLead: action.payload
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


        case LIST_BY_ADMIN:
            return{
                ...state,
                listByAdmin:action.payload
            }


        case LIST_BY_EMPLOYEE:
            return{
                ...state,
                listByEmployee:action.payload
            }


        /*case DELETE_LEAD:
            return{
                /!*DeleteLeads:"lead deleted"*!/
                ...state,
                ListLeads: state.ListLeads.filter(lead => lead.id !== action.payload),
            }*/


        case DELETE_LEAD:
            const leadID = action.payload;
            return {
                ...state,
                listByAdmin: state.listByAdmin.filter((lead) => lead.id !== leadID),
                listByEmployee: state.listByEmployee.filter((lead) => lead.id !== leadID),
            };


        case ERROR:
            return{
                error:action.payload
            }


        default:{
            return state;
        }
    }
}