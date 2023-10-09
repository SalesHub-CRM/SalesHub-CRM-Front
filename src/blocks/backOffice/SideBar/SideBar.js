import React, {useState} from "react";
import "./SideBar.css";
import {Home, Timeline, Person, Store} from '@mui/icons-material';
import GroupsIcon from '@mui/icons-material/Groups';
import BusinessIcon from '@mui/icons-material/Business';
import SearchIcon from '@mui/icons-material/Search';
import HailIcon from '@mui/icons-material/Hail';
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


                        <li className="sidebarItem dropdown">
                            <HailIcon />
                            <button
                                className="sidebarIcon btn btn-link dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton1"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Manage Employees
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><Link className="dropdown-item" to="/Dashboard/listEmployees">My employees</Link></li>
                                <li><Link className="dropdown-item" to="/Dashboard/addEmployee">Add a new employee</Link></li>
                            </ul>
                        </li>

                        <li className="sidebarItem"> <BusinessIcon className="sidebarIcon"/> <Link to="/Dashboard/listClients">My clients</Link></li>


                    </ul>
                </div>
            </div>
        </div>
    )
}

export default SideBar;