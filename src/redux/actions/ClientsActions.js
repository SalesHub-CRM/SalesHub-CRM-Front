import axios from "axios"
import {CREATE_CLIENT,UPDATE_CLIENT,GET_CLIENT,LIST_CLIENT,LIST_CLIENT_BY_ADMIN,LIST_CLIENT_BY_GROUP,
    LIST_CLIENT_BY_EMPLOYEE,LIST_CLIENT_BY_TYPE,DELETE_CLIENT,COUNT_CLIENTS_BY_EMPLOYEE,GET_CLIENT_STATS,
    ERROR} from "../reducers/ClientsReducer"


export const CreateClient=(client)=>dispatch=>{
    return new Promise((resolve, reject) => {
        axios.post("http://localhost:8081/API/client",client,{
            withCredentials:true,headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(result=>{
                dispatch({
                    type:CREATE_CLIENT
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


export const UpdateClient=(client,id)=>dispatch=>{
    return new Promise((resolve, reject) => {
        axios.put("http://localhost:8081/API/client/"+id,client,{
            withCredentials:true,headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(result=>{
                dispatch({
                    type:UPDATE_CLIENT,
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


export const GetClientById=(clientID)=>dispatch=>{
    axios.get("http://localhost:8081/API/client/"+clientID,{withCredentials:true})
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
    axios.get("http://localhost:8081/API/client",{withCredentials:true})
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



export const ListClientsByAdmin=(adminId)=>dispatch=>{
    axios.get("http://localhost:8081/API/client/getByAdmin/"+adminId,{withCredentials:true})
        .then(result=>{
            dispatch({
                type:LIST_CLIENT_BY_ADMIN,
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



export const ListClientsByGroup=(groupId)=>dispatch=>{
    axios.get("http://localhost:8081/API/client/listbygroup/"+groupId,{withCredentials:true})
        .then(result=>{
            dispatch({
                type:LIST_CLIENT_BY_GROUP,
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


export const ListClientsByEmployee=(employeeId)=>dispatch=>{
    axios.get("http://localhost:8081/API/client/listbyemployee/"+employeeId,{withCredentials:true})
        .then(result=>{
            dispatch({
                type:LIST_CLIENT_BY_EMPLOYEE,
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


export const ListClientsByTypeAndEmployee=(requestClient)=>dispatch=>{
    return new Promise((resolve, reject) => {
        axios.get("http://localhost:8081/API/client/getByEmployeeType",requestClient,{withCredentials:true})
            .then(result=>{
                dispatch({
                    type:LIST_CLIENT_BY_TYPE,
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


export const CountClientsByEmployee=(employeeId)=>dispatch=>{
    axios.get("http://localhost:8081/API/client/countbyemployee/"+employeeId,{withCredentials:true})
        .then(result=>{
            dispatch({
                type:COUNT_CLIENTS_BY_EMPLOYEE,
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


export const DeleteClient=(clientID,user)=>dispatch=>{
    return new Promise((resolve, reject) => {
        axios.delete("http://localhost:8081/API/client/"+clientID,{withCredentials:true})
            .then(result=>{
                dispatch(ListClientsByEmployee(user.id))
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


export const GetClientsStats=(adminId)=>dispatch=>{
    axios.get("http://localhost:8081/API/client/getClientStats/"+adminId,{withCredentials:true})
        .then(result=>{
            dispatch({
                type:GET_CLIENT_STATS,
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

