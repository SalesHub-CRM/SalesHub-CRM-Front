import axios from "axios";
import {CREATE_LEAD,GET_LEAD,LIST_LEAD,DELETE_LEAD,ERROR} from "../reducers/LeadsReducer"

export const CreateLead=(lead)=>dispatch=>{
    axios.post("http://localhost:8080/lead",lead,{withCredentials:true})
        .then(result=>{
            dispatch({
                type:CREATE_LEAD
            })
        })
        .catch(err=>{
            dispatch({
                type:ERROR,
                payload:err.response
            })
        })
}


export const GetLeadById=(leadID)=>dispatch=>{
    axios.get("http://localhost:8080/lead/"+leadID,{withCredentials:true})
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
    axios.get("http://localhost:8080/lead",{withCredentials:true})
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
    axios.delete("http://localhost:8080/lead/"+leadID,{withCredentials:true})
        .then(result=>{
            dispatch({
                type:DELETE_LEAD
            })
        })
        .catch(err=>{
            dispatch({
                type:ERROR,
                payload:err.response
            })
        })
}