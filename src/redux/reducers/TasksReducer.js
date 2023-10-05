
const initialState={
    createTask:{},
    updateTask:{},
    getTaskById:{},
    ListTasks:{},
    ListTasksByAdmin:[],
    ListTasksByEmployee:[],
    ListTasksByAssignedTo:[],
    DeleteTasks:{},
    errors:{},
}

export const CREATE_TASK="CREATETASK";
export const UPDATE_TASK="UPDATETASK";
export const GET_TASK="GETTASK";
export const LIST_TASK="LISTTASK";
export const LIST_TASK_BY_ADMIN="LISTTASKBYADMIN";
export const LIST_TASK_BY_EMPLOYEE="LISTTASKBYEMPLOYEE";
export const LIST_TASK_BY_ASSIGNED="LISTTASKBYASSIGNED";
export const DELETE_TASK="DELETETASK";
export const ERROR = "ERROR";


export default function (state = initialState,action){
    switch (action.type) {

        case CREATE_TASK:

            return {
                createTask:"task created"
            }

        case UPDATE_TASK:
            return{
                ...state,
                isEditSuccess:true,
                updateTask: action.payload
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

        case LIST_TASK_BY_ADMIN:
            return {
                ...state,
                ListTasksByAdmin: action.payload
            }

        case LIST_TASK_BY_EMPLOYEE:
            return {
                ...state,
                ListTasksByEmployee: action.payload
            }

        case LIST_TASK_BY_ASSIGNED:
            return {
                ...state,
                ListTasksByAssignedTo: action.payload
            }

        case DELETE_TASK:
            const taskId = action.payload
            return{
                ...state,
                ListTasksByAdmin: state.ListTasksByAdmin.filter((task)=>task.id!==taskId),
                ListTasksByEmployee: state.ListTasksByEmployee.filter((task)=>task.id!==taskId),

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