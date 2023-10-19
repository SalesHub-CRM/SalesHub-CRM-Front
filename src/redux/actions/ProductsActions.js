import axios from "axios";
import {CREATE_PRODUCT,UPDATE_PRODUCT,GET_PRODUCT,LIST_PRODUCT,LIST_PRODUCT_BY_ADMIN,LIST_PRODUCT_BY_GROUP_ADMIN,DELETE_PRODUCT,ERROR} from "../reducers/ProductsReducer"

export const CreateProduct=(product)=>dispatch=>{
    return new Promise((resolve, reject) => {
        axios.post("http://localhost:8081/API/product",product,{
            withCredentials:true,headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(result=>{
                dispatch({
                    type:CREATE_PRODUCT
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


export const UpdateProduct=(product,productId)=>dispatch=>{
    return new Promise((resolve, reject) => {
        axios.put("http://localhost:8081/API/product/"+productId,product,{
            withCredentials:true,headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(result=>{
                dispatch({
                    type:UPDATE_PRODUCT,
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



export const GetProductById=(productID)=>dispatch=>{
    axios.get("http://localhost:8081/API/product/"+productID,{withCredentials:true})
        .then(result=>{
            dispatch({
                type:GET_PRODUCT,
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


export const ListProducts=()=>dispatch=>{
    axios.get("http://localhost:8081/API/product",{withCredentials:true})
        .then(result=>{
            dispatch({
                type:LIST_PRODUCT,
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



export const ListProductsByOwnerId=(ownerId)=>dispatch=>{
    axios.get("http://localhost:8081/API/product/byOwnerId/"+ownerId,{withCredentials:true})
        .then(result=>{
            dispatch({
                type:LIST_PRODUCT_BY_ADMIN,
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


export const ListProductsByGroupOwner=(groupId)=>dispatch=>{
    axios.get("http://localhost:8081/API/product/byOwnerGroup/"+groupId,{withCredentials:true})
        .then(result=>{
            dispatch({
                type:LIST_PRODUCT_BY_GROUP_ADMIN,
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


export const DeleteProduct=(productId,userId)=>dispatch=>{
    return new Promise((resolve, reject) => {
        axios.delete("http://localhost:8081/API/product/"+productId,{withCredentials:true})
            .then(result=>{
                dispatch(ListProductsByOwnerId(userId))
                resolve(result.data)
            })
            .catch(err=>{
                dispatch({
                    type:ERROR,
                    payload:err.response
                })
                reject(err)
            })
    })
}