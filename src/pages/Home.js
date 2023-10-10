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



    return(

        <div>
            <Header/>

            <hr style={{width:'60%', margin:'25px auto'}}/>

            <div className="d-flex justify-content-around">
                <Link className="btn btn-light" to="/home/lead">Leads</Link>
                <Link className="btn btn-light" to="/home/task">Tasks</Link>
                <Link className="btn btn-light" to="/home/client">Clients</Link>
                {/*<Link className="btn btn-light" to="/home/contact">Contacts</Link>*/}
                <Link className="btn btn-light" to="/home/case">Cases</Link>
                <Link className="btn btn-light" to="/home/product">Products</Link>
                <Link className="btn btn-light" to="/home/opportunity">Opportunities</Link>
                <Link className="btn btn-light" to="/home/campaign">Campaigns</Link>
            </div>

            <hr style={{width:'60%', margin:'25px auto'}}/>

            <Routes>
                <Route path="/" element={<Welcomepage/>}/>
                <Route path="/lead/*" element={<Leadspage/>}/>
                <Route path="/task/*" element={<Taskspage/>}/>
                <Route path="/client/*" element={<Clientspage/>}/>
                <Route path="/contact/*" element={<Contactspage/>}/>
                <Route path="/case/*" element={<Casespage/>}/>
                <Route path="/product/*" element={<Productspage/>}/>
                <Route path="/opportunity/*" element={<Opportunitiespage/>}/>
                <Route path="/campaign/*" element={<Campaignspage/>}/>

            </Routes>

            <Footer/>
        </div>
    )
}

export default Home;