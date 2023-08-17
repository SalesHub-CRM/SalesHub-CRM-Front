import axios from "axios";
import {CREATE_OPPORTUNITY,GET_OPPORTUNITY,LIST_OPPORTUNITY,DELETE_OPPORTUNITY,ERROR} from "../reducers/OpportunitiesReducer"

export const CreateOpportunity=(opportunity)=>dispatch=>{
    axios.post("http://localhost:8080/opportunity",opportunity,{withCredentials:true})
        .then(result=>{
            dispatch({
                type:CREATE_OPPORTUNITY
            })
        })
        .catch(err=>{
            dispatch({
                type:ERROR,
                payload:err.response
            })
        })
}


export const GetOpportunityById=(opportunityID)=>dispatch=>{
    axios.get("http://localhost:8080/opportunity/"+opportunityID,{withCredentials:true})
        .then(result=>{
            dispatch({
                type:GET_OPPORTUNITY,
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


export const ListOpportunities=()=>dispatch=>{
    axios.get("http://localhost:8080/opportunity",{withCredentials:true})
        .then(result=>{
            dispatch({
                type:LIST_OPPORTUNITY,
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


export const DeleteOpportunity=(opportunityID)=>dispatch=>{
    axios.delete("http://localhost:8080/opportunity/"+opportunityID,{withCredentials:true})
        .then(result=>{
            dispatch({
                type:DELETE_OPPORTUNITY
            })
        })
        .catch(err=>{
            dispatch({
                type:ERROR,
                payload:err.response
            })
        })
}