import axios from "axios";
import {CREATE_LEAD,UPDATE_LEAD,GET_LEAD,LIST_LEAD,DELETE_LEAD,ERROR} from "../reducers/LeadsReducer"

export const CreateLead=(lead)=>dispatch=>{
    return new Promise((resolve, reject) => {
        axios.post("http://localhost:8081/API/lead", lead, {
            withCredentials: true, headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(result => {
                dispatch({
                    type: CREATE_LEAD
                })
                resolve();
            })
            .catch(err => {
                dispatch({
                    type: ERROR,
                    payload: err.response
                })
                reject(err);
            })
    })
}


export const UpdateLead=(lead,id)=>dispatch=>{
    return new Promise((resolve, reject) => {
        axios.put("http://localhost:8081/API/lead/${id}", lead, {
            withCredentials: true, headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(result => {
                dispatch({
                    type: UPDATE_LEAD
                })
                resolve();
            })
            .catch(err => {
                dispatch({
                    type: ERROR,
                    payload: err.response
                })
                reject(err);
            })
    })
}


export const GetLeadById=(leadID)=>dispatch=>{
    axios.get("http://localhost:8081/API/lead/"+leadID,{withCredentials:true})
        .then(result=>{
            dispatch({
                type:GET_LEAD,
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


export const ListLeads=()=>dispatch=>{
    axios.get("http://localhost:8081/API/lead",{withCredentials:true})
        .then(result=>{
            dispatch({
                type:LIST_LEAD,
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


export const DeleteLead=(leadID)=>dispatch=>{
    return new Promise((resolve, reject) => {

    axios.delete("http://localhost:8081/API/lead/"+leadID,{withCredentials:true})
        .then(result=>{
            dispatch({
                type:DELETE_LEAD
            })
            resolve(result.data);
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