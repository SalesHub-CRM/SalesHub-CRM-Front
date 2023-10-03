import axios from "axios";
import {CREATE_LEAD,UPDATE_LEAD,GET_LEAD,LIST_LEAD,LIST_BY_ADMIN,LIST_BY_EMPLOYEE,DELETE_LEAD,ERROR} from "../reducers/LeadsReducer"

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
        axios.put("http://localhost:8081/API/lead/"+id, lead, {
            withCredentials: true, headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(result => {
                dispatch({
                    type: UPDATE_LEAD,
                    payload:result.data
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


export const ListLeads=(groupId)=>dispatch=>{
    axios.get("http://localhost:8081/API/lead/byGroup/"+groupId,{withCredentials:true})
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


export const ListLeadsByAdmin=(adminId)=>dispatch=>{
    axios.get("http://localhost:8081/API/lead/byAdmin/"+adminId,{withCredentials:true})
        .then(result=>{
            console.log("admin1")
            dispatch({
                type:LIST_BY_ADMIN,
                payload:result.data
            })
            console.log("admin")
        })
        .catch(err=>{
            dispatch({
                type:ERROR,
                payload:err.response
            })
        })
}


export const ListLeadsByEmployee=(employeeId)=>dispatch=>{
    axios.get("http://localhost:8081/API/lead/byEmployee/"+employeeId,{withCredentials:true})
        .then(result=>{
            dispatch({
                type:LIST_BY_EMPLOYEE,
                payload:result.data
            })
            console.log("employee")
        })
        .catch(err=>{
            dispatch({
                type:ERROR,
                payload:err.response
            })
        })
}


export const DeleteLead=(leadID,user)=>dispatch=>{
    return new Promise((resolve, reject) => {

    axios.delete("http://localhost:8081/API/lead/"+leadID,{withCredentials:true})
        .then(result=>{
            /*dispatch({
                type:DELETE_LEAD,
                payload: leadID,
            })*/

            if (user.roles.includes("ROLE_ADMIN")) {
                dispatch(ListLeadsByAdmin(user.id)); // Dispatch ListByAdmin if the current user is an admin
            } else {
                dispatch(ListLeadsByEmployee(user.id)); // Dispatch ListByEmployee if the current user is an employee
            }

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