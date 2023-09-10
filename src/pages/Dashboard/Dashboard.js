import React from "react";
import "./Dashboard.css";
import {Routes,Route} from "react-router";
import TopBar from "../../blocks/backOffice/TopBar/TopBar";
import SideBar from "../../blocks/backOffice/SideBar/SideBar";
import Home from "../../blocks/backOffice/Home/Home";



const Dashboard = () => {
    return(
        <div>

            <TopBar/>

            <div className="contain">
                <SideBar/>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                </Routes>
            </div>
        </div>
    )
}

export default Dashboard;