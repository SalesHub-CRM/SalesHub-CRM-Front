import axios from "axios"
import {CREATE_CLIENT,GET_CLIENT,LIST_CLIENT,DELETE_CLIENT,ERROR} from "../reducers/ClientsReducer"


export const CreateClient=(client)=>dispatch=>{
    axios.post("http://localhost:8080/client",client,{withCredentials:true})
        .then(result=>{
            dispatch({
                type:CREATE_CLIENT
            })
        })
        .catch(err=>{
            dispatch({
                type:ERROR,
                payload:err.response
            })
        })
}


export const GetClientById=(clientID)=>dispatch=>{
    axios.get("http://localhost:8080/client/"+clientID,{withCredentials:true})
        .then(result=>{
            dispatch({
                type:GET_CLIENT,
                payload:result.data
            })
        })
        .catch(err=>{
            dispatch({
                type:ERROR,
                payload:err.response
            })
        })
}


export const ListClients=()=>dispatch=>{
    axios.get("http://localhost:8080/client",{withCredentials:true})
        .then(result=>{
            dispatch({
                type:LIST_CLIENT,
                payload:result.data
            })
        })
        .catch(err=>{
            dispatch({
                type:ERROR,
                payload:err.response
            })
        })
}


export const DeleteClient=(clientID)=>dispatch=>{
    axios.delete("http://localhost:8080/client/"+clientID,{withCredentials:true})
        .then(result=>{
            dispatch({
                type:DELETE_CLIENT
            })
        })
        .catch(err=>{
            dispatch({
                type:ERROR,
                payload:err.response
            })
        })
}