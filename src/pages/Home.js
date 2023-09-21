import Header from "../blocks/frontOffice/Header";
import Footer from "../blocks/frontOffice/Footer";
import React, {useEffect, useState} from "react";
import Homepage from "../components/FontOffice/Homepage";
import Leadspage from "../components/FontOffice/Leadspage";
import Contactspage from "../components/FontOffice/Contactspage";
import Opportunitiespage from "../components/FontOffice/Opportunitiespage";
import Clientspage from "../components/FontOffice/Clientspage";
import Productspage from "../components/FontOffice/Productspage";
import Campaignspage from "../components/FontOffice/Campaignspage";
import Taskspage from "../components/FontOffice/Taskspage";
import Casespage from "../components/FontOffice/Casespage";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {setConnected} from "../redux/actions/AuthenticationActions";
import {Link, Route, Routes} from "react-router-dom";
import {CountsGroupsByAdmin} from "../redux/actions/GroupsActions";
import Welcomepage from "../components/FontOffice/Welcomepage";


const Home=()=>{


    const dispatch = useDispatch();
    const navigate=useNavigate();
    const AuthState = useSelector(state => state.Auth);
    const user =JSON.parse(localStorage.getItem('user'))

    useEffect(()=>{
        const token = JSON.parse(localStorage.getItem('authTokens'));
        if(!token)
        {
            localStorage.removeItem('authTokens');
            navigate('/login');
        }
        else{
            dispatch(setConnected(token,user));
        }
    },[AuthState.isConnected,dispatch, navigate])


    const [show, setShow] = useState(0)

    return(

        <div>
            <Header/>

            <div className="d-flex justify-content-around">
                <Link className="btn btn-light" to="/home/lead">Leads</Link>

                {/*<button className="btn btn-light" onClick={() => setShow(1)}>Leads</button>*/}
                <button className="btn btn-light" onClick={() => setShow(2)}>Contacts</button>
                <button className="btn btn-light" onClick={() => setShow(3)}>Opportunities</button>
                <button className="btn btn-light" onClick={() => setShow(4)}>Clients</button>
                <button className="btn btn-light" onClick={() => setShow(5)}>Products</button>
                <button className="btn btn-light" onClick={() => setShow(6)}>Campaigns</button>
                <button className="btn btn-light" onClick={() => setShow(7)}>Tasks</button>
                <button className="btn btn-light" onClick={() => setShow(8)}>Cases</button>

            </div>


            <Routes>
                <Route path="/" element={<Welcomepage/>}/>
                <Route path="/lead/*" element={<Leadspage/>}/>
                <Route/>
                <Route/>
                <Route/>
                <Route/>
                <Route/>
                <Route/>
            </Routes>
            {/*<div className="d-flex justify-content-around">
                <button className="btn btn-light" onClick={() => setShow(0)}>Home</button>
                <button className="btn btn-light" onClick={() => setShow(1)}>Leads</button>
                <button className="btn btn-light" onClick={() => setShow(2)}>Contacts</button>
                <button className="btn btn-light" onClick={() => setShow(3)}>Opportunities</button>
                <button className="btn btn-light" onClick={() => setShow(4)}>Clients</button>
                <button className="btn btn-light" onClick={() => setShow(5)}>Products</button>
                <button className="btn btn-light" onClick={() => setShow(6)}>Campaigns</button>
                <button className="btn btn-light" onClick={() => setShow(7)}>Tasks</button>
                <button className="btn btn-light" onClick={() => setShow(8)}>Cases</button>

            </div>
            {show === 0 && <Homepage/> }
            {show === 1 && <Leadspage/> }
            {show === 2 && <Contactspage/> }
            {show === 3 && <Opportunitiespage/> }
            {show === 4 && <Clientspage/> }
            {show === 5 && <Productspage/> }
            {show === 6 && <Campaignspage/> }
            {show === 7 && <Taskspage/> }
            {show === 8 && <Casespage/> }*/}




            <Footer/>
        </div>
    )
}

export default Home;