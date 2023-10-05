import axios from "axios";
import {CREATE_GROUP,UPDATE_GROUP,GET_GROUP,LIST_GROUP,DELETE_GROUP,ERROR,COUNT_GROUP} from "../reducers/GroupsReducer"

export const CreateGroup=(group)=>dispatch=>{
    return new Promise((resolve, reject) => {
        axios.post("http://localhost:8081/API/group", group, {
            withCredentials: true, headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(result => {
                dispatch({
                    type: CREATE_GROUP
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


export const GetGroupById=(groupID)=>dispatch=>{
    axios.get("http://localhost:8081/API/group/"+groupID,{withCredentials:true})
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


export const ListGroupsByAdmin=(adminID)=>dispatch=>{
    axios.get("http://localhost:8081/API/group/listGroups/"+adminID,{withCredentials:true})
        .then(result=>{
            dispatch({
                type:LIST_GROUP,
                payload:result.data
            })
            console.log("action",result.data)
        })
        .catch(err=>{
            dispatch({
                type:ERROR,
                payload:err.response
            })
        })
}


export const UpdateGroup=(group,id)=>dispatch=>{
    return new Promise((resolve, reject) => {
        axios.put("http://localhost:8081/API/group/"+id, group, {
            withCredentials: true, headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(result => {
                dispatch({
                    type: UPDATE_GROUP,
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


export const CountsGroupsByAdmin=(adminID)=>dispatch=>{
    axios.get("http://localhost:8081/API/group/countGroups/"+adminID,{withCredentials:true})
        .then(result=>{
            dispatch({
                type:COUNT_GROUP,
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
    return new Promise((resolve, reject) => {
        axios.delete("http://localhost:8081/API/group/" + groupID, {withCredentials: true})
            .then(result => {
                dispatch({
                    type: DELETE_GROUP
                })
                resolve(result.data);
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