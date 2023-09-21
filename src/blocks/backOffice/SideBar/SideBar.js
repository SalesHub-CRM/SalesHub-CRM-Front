import React, {useState} from "react";
import "./SideBar.css";
import {Home, Timeline, Person, Store} from '@mui/icons-material';
import GroupsIcon from '@mui/icons-material/Groups';
import SearchIcon from '@mui/icons-material/Search';
import {Link} from "react-router-dom";

const SideBar = () => {


    return(
        <div className="sidebar">
            <div className="sidebarWrapper">

                <div className="sidebarMenu">
                    <h3 className="sidebarTitle mt-5">Dashboard</h3>
                    <ul className="sidebarList">
                        <li className="sidebarItem">
                            <Home className="sidebarIcon"/> <Link to="/Dashboard">Home</Link>
                        </li>


                        <li className="sidebarItem dropdown">
                            <GroupsIcon />
                            <button
                                className="sidebarIcon btn btn-link dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton1"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                 Manage Group
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><Link className="dropdown-item" to="/Dashboard/listGroups">My groups</Link></li>
                                <li><Link className="dropdown-item" to="/Dashboard/addGroup">Add a new group</Link></li>
                            </ul>
                        </li>


                        <li className="sidebarItem">
                            <Timeline className="sidebarIcon"/> <Link to="/Dashboard/addGroup">Statistics</Link>
                        </li>
                        <li className="sidebarItem">
                            <Person className="sidebarIcon"/> <Link to="/">Search by user</Link>
                        </li>
                        <li className="sidebarItem">
                            <SearchIcon className="sidebarIcon"/> <Link to="/">Lookup operation by ID</Link>
                        </li>

                    </ul>
                </div>
            </div>
        </div>
    )
}

export default SideBar;