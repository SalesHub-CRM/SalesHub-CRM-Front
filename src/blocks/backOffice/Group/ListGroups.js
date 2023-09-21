import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {DeleteGroup, ListGroupsByAdmin} from "../../../redux/actions/GroupsActions";
import {useNavigate} from "react-router";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import DeleteSuccessModal from "../modals/group/DeleteSuccessModal";


const ListGroups = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const groups = useSelector(state=>state.Group.ListGroups);
    const user =JSON.parse(localStorage.getItem('user'));


    useEffect(()=>{
        if(user)
        {
            dispatch(ListGroupsByAdmin(user.id))
        }
        console.log("groups",groups)
    },[]);

    const [showDeleteModal, setShowDeleteModal] = useState(false);


    //set up for the table variables
    const columns = [
        { id: 'Name', label: 'Name', minWidth: 150 },
        { id: 'Employees', label: 'Employee number', minWidth: 150 },
        { id: 'createdAt', label: 'Created at', minWidth: 150},
        { id: 'updatedAt', label: 'Last updated', minWidth: 150 },
        { id: 'actions', label: 'Actions', minWidth: 170 },
    ];

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    const handleDeleteGroup = (groupId)=>{
        console.log('groups before delete', groups);
        dispatch(DeleteGroup(groupId))
            .then(()=>{
                setShowDeleteModal(true);
                console.log("groups after delete:", groups);
            })
            .catch((error)=>{
                console.error("Error deleting group:", error);
            })
    }


    const refreshPage = () => {
        window.location.reload();
        console.log("refresh")
    };


    // Define the rows based on the Groups data
    const rows = Array.isArray(groups)
        ? groups.map((group) => ({
            id: group.id,
            Name: group.name || "-",
            Employees: group.employees.length || "0",
            createdAt: new Date(group.createdat).toLocaleDateString("en-GB") || "-",
            updatedAt: new Date(group.updatedat).toLocaleDateString("en-GB") || "-",
            actions: (

                <div className="d-flex justify-content-around">
                    <button className="btn btn-info" onClick={() => navigate(`/Dashboard/groupDetails/${group.id}`)}>Details</button>
                    <button className="btn btn-danger" onClick={() =>{
                        handleDeleteGroup(group.id);
                        navigate(`/Dashboard/listGroups`);
                    }}>Delete</button>
                </div>
            ),
        }))
        : [];


    //display conditions (depending on whether Groups is empty or not)

    if (!Array.isArray(groups)) {
        // Handle the case where Groups is not an array yet
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

    else if (groups.length === 0) {
        // Handle the case where Groups is an empty array
        return (
            <div className="DashboardHome">
                <div className="container mt-5">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-xl-10">
                            <div>
                                <h1>There are currently no groups available</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


    else{
        return(
            <div className="DashboardHome">
                <div className="container mt-5">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-xl-10">


                            <div className="homepage-titles creatAccountTitle">
                                <h4 className="mt-5 mb-5 pb-1 text-center" style={{color:"red"}}>WARNING : Deleting a group will result in the deletion
                                of all associated data (employees, leads, clients etc...). please proceed with caution.</h4>
                            </div>


                            {/* Display the DeleteSuccessModal component */}
                            <DeleteSuccessModal show={showDeleteModal} onClose={() => {
                                setShowDeleteModal(false);
                                refreshPage(); // Refresh the page when the modal is closed
                            }}
                            />


                            <Paper style={{ width: "100%", overflow: "hidden" }} className="mt-5 mb-5">

                                <TableContainer style={{ maxHeight: 440 }}>
                                    <Table stickyHeader aria-label="sticky table">
                                        <TableHead>
                                            <TableRow>
                                                {columns.map((column) => (
                                                    <TableCell
                                                        key={column.id}
                                                        align="left"
                                                        style={{ minWidth: column.minWidth }}
                                                    >
                                                        {column.label}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows
                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                .map((row) => {
                                                    return (
                                                        <TableRow key={row.id}>
                                                            {columns.map((column) => (
                                                                <TableCell key={column.id} align="left">
                                                                    {row[column.id]}
                                                                </TableCell>
                                                            ))}
                                                        </TableRow>
                                                    );
                                                })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <TablePagination
                                    rowsPerPageOptions={[10, 25, 100]}
                                    component="div"
                                    count={groups.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />

                            </Paper>


                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default ListGroups;