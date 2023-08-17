
const initialState={
    createCase:{},
    getCaseById:{},
    ListCases:{},
    DeleteCase:{},
    errors:{},
}

export const CREATE_CASE="CREATECASE";
export const GET_CASE="GETCASE";
export const LIST_CASE="LISTCASE";
export const DELETE_CASE="DELETECASE";
export const ERROR = "ERROR";

export default function (state = initialState,action){
    switch (action.type) {

        case CREATE_CASE:

            return {
                createCase:"case created"
            }



        case GET_CASE:
            return{
                ...state,
                getCaseById:action.payload
            }


        case LIST_CASE:
            return{
                ...state,
                ListCases:action.payload
            }


        case DELETE_CASE:
            return{
                DeleteCase:"case deleted"
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