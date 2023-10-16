import React from "react";
import "./TopBar.css";
import {Link} from "react-router-dom";
import {NotificationsNone, Settings} from '@mui/icons-material';
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import {useDispatch} from "react-redux";
import {logout} from "../../../redux/actions/AuthenticationActions";


const TopBar = () => {
    const dispatch = useDispatch();

    const logoutHandler = () =>{
        dispatch(logout())
    }

    const baseUrl = process.env.PUBLIC_URL;

    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="logo">



                    <Link to="/Dashboard">
                        <img className="topbarImage" src={`${baseUrl}/assets/images/logo.png`} alt="logo"/>
                        {/*<span style={{'margin-left':'20px','text-decoration':'none'}}>Back to client interface</span>*/}
                    </Link>
                </div>

                <div className="nav-menu NavbarMenu">
                    {/*<div className="TopbarNotification">
                        <NotificationsNone/>
                        <span className="notifBadge">3</span>
                    </div>

                    <div className="TopbarSettings">
                        <Settings/>
                    </div>*/}

                    {JSON.parse(localStorage.getItem('user')) && <li><Link to="/" onClick={logoutHandler}><PowerSettingsNewIcon/> Logout</Link></li>}

                </div>


            </div>

        </div>
    )
}

export default TopBar;