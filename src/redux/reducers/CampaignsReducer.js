const initialState={
    createCampaign:{},
    updateCampaign:{},
    getCampaignById:{},
    ListCampaigns:{},
    ListCampaignsByGroup:{},
    ListCampaignsByProduct:{},
    DeleteCampaigns:{},
    errors:{},
}

export const CREATE_CAMPAIGN="CREATECAMP";
export const UPDATE_CAMPAIGN="UPDATECAMP";
export const GET_CAMPAIGN="GETCAMP";
export const LIST_CAMPAIGN="LISTCAMP";
export const LIST_CAMPAIGN_BY_GROUP="LISTCAMPBYGROUP";
export const LIST_CAMPAIGN_BY_PRODUCT="LISTCAMPBYPRODUCT";
export const DELETE_CAMPAIGN="DELETECAMP";
export const ERROR = "ERROR";


export default function (state = initialState,action){
    switch (action.type) {

        case CREATE_CAMPAIGN:

            return {
                createCampaign:"campaign created"
            }

        case UPDATE_CAMPAIGN:
            return {
                ...state,
                isEditedSuccess:true,
                updateCampaign: action.payload
            }



        case GET_CAMPAIGN:
            return{
                ...state,
                getCampaignById:action.payload
            }


        case LIST_CAMPAIGN:
            return{
                ...state,
                ListCampaigns:action.payload
            }

        case LIST_CAMPAIGN_BY_GROUP:
            return{
                ...state,
                ListCampaignsByGroup:action.payload
            }


        case LIST_CAMPAIGN_BY_PRODUCT:
            return{
                ...state,
                ListCampaignsByProduct:action.payload
            }


        case DELETE_CAMPAIGN:
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