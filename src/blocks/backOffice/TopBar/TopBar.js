import React from "react";
import "./TopBar.css";
import {Link} from "react-router-dom";
import {NotificationsNone, Settings} from '@mui/icons-material';


const TopBar = () => {

    const baseUrl = process.env.PUBLIC_URL;

    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="logo">



                    <Link to="/">
                        <img className="topbarImage" src={`${baseUrl}/assets/images/logo.png`} alt="logo"/>
                        <span style={{'margin-left':'20px','text-decoration':'none'}}>Back to client interface</span>
                    </Link>
                </div>

                <div className="topRight">
                    <div className="TopbarNotification">
                        <NotificationsNone/>
                        <span className="notifBadge">3</span>
                    </div>

                    <div className="TopbarSettings">
                        <Settings/>
                    </div>


                </div>


            </div>

        </div>
    )
}

export default TopBar;