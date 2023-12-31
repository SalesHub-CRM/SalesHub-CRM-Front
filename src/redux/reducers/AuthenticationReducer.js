
const initialState={
    isConnected:false,
    user:{},
    tokens:{},
    employees:{},
    getEmployeeById:{},
    errors:{}
}


export const LOGIN_ACTION = "LOGIN";
export const REGISTRATION_ACTION = "REGISTRATION";
export const LIST_EMPLOYEES = "LISTEMPLOYEES";
export const GET_EMPLOYEE = "GETEMPLOYEE";
export const ERROR = "ERROR";
export const SET_CONNECTED = "SET_CONNECTED";
export const LOGOUT = "LOGOUT";


export default function (state = initialState,action){
    switch (action.type){
        case REGISTRATION_ACTION:

            return{
                user:"signup successful"
            }

        case LOGIN_ACTION:
            return{
                isConnected : true,
                tokens:action.payload,
                user:action.user
            }

        case LIST_EMPLOYEES:
            return {
                ...state,
                employees: action.payload
            }

        case GET_EMPLOYEE:
            return{
                ...state,
                getEmployeeById:action.payload
            }

        case ERROR:
            return{
                error:action.payload
            }

        case SET_CONNECTED:
            return{
                isConnected: true,
                tokens:action.payload,
                user:action.user
            }

        case LOGOUT:
            return {
                isConnected: false
            }


        default:
            return state;
    }
}