
const initialState={
    createClient:{},
    getClientById:{},
    ListClients:{},
    DeleteClients:{},
    errors:{},
}

export const CREATE_CLIENT="CREATECLIENT";
export const GET_CLIENT="GETCLIENT";
export const LIST_CLIENT="LISTCLIENT";
export const DELETE_CLIENT="DELETECLIENT";
export const ERROR = "ERROR";


export default function (state = initialState,action){
    switch (action.type) {

        case CREATE_CLIENT:

            return {
                createClient:"client created"
            }



        case GET_CLIENT:
            return{
                ...state,
                getClientById:action.payload
            }


        case LIST_CLIENT:
            return{
                ...state,
                ListClients:action.payload
            }


        case DELETE_CLIENT:
            return{
                DeleteClients:"client deleted"
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