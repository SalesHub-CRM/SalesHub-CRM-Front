
const initialState={
    isConnected:false,
    user:{},
    tokens:{},
    errors:{}
}


export const LOGIN_ACTION = "LOGIN";
export const REGISTRATION_ACTION = "REGISTRATION";
export const ERROR = "ERROR";
export const SET_CONNECTED = "SET_CONNECTED";
export const LOGOUT = "LOGOUT";


export default function (state = initialState,action){
    switch (action.type){
        case REGISTRATION_ACTION:
            console.log("reg act")
            return{
                user:"signup successful"
            }

        case LOGIN_ACTION:
            return{
                isConnected : true,
                tokens:action.payload,
                user:action.user
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