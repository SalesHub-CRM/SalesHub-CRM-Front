import React from "react";
import "./SideBar.css";
import {Home, Timeline, Person, Store} from '@mui/icons-material';
import GroupsIcon from '@mui/icons-material/Groups';
import SearchIcon from '@mui/icons-material/Search';
import {Link} from "react-router-dom";

const SideBar = () => {
    return(
        <div className="sidebar">
            <div className="sidebarWrapper">
                {/*if you want to add another menu (with title and items),
                 copy the block below named sidebarMenu*/}
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Dashboard</h3>
                    <ul className="sidebarList">
                        <li className="sidebarItem">
                            <Home className="sidebarIcon"/> <Link to="/Dashboard">Home</Link>
                        </li>
                        <li className="sidebarItem">
                            <GroupsIcon className="sidebarIcon"/> <Link to="/Dashboard">Manage Group</Link>
                        </li>
                        <li className="sidebarItem">
                            <Timeline className="sidebarIcon"/> <Link to="/Dashboard">Statistics</Link>
                        </li>
                        <li className="sidebarItem">
                            <Person className="sidebarIcon"/> <Link to="/Dashboard">Search by user</Link>
                        </li>
                        <li className="sidebarItem">
                            <SearchIcon className="sidebarIcon"/> <Link to="/Dashboard">Lookup operation by ID</Link>
                        </li>

                    </ul>
                </div>
            </div>
        </div>
    )
}

export default SideBar;