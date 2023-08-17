import axios from "axios";
import {CREATE_TASK,GET_TASK,LIST_TASK,DELETE_TASK,ERROR} from "../reducers/TasksReducer"

export const CreateTask=(task)=>dispatch=>{
    axios.post("http://localhost:8080/task",task,{withCredentials:true})
        .then(result=>{
            dispatch({
                type:CREATE_TASK
            })
        })
        .catch(err=>{
            dispatch({
                type:ERROR,
                payload:err.response
            })
        })
}


export const GetTaskById=(taskID)=>dispatch=>{
    axios.get("http://localhost:8080/task/"+taskID,{withCredentials:true})
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
    axios.get("http://localhost:8080/task",{withCredentials:true})
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


export const DeleteTask=(taskID)=>dispatch=>{
    axios.delete("http://localhost:8080/task/"+taskID,{withCredentials:true})
        .then(result=>{
            dispatch({
                type:DELETE_TASK
            })
        })
        .catch(err=>{
            dispatch({
                type:ERROR,
                payload:err.response
            })
        })
}