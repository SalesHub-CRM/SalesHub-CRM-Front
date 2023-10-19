import React, {useState} from "react";
import "./SideBar.css";
import {Home, Timeline, Person, Store} from '@mui/icons-material';
import GroupsIcon from '@mui/icons-material/Groups';
import BusinessIcon from '@mui/icons-material/Business';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
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

                        <li className="sidebarItem"> <BusinessIcon className="sidebarIcon"/> <Link to="/Dashboard/listClients">Manage Clients</Link></li>

                        <li className="sidebarItem mt-2"> <GroupAddIcon className="sidebarIcon"/> <Link to="/Dashboard/listLeads">Manage Leads</Link></li>

                        <li className="sidebarItem dropdown">
                            <FormatListBulletedIcon />
                            <button
                                className="sidebarIcon btn btn-link dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton1"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Manage Tasks
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><Link className="dropdown-item" to="/Dashboard/listTasks">Check tasks list</Link></li>
                                <li><Link className="dropdown-item" to="/Dashboard/AddTaskAdmin">Add a new task</Link></li>
                            </ul>
                        </li>

                        <li className="sidebarItem dropdown">
                            <ShoppingCartIcon />
                            <button
                                className="sidebarIcon btn btn-link dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton1"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Manage Products
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><Link className="dropdown-item" to="/Dashboard/listProductsAdmin">Check products list</Link></li>
                                <li><Link className="dropdown-item" to="/Dashboard/AddProductAdmin">Add a new product</Link></li>
                            </ul>
                        </li>

                    </ul>
                </div>
            </div>
        </div>
    )
}

export default SideBar;