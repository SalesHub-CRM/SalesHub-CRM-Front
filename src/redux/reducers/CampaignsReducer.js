const initialState={
    createCampaign:{},
    getCampaignById:{},
    ListCampaigns:{},
    DeleteCampaigns:{},
    errors:{},
}

export const CREATE_CAMPAIGN="CREATECAMP";
export const GET_CAMPAIGN="GETCAMP";
export const LIST_CAMPAIGN="LISTCAMP";
export const DELETE_CAMPAIGN="DELETECAMP";
export const ERROR = "ERROR";


export default function (state = initialState,action){
    switch (action.type) {

        case CREATE_CAMPAIGN:

            return {
                createCampaign:"campaign created"
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