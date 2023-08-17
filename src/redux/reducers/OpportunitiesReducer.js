
const initialState={
    createOpportunity:{},
    getOpportunityById:{},
    ListOpportunities:{},
    DeleteOpportunities:{},
    errors:{},
}

export const CREATE_OPPORTUNITY="CREATEOPP";
export const GET_OPPORTUNITY="GETOPP";
export const LIST_OPPORTUNITY="LISTOPP";
export const DELETE_OPPORTUNITY="DELETEOPP";
export const ERROR = "ERROR";


export default function (state = initialState,action){
    switch (action.type) {

        case CREATE_OPPORTUNITY:

            return {
                createCampaign:"campaign created"
            }



        case GET_OPPORTUNITY:
            return{
                ...state,
                getCampaignById:action.payload
            }


        case LIST_OPPORTUNITY:
            return{
                ...state,
                ListCampaigns:action.payload
            }


        case DELETE_OPPORTUNITY:
            return{
                DeleteCampaigns:"campaign deleted"
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