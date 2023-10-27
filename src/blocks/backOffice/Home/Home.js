import React, {useEffect, useState} from "react";
import "./Home.css";
import {useDispatch, useSelector} from "react-redux";
import {GetClientsStats} from "../../../redux/actions/ClientsActions";
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';


const Home = () => {

    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('user'));
    const ClientStats = useSelector(state => state.Client.ClientStats);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(()=>{
       dispatch(GetClientsStats(user.id));
        setIsLoading(false);
    },[]);


    console.log("ClientStats",ClientStats);


    const clientProgress=(difference)=>{
        if (difference<0)
        {
            return (
                <div className="text-center">
                    <p style={{fontSize:"1.26rem", fontWeight:"600", color:"red"}}> Our progress slowed down <TrendingDownIcon style={{fontSize:"2.5rem"}}/></p>
                    <p style={{fontSize:"1.26rem", fontWeight:"600", color:"red"}}>We are <span style={{fontSize:"1.7rem",marginRight:"7px",marginLeft:"7px"}}>{Math.abs(difference)}</span> short from reaching last month's numbers !</p>
                </div>

            )
        }

        else if(difference===0)
        {
            return (<p style={{fontSize:"1.26rem", fontWeight:"600"}}>We managed to break even ! We managed to match last month's numbers !</p>)
        }
        else
        {
            return (
                <div className="text-center">
                    <p style={{fontSize:"1.26rem", fontWeight:"600", color:"limegreen"}}> Our results are improving <TrendingUpIcon style={{fontSize:"2.5rem"}}/></p>
                    <p style={{fontSize:"1.26rem", fontWeight:"600", color:"limegreen"}}>We managed to exceed last month's performance and get <span style={{fontSize:"1.7rem",marginRight:"7px",marginLeft:"7px"}}>{difference}</span> extra clients !</p>
                </div>)

        }
    }


    if (isLoading) {
        return (
            <div className="DashboardHome">
                <div className="container mt-5">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-xl-10">
                            <div>
                                <h1>Loading...</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


    else {
        return(

            <div className="DashboardHome">

                <div>
                    <h1 style={{'margin':'100px auto','text-align':'center','color':'#69AADB'}}>Welcome to the Owner Dashboard Interface</h1>
                    <h2 style={{'text-align':'center','color':'#94C2E5'}}>To proceed, choose the task you want to perform on the left side menu</h2>
                </div>

                <hr style={{width:"60%",margin:"100px auto", borderWidth:"2px"}}/>

                    <div className="container mt-5">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-xl-10">
                                <div className="card-body p-md-5 mx-md-4">

                                    <div className="card rounded-3 text-black">
                                        <div className="row g-0">

                                            <div className="card-body p-md-5 mx-md-4">

                                                <div className="homepage-titles creatAccountTitle">
                                                    <h3 className="mt-1 mb-5 pb-1">Our clients in numbers :</h3>
                                                </div>

                                                <div className="text-center mb-5">
                                                    <p style={{fontSize:"1.26rem", fontWeight:"600", color:"#2A36EF"}}>We have a total of  : {ClientStats.totalClients} Clients.</p>
                                                </div>

                                                <div className="text-center mb-5">
                                                    <p style={{fontSize:"1.26rem", fontWeight:"600", color:"#2A36EF"}}>So far, we managed to secure {ClientStats.clientsThisMonth} new clients this month.</p>
                                                </div>

                                                    {clientProgress(ClientStats.difference)}


                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

            </div>
        )
    }



}

export default Home;