
const initialState={
    createClient:{},
    updateClient:{},
    getClientById:{},
    ListClients:{},
    ListClientsByAdmin:[],
    ListClientsByGroup:[],
    ListClientsByEmployee:[],
    ListClientsByType:[],
    CountClientsByEmployee:{},
    DeleteClients:{},
    ClientStats:{},
    errors:{},
}

export const CREATE_CLIENT="CREATECLIENT";
export const UPDATE_CLIENT="UPDATECLIENT";
export const GET_CLIENT="GETCLIENT";
export const GET_CLIENT_STATS="GETCLIENTSTATS";
export const LIST_CLIENT="LISTCLIENT";
export const LIST_CLIENT_BY_ADMIN="LISTCLIENTBYADMIN";
export const LIST_CLIENT_BY_GROUP="LISTCLIENTBYGROUP";
export const LIST_CLIENT_BY_EMPLOYEE="LISTCLIENTBYEMPLOYEE";
export const LIST_CLIENT_BY_TYPE="LISTCLIENTBYTYPE";
export const COUNT_CLIENTS_BY_EMPLOYEE="COUNTCLIENTSBYEMPLOYEE";
export const DELETE_CLIENT="DELETECLIENT";
export const ERROR = "ERROR";


export default function (state = initialState,action){
    switch (action.type) {

        case CREATE_CLIENT:

            return {
                createClient:"client created"
            }



        case UPDATE_CLIENT:
            return{
                ...state,
                isEditedSuccess:true,
                updateClient: action.payload
            }



        case GET_CLIENT:
            return{
                ...state,
                getClientById:action.payload
            }



        case GET_CLIENT_STATS:
            return{
                ...state,
                ClientStats:action.payload
            }



        case LIST_CLIENT:
            return{
                ...state,
                ListClients:action.payload
            }



        case LIST_CLIENT_BY_ADMIN:
            return {
                ...state,
                ListClientsByAdmin: action.payload
            }



        case LIST_CLIENT_BY_GROUP:
            return {
                ...state,
                ListClientsByGroup: action.payload
            }



        case LIST_CLIENT_BY_EMPLOYEE:
            return {
                ...state,
                ListClientsByEmployee: action.payload
            }



        case LIST_CLIENT_BY_TYPE:
            return {
                ...state,
                ListClientsByType: action.payload
            }


        case COUNT_CLIENTS_BY_EMPLOYEE:
            return {
                ...state,
                CountClientsByEmployee: action.payload
            }



        case DELETE_CLIENT:
            const clientId = action.payload
            return{
                ...state,
                ListClientsByEmployee: state.ListClientsByEmployee.filter((client)=>client.id!==clientId)
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