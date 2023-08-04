import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {// If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    // console.log(localStorage ? true : false);
    // const dispatch = useDispatch()
    // useEffect(() => {
    //     if (!localStorage.getItem('user')) {
    //         console.log("localstorage not found");
    //         dispatch(setConnected())
    //     }
    // })
    // console.log(isConnected);
    // console.log(props.isConnected);
    return localStorage.getItem('user') ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute