import axios from "axios";
import {CREATE_CONTACT,GET_CONTACT,LIST_CONTACT,DELETE_CONTACT,ERROR} from "../reducers/ContactsReducer"

export const CreateContact=(contact)=>dispatch=>{
    axios.post("http://localhost:8080/contact",contact,{withCredentials:true})
        .then(result=>{
            dispatch({
                type:CREATE_CONTACT
            })
        })
        .catch(err=>{
            dispatch({
                type:ERROR,
                payload:err.response
            })
        })
}


export const GetContactById=(contactID)=>dispatch=>{
    axios.get("http://localhost:8080/contact/"+contactID,{withCredentials:true})
        .then(result=>{
            dispatch({
                type:GET_CONTACT,
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


export const ListContacts=()=>dispatch=>{
    axios.get("http://localhost:8080/contact",{withCredentials:true})
        .then(result=>{
            dispatch({
                type:LIST_CONTACT,
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


export const DeleteContact=(contactID)=>dispatch=>{
    axios.delete("http://localhost:8080/contact/"+contactID,{withCredentials:true})
        .then(result=>{
            dispatch({
                type:DELETE_CONTACT
            })
        })
        .catch(err=>{
            dispatch({
                type:ERROR,
                payload:err.response
            })
        })
}