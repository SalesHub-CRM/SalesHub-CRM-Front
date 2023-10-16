
const initialState={
    createCase:{},
    updateCase:{},
    getCaseById:{},
    getClientByCaseId:{},
    ListCases:{},
    ListCasesByGroup:[],
    ListCasesByClient:[],
    DeleteCase:{},
    errors:{},
}

export const CREATE_CASE="CREATECASE";
export const UPDATE_CASE="UPDATECASE";
export const GET_CASE="GETCASE";
export const GET_CLIENT_BY_CASE="GETCLIENTBYCASE";
export const LIST_CASE="LISTCASE";
export const LIST_CASE_BY_GROUP="LISTCASEBYGROUP";
export const LIST_CASE_BY_CLIENT="LISTCASEBYCLIENT";
export const DELETE_CASE="DELETECASE";
export const ERROR = "ERROR";

export default function (state = initialState,action){
    switch (action.type) {

        case CREATE_CASE:

            return {
                createCase:"case created"
            }


        case UPDATE_CASE:
            return {
                ...state,
                isEditedSuccess:true,
                updateCase: action.payload
            }



        case GET_CASE:
            return{
                ...state,
                getCaseById:action.payload
            }


        case GET_CLIENT_BY_CASE:
            return{
                ...state,
                getClientByCaseId:action.payload
            }


        case LIST_CASE:
            return{
                ...state,
                ListCases:action.payload
            }


        case LIST_CASE_BY_GROUP:
            return{
                ...state,
                ListCasesByGroup:action.payload
            }


        case LIST_CASE_BY_CLIENT:
            return{
                ...state,
                ListCasesByClient:action.payload
            }


        case DELETE_CASE:
            const caseID = action.payload
            return{
                ...state,
                ListCasesByGroup: state.ListCasesByGroup.filter((Case)=>Case.id!==caseID)
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