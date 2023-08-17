
const initialState={
    createGroup:{},
    getGroupById:{},
    ListGroups:{},
    DeleteGroups:{},
    errors:{},
}

export const CREATE_GROUP="CREATEGROUP";
export const GET_GROUP="GETGROUP";
export const LIST_GROUP="LISTGROUP";
export const DELETE_GROUP="DELETEGROUP";
export const ERROR = "ERROR";


export default function (state = initialState,action){
    switch (action.type) {
        case CREATE_GROUP:

            return {
                createGroup:"group created"
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


        case DELETE_GROUP:
            return{
                DeleteGroups:"group deleted"
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