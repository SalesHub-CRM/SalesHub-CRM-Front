import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';


const PublicRouteHandler = () => {// If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    // const { isConnected } = useSelector(state => state.Auth)
    // const dispatch = useDispatch()
    // useEffect(() => {
    //     !localStorage && dispatch(setConnected())
    // })


    return !localStorage.getItem('user') ? <Outlet /> : <Navigate to="/" />;
}

export default PublicRouteHandler