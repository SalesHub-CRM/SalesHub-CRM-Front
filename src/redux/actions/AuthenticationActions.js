import axios from "axios";
import axiosInstance from "../../utils/axiosInterceptor";

import {ERROR,LOGIN_ACTION,REGISTRATION_ACTION,SET_CONNECTED,LOGOUT} from "../reducers/AuthenticationReducer";

export const AdminRegistrationAction = (user)=>dispatch=>{

    return new Promise((resolve, reject) => {

        //the resolve + reject are a promise to manage the modal in signup

        axios.post("http://localhost:8081/auth/signup", user, {

            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(result => {
                dispatch({
                    type: REGISTRATION_ACTION,
                });
                resolve();
            })
            .catch(err => {
                dispatch({
                    type: ERROR,
                    payload: err.response
                });
                reject(err);
            })
    })
}


/*export const EmployeeRegistrationAction = (user)=>dispatch=>{
    axios.post("http://localhost:8080/auth/client/signup",user,{
        headers:{
            'Content-Type':'application/json'
        }
    })
        .then(result=>{
            dispatch({
                type:REGISTRATION_ACTION,
            })
        })
        .catch(err=>{
            dispatch({
                type:ERROR,
                payload:err.response
            })
        })
}*/



export const LoginAction = (credentials)=>dispatch=>{
    axios.post("http://localhost:8081/auth/signin",credentials)
        .then(result=>{
            console.log("user")
            console.log(result.data)
            //const cookieValue=result.data.cookie;
            const token = result.data.cookie.split('=')[1];

            dispatch({
                type:LOGIN_ACTION,
                payload:{accessToken:token.split(';')[0]/*,refreshToken:result.data.refreshToken*/},
                user:result.data
            })
        })
        .catch(err=>{
            dispatch({
                type:ERROR,
                payload:err.response

            })
        })
}

export const setConnected=(token,user)=>dispatch=>{

    dispatch({
        type:SET_CONNECTED,
        payload:{accessToken:token.accessToken,refreshToken:token.refreshToken},
        user:user
    })
}

export const logout =()=>dispatch=>{
    const authTokens = JSON.parse(localStorage.getItem('authTokens'))
    axiosInstance.post("http://localhost:8081/auth/signout",authTokens,{ withCredentials: true })
        .then(result=>{

            dispatch({
                type:LOGOUT
            })
            localStorage.removeItem('authTokens')
            localStorage.removeItem('user')
        })

}

export const setAuthToken = (token) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};