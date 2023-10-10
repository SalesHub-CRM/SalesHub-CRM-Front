import axios from "axios";
import {CREATE_CONTACT,UPDATE_CONTACT,GET_CONTACT,LIST_CONTACT,LIST_CONTACT_BY_GROUP,LIST_CONTACT_BY_CLIENT,DELETE_CONTACT,ERROR} from "../reducers/ContactsReducer"

export const CreateContact=(contact)=>dispatch=>{
    return new Promise((resolve, reject) => {
    axios.post("http://localhost:8081/API/contact",contact,{
        withCredentials:true,headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(result=>{
            dispatch({
                type:CREATE_CONTACT
            })
            resolve();
        })
        .catch(err=>{
            dispatch({
                type:ERROR,
                payload:err.response
            })
            reject(err);
        })
    })
}


export const UpdateContact=(contact,contactId)=>dispatch=>{
    return new Promise((resolve, reject) => {
        axios.put("http://localhost:8081/API/contact/"+contactId,contact,{
            withCredentials:true,headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(result=>{
                dispatch({
                    type:UPDATE_CONTACT,
                    payload:result.data
                })
                resolve();
            })
            .catch(err=>{
                dispatch({
                    type:ERROR,
                    payload:err.response
                })
                reject(err);
            })
    })
}


export const GetContactById=(contactID)=>dispatch=>{
    axios.get("http://localhost:8081/API/contact/"+contactID,{withCredentials:true})
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
    axios.get("http://localhost:8081/API/contact",{withCredentials:true})
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


export const ListContactsByGroup=(groupId)=>dispatch=>{
    axios.get("http://localhost:8081/API/contact/byGroup/"+groupId,{withCredentials:true})
        .then(result=>{
            dispatch({
                type:LIST_CONTACT_BY_GROUP,
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



export const ListContactsByClient=(clientId)=>dispatch=>{
    axios.get("http://localhost:8081/API/contact/byClient/"+clientId,{withCredentials:true})
        .then(result=>{
            dispatch({
                type:LIST_CONTACT_BY_CLIENT,
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



export const DeleteContact=(contactID,clientId)=>dispatch=>{
    return new Promise((resolve, reject) => {
        axios.delete("http://localhost:8081/API/contact/"+contactID,{withCredentials:true})
            .then(result=>{
                dispatch(ListContactsByClient(clientId))
                resolve(result.data)
            })
            .catch(err=>{
                dispatch({
                    type:ERROR,
                    payload:err.response
                })
                reject(err);
            })
    })
}