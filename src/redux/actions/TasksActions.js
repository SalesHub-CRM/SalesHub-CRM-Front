import axios from "axios";
import {CREATE_TASK,UPDATE_TASK,GET_TASK,LIST_TASK,LIST_TASK_BY_ADMIN,LIST_TASK_BY_EMPLOYEE,DELETE_TASK,ERROR} from "../reducers/TasksReducer"

export const CreateTask=(task)=>dispatch=>{
    return new Promise((resolve, reject) => {
        axios.post("http://localhost:8081/API/task",task,{
            withCredentials:true,headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(result=>{
                dispatch({
                    type:CREATE_TASK
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


export const UpdateTask=(task,id)=>dispatch=>{
    return new Promise((resolve, reject) => {
        axios.put("http://localhost:8081/API/task/"+id,task,{
            withCredentials:true,headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(result=>{
                dispatch({
                    type:UPDATE_TASK,
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


export const GetTaskById=(taskId)=>dispatch=>{
    axios.get("http://localhost:8081/API/task/"+taskId,{withCredentials:true})
        .then(result=>{
            dispatch({
                type:GET_TASK,
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


export const ListTasks=()=>dispatch=>{
    axios.get("http://localhost:8081/API/task",{withCredentials:true})
        .then(result=>{
            dispatch({
                type:LIST_TASK,
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


export const ListTasksByAdmin=(adminId)=>dispatch=>{
    axios.get("http://localhost:8081/API/task/byAdminId/"+adminId,{withCredentials:true})
        .then(result=>{
            dispatch({
                type:LIST_TASK_BY_ADMIN,
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


export const ListTasksByEmployee=(employeeId)=>dispatch=>{
    axios.get("http://localhost:8081/API/task/byEmployee/"+employeeId,{withCredentials:true})
        .then(result=>{
            dispatch({
                type:LIST_TASK_BY_EMPLOYEE,
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


export const DeleteTask=(taskId,user)=>dispatch=>{
    return new Promise((resolve, reject) => {
        axios.delete("http://localhost:8081/API/task/" + taskId, {withCredentials: true})
            .then(result => {

                if(user.roles.includes("ROLE_ADMIN"))
                {
                    dispatch(ListTasksByAdmin(user.id))
                }
                else
                {
                    dispatch(ListTasksByEmployee(user.id))
                }
                resolve(result.data)
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