import axios from "axios"

import {CREATE_CASE,GET_CASE,LIST_CASE,DELETE_CASE,ERROR} from "../reducers/CasesReducer"


export const CreateCase=(caseOb)=>dispatch=>{
    axios.post("http://localhost:8080/case",caseOb,{withCredentials:true})
        .then(result=>{
            dispatch({
                type:CREATE_CASE
            })
        })
        .catch(err=>{
            dispatch({
                type:ERROR,
                payload:err.response
            })
        })
}


export const GetCaseById=(caseID)=>dispatch=>{
    axios.get("http://localhost:8080/case/"+caseID,{withCredentials:true})
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


export const ListCases=()=>dispatch=>{
    axios.get("http://localhost:8080/case",{withCredentials:true})
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


export const DeleteCase=(caseID)=>dispatch=>{
    axios.delete("http://localhost:8080/case/"+caseID,{withCredentials:true})
        .then(result=>{
            dispatch({
                type:DELETE_CASE
            })
        })
        .catch(err=>{
            dispatch({
                type:ERROR,
                payload:err.response
            })
        })
}