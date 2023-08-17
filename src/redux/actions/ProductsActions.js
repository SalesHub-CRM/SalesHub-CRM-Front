import axios from "axios";
import {CREATE_PRODUCT,GET_PRODUCT,LIST_PRODUCT,DELETE_PRODUCT,ERROR} from "../reducers/ProductsReducer"

export const CreateProduct=(product)=>dispatch=>{
    axios.post("http://localhost:8080/product",product,{withCredentials:true})
        .then(result=>{
            dispatch({
                type:CREATE_PRODUCT
            })
        })
        .catch(err=>{
            dispatch({
                type:ERROR,
                payload:err.response
            })
        })
}


export const GetProductById=(productID)=>dispatch=>{
    axios.get("http://localhost:8080/product/"+productID,{withCredentials:true})
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
    axios.get("http://localhost:8080/product",{withCredentials:true})
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


export const DeleteProduct=(productID)=>dispatch=>{
    axios.delete("http://localhost:8080/product/"+productID,{withCredentials:true})
        .then(result=>{
            dispatch({
                type:DELETE_PRODUCT
            })
        })
        .catch(err=>{
            dispatch({
                type:ERROR,
                payload:err.response
            })
        })
}