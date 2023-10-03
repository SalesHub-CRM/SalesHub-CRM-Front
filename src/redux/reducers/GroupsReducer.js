
const initialState={
    createGroup:{},
    updateGroup:{},
    getGroupById:{},
    ListGroups:[],
    countGroups:{},
    DeleteGroups:{},
    errors:{},
}

export const CREATE_GROUP="CREATEGROUP";
export const UPDATE_GROUP="UPDATEGROUP";
export const GET_GROUP="GETGROUP";
export const LIST_GROUP="LISTGROUP";
export const COUNT_GROUP="COUNTGROUP";
export const DELETE_GROUP="DELETEGROUP";
export const ERROR = "ERROR";


export default function (state = initialState,action){
    switch (action.type) {
        case CREATE_GROUP:

            return {
                createGroup:"group created"
            }

        case UPDATE_GROUP:
            return {
                ...state,
                isEditSuccess: true,
                updateGroup: action.payload
            }


        case GET_GROUP:
            return{
                ...state,
                getGroupById:action.payload
            }


        case LIST_GROUP:
            return{
                ...state,
                ListGroups:action.payload
            }

        case COUNT_GROUP:
            return{
                ...state,
                CountGroups:action.payload
            }


        case DELETE_GROUP:
            return{
                /*DeleteGroups:"group deleted"*/
                ...state,
                ListGroups: state.ListGroups.filter(group => group.id !== action.payload)
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