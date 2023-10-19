import axios from "axios";
import axiosInstance from "../../utils/axiosInterceptor";
import {CREATE_CAMPAIGN,UPDATE_CAMPAIGN,GET_CAMPAIGN,LIST_CAMPAIGN,LIST_CAMPAIGN_BY_GROUP,LIST_CAMPAIGN_BY_PRODUCT,DELETE_CAMPAIGN,ERROR} from '../reducers/CampaignsReducer';

export const CreateCampaign=(campaign)=>dispatch=>{
    return new Promise((resolve, reject) => {
        axios.post("http://localhost:8081/API/campaign",campaign,{
            withCredentials:true, headers: {
                'Content-Type': 'application/json'
            }})
            .then(result=>{
                dispatch({
                    type:CREATE_CAMPAIGN
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


export const UpdateCampaign=(campaign,campaignId)=>dispatch=>{
    return new Promise((resolve, reject) => {
        axios.put("http://localhost:8081/API/campaign/"+campaignId,campaign,{
            withCredentials:true, headers: {
                'Content-Type': 'application/json'
            }})
            .then(result=>{
                dispatch({
                    type:UPDATE_CAMPAIGN,
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


export const GetCampaignById=(campaignID)=>dispatch=>{
    axios.get("http://localhost:8081/API/campaign/"+campaignID,{withCredentials:true})
        .then(result=>{
            dispatch({
                type:GET_CAMPAIGN,
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


export const ListCampaigns=()=>dispatch=>{
    axios.get("http://localhost:8081/API/campaign",{withCredentials:true})
        .then(result=>{
            dispatch({
                type:LIST_CAMPAIGN,
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


export const ListCampaignsByProductFunction=(productId)=>dispatch=>{
    axios.get("http://localhost:8081/API/campaign/byProduct/"+productId,{withCredentials:true})
        .then(result=>{
            dispatch({
                type:LIST_CAMPAIGN_BY_PRODUCT,
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


export const ListCampaignsByGroupFunction=(groupId)=>dispatch=>{
    axios.get("http://localhost:8081/API/campaign/byGroup/"+groupId,{withCredentials:true})
        .then(result=>{
            dispatch({
                type:LIST_CAMPAIGN_BY_GROUP,
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


export const DeleteCampaignFromProductPage=(campaignID,productId)=>dispatch=>{
    return new Promise((resolve, reject) => {
        axios.delete("http://localhost:8081/API/campaign/"+campaignID,{withCredentials:true})
            .then(result=>{
                dispatch(ListCampaignsByProductFunction(productId));
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


export const DeleteCampaignFromGroupPage=(campaignID,groupId)=>dispatch=>{
    return new Promise((resolve, reject) => {
        axios.delete("http://localhost:8081/API/campaign/"+campaignID,{withCredentials:true})
            .then(result=>{
                dispatch(ListCampaignsByGroupFunction(groupId));
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