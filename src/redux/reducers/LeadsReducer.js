
const initialState={
    createLead:{},
    updateLead:{},
    getLeadById:{},
    ListLeads:{},
    listLeadsByAdmin:[],
    listLeadsByEmployee:[],
    DeleteLeads:{},
    errors:{},
}

export const CREATE_LEAD="CREATELEAD";
export const UPDATE_LEAD="UPDATELEAD";
export const GET_LEAD="GETLEAD";
export const LIST_LEAD="LISTLEAD";
export const LIST_LEAD_BY_ADMIN="LISTLEADSBYADMIN";
export const LIST_LEAD_BY_EMPLOYEE="LISTLEADSBYEMPLOYEE";
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


        case LIST_LEAD_BY_ADMIN:
            return{
                ...state,
                listLeadsByAdmin:action.payload
            }


        case LIST_LEAD_BY_EMPLOYEE:
            return{
                ...state,
                listLeadsByEmployee:action.payload
            }



        case DELETE_LEAD:
            const leadID = action.payload;
            return {
                ...state,
                listLeadsByAdmin: state.listLeadsByAdmin.filter((lead) => lead.id !== leadID),
                listLeadsByEmployee: state.listLeadsByEmployee.filter((lead) => lead.id !== leadID),
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