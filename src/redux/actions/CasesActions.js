import axios from "axios"

import {CREATE_CASE,UPDATE_CASE,GET_CASE,GET_CLIENT_BY_CASE,LIST_CASE,LIST_CASE_BY_GROUP,LIST_CASE_BY_CLIENT,DELETE_CASE,ERROR} from "../reducers/CasesReducer"


export const CreateCase=(caseOb)=>dispatch=>{
    return new Promise((resolve, reject) => {
        axios.post("http://localhost:8081/API/case",caseOb,{
            withCredentials:true,headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(result=>{
                dispatch({
                    type:CREATE_CASE
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


export const UpdateCase=(caseOb,id)=>dispatch=>{
    return new Promise((resolve, reject) => {
        axios.put("http://localhost:8081/API/case/"+id,caseOb,{
            withCredentials:true,headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(result=>{
                dispatch({
                    type:UPDATE_CASE,
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


export const GetCaseById=(caseID)=>dispatch=>{
    axios.get("http://localhost:8081/API/case/"+caseID,{withCredentials:true})
        .then(result=>{
            dispatch({
                type:GET_CASE,
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


export const GetClientByCaseId=(caseID)=>dispatch=>{
    axios.get("http://localhost:8081/API/case/clientByCase/"+caseID,{withCredentials:true})
        .then(result=>{
            dispatch({
                type:GET_CLIENT_BY_CASE,
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


export const ListCases=()=>dispatch=>{
    axios.get("http://localhost:8081/API/case",{withCredentials:true})
        .then(result=>{
            dispatch({
                type:LIST_CASE,
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


export const ListCasesByGroup=(groupId)=>dispatch=>{
    axios.get("http://localhost:8081/API/case/byGroup/"+groupId,{withCredentials:true})
        .then(result=>{
            dispatch({
                type:LIST_CASE_BY_GROUP,
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



export const ListCasesByClient=(clientId)=>dispatch=>{
    axios.get("http://localhost:8081/API/case/byClient/"+clientId,{withCredentials:true})
        .then(result=>{
            dispatch({
                type:LIST_CASE_BY_CLIENT,
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


export const DeleteCase=(caseID,groupId)=>dispatch=>{
    return new Promise((resolve, reject) => {
        axios.delete("http://localhost:8081/API/case/"+caseID,{withCredentials:true})
            .then(result=>{
                dispatch(ListCasesByGroup(groupId))
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