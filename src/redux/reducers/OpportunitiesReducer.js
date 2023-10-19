
const initialState={
    createOpportunity:{},
    updateOpportunity:{},
    getOpportunityById:{},
    ListOpportunities:{},
    ListOpportunitiesByEmployee:{},
    ListOpportunitiesByGroup:{},
    ListOpportunitiesByProduct:{},
    ListOpportunitiesByClient:{},
    DeleteOpportunities:{},
    errors:{},
}

export const CREATE_OPPORTUNITY="CREATEOPP";
export const UPDATE_OPPORTUNITY="UPDATEOPP";
export const GET_OPPORTUNITY="GETOPP";
export const LIST_OPPORTUNITY="LISTOPP";
export const LIST_OPPORTUNITY_BY_EMPLOYEE="LISTOPPBYEMPLOYEE";
export const LIST_OPPORTUNITY_BY_GROUP="LISTOPPBYGROUP";
export const LIST_OPPORTUNITY_BY_PRODUCT="LISTOPPBYPRODUCT";
export const LIST_OPPORTUNITY_BY_CLIENT="LISTOPPBYCLIENT";
export const DELETE_OPPORTUNITY="DELETEOPP";
export const ERROR = "ERROR";


export default function (state = initialState,action){
    switch (action.type) {

        case CREATE_OPPORTUNITY:

            return {
                createOpportunity:"opportunity created"
            }


        case UPDATE_OPPORTUNITY:
            return {
                ...state,
                isEditedSuccess:true,
                updateOpportunity: action.payload
            }



        case GET_OPPORTUNITY:
            return{
                ...state,
                getOpportunityById:action.payload
            }


        case LIST_OPPORTUNITY:
            return{
                ...state,
                ListOpportunities:action.payload
            }


        case LIST_OPPORTUNITY_BY_EMPLOYEE:
            return{
                ...state,
                ListOpportunitiesByEmployee:action.payload
            }


        case LIST_OPPORTUNITY_BY_GROUP:
            return{
                ...state,
                ListOpportunitiesByGroup:action.payload
            }


        case LIST_OPPORTUNITY_BY_PRODUCT:
            return{
                ...state,
                ListOpportunitiesByProduct:action.payload
            }


        case LIST_OPPORTUNITY_BY_CLIENT:
            return{
                ...state,
                ListOpportunitiesByClient:action.payload
            }



        case DELETE_OPPORTUNITY:
            return{
                DeleteOpportunities:"opportunity deleted"
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