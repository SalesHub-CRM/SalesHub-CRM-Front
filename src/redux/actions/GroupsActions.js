import axios from "axios";
import {CREATE_GROUP,GET_GROUP,LIST_GROUP,DELETE_GROUP,ERROR} from "../reducers/GroupsReducer"

export const CreateGroup=(group)=>dispatch=>{
    axios.post("http://localhost:8080/group",group,{withCredentials:true})
        .then(result=>{
            dispatch({
                type:CREATE_GROUP
            })
        })
        .catch(err=>{
            dispatch({
                type:ERROR,
                payload:err.response
            })
        })
}


export const GetGroupById=(groupID)=>dispatch=>{
    axios.get("http://localhost:8080/group/"+groupID,{withCredentials:true})
        .then(result=>{
            dispatch({
                type:GET_GROUP,
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


export const ListGroups=()=>dispatch=>{
    axios.get("http://localhost:8080/group",{withCredentials:true})
        .then(result=>{
            dispatch({
                type:LIST_GROUP,
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


export const DeleteGroup=(groupID)=>dispatch=>{
    axios.delete("http://localhost:8080/group/"+groupID,{withCredentials:true})
        .then(result=>{
            dispatch({
                type:DELETE_GROUP
            })
        })
        .catch(err=>{
            dispatch({
                type:ERROR,
                payload:err.response
            })
        })
}