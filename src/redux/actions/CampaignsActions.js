import axios from "axios";
import axiosInstance from "../../utils/axiosInterceptor";
import {CREATE_CAMPAIGN,GET_CAMPAIGN,LIST_CAMPAIGN,DELETE_CAMPAIGN,ERROR} from '../reducers/CampaignsReducer';

export const CreateCampaign=(campaign)=>dispatch=>{
    axios.post("http://localhost:8080/campaign",campaign,{withCredentials:true})
        .then(result=>{
            dispatch({
                type:CREATE_CAMPAIGN
            })
        })
        .catch(err=>{
            dispatch({
                type:ERROR,
                payload:err.response
            })
        })
}


export const GetCampaignById=(campaignID)=>dispatch=>{
    axios.get("http://localhost:8080/campaign/"+campaignID,{withCredentials:true})
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
    axios.get("http://localhost:8080/campaign",{withCredentials:true})
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


export const DeleteCampaign=(campaignID)=>dispatch=>{
    axios.delete("http://localhost:8080/campaign/"+campaignID,{withCredentials:true})
        .then(result=>{
            dispatch({
                type:DELETE_CAMPAIGN
            })
        })
        .catch(err=>{
            dispatch({
                type:ERROR,
                payload:err.response
            })
        })
}