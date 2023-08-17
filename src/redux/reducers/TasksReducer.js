
const initialState={
    createTask:{},
    getTaskById:{},
    ListTasks:{},
    DeleteTasks:{},
    errors:{},
}

export const CREATE_TASK="CREATETASK";
export const GET_TASK="GETTASK";
export const LIST_TASK="LISTTASK";
export const DELETE_TASK="DELETETASK";
export const ERROR = "ERROR";


export default function (state = initialState,action){
    switch (action.type) {

        case CREATE_TASK:

            return {
                createTask:"task created"
            }



        case GET_TASK:
            return{
                ...state,
                getTaskById:action.payload
            }


        case LIST_TASK:
            return{
                ...state,
                ListTasks:action.payload
            }


        case DELETE_TASK:
            return{
                DeleteTasks:"product deleted"
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