import axios from "axios";
import {CREATE_OPPORTUNITY,UPDATE_OPPORTUNITY,GET_OPPORTUNITY,LIST_OPPORTUNITY,
    LIST_OPPORTUNITY_BY_EMPLOYEE,LIST_OPPORTUNITY_BY_GROUP,LIST_OPPORTUNITY_BY_PRODUCT,
    LIST_OPPORTUNITY_BY_CLIENT,DELETE_OPPORTUNITY,ERROR} from "../reducers/OpportunitiesReducer"

export const CreateOpportunity=(opportunity)=>dispatch=>{
    return new Promise((resolve, reject) => {
        axios.post("http://localhost:8081/API/opportunity",opportunity,{
            withCredentials:true, headers: {
                'Content-Type': 'application/json'
            }})
            .then(result=>{
                dispatch({
                    type:CREATE_OPPORTUNITY
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



export const UpdateOpportunity=(opportunity,opportunityId)=>dispatch=>{
    return new Promise((resolve, reject) => {
        axios.put("http://localhost:8081/API/opportunity/"+opportunityId,opportunity,{
            withCredentials:true, headers: {
                'Content-Type': 'application/json'
            }})
            .then(result=>{
                dispatch({
                    type:UPDATE_OPPORTUNITY,
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


export const GetOpportunityById=(opportunityID)=>dispatch=>{
    axios.get("http://localhost:8081/API/opportunity/"+opportunityID,{withCredentials:true})
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
    axios.get("http://localhost:8081/API/opportunity",{withCredentials:true})
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



export const ListOpportunitiesByEmployeeFunction=(employeeId)=>dispatch=>{
    axios.get("http://localhost:8081/API/opportunity/byEmployee/"+employeeId,{withCredentials:true})
        .then(result=>{
            dispatch({
                type:LIST_OPPORTUNITY_BY_EMPLOYEE,
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



export const ListOpportunitiesByGroupFunction=(groupId)=>dispatch=>{
    axios.get("http://localhost:8081/API/opportunity/byGroup/"+groupId,{withCredentials:true})
        .then(result=>{
            dispatch({
                type:LIST_OPPORTUNITY_BY_GROUP,
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



export const ListOpportunitiesByProductFunction=(productId)=>dispatch=>{
    axios.get("http://localhost:8081/API/opportunity/byProduct/"+productId,{withCredentials:true})
        .then(result=>{
            dispatch({
                type:LIST_OPPORTUNITY_BY_PRODUCT,
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


export const ListOpportunitiesByClientFunction=(clientId)=>dispatch=>{
    axios.get("http://localhost:8081/API/opportunity/byClient/"+clientId,{withCredentials:true})
        .then(result=>{
            dispatch({
                type:LIST_OPPORTUNITY_BY_CLIENT,
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



export const DeleteClientOpportunity=(opportunityID,clientId)=>dispatch=>{
    return new Promise((resolve, reject) => {
        axios.delete("http://localhost:8081/API/opportunity/"+opportunityID,{withCredentials:true})
            .then(result=>{
                dispatch(ListOpportunitiesByClientFunction(clientId))
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


export const DeleteProductOpportunity=(opportunityID,productId)=>dispatch=>{
    return new Promise((resolve, reject) => {
        axios.delete("http://localhost:8081/API/opportunity/"+opportunityID,{withCredentials:true})
            .then(result=>{
                dispatch(ListOpportunitiesByProductFunction(productId))
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

export const DeleteEmployeeOpportunity=(opportunityID,userId)=>dispatch=>{
    return new Promise((resolve, reject) => {
        axios.delete("http://localhost:8081/API/opportunity/"+opportunityID,{withCredentials:true})
            .then(result=>{
                dispatch(ListOpportunitiesByEmployeeFunction(userId))
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