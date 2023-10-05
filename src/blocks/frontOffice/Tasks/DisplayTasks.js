import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {DeleteTask, ListTasksByAdmin, ListTasksByEmployee} from "../../../redux/actions/TasksActions";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import DeleteTaskSuccessModal from "../modals/task/DeleteTaskSuccessModal";
const DisplayTasks = () => {

    //const and variable decalarion, useeffect setup

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const TasksEmployee = useSelector(state => state.Task.ListTasksByEmployee);
    const TasksAdmin = useSelector(state => state.Task.ListTasksByAdmin);
    const user =JSON.parse(localStorage.getItem('user'));

    const navigate = useNavigate();


    useEffect(()=>
    {
        try{
            if(user?.roles.includes("ROLE_ADMIN"))
            {
                dispatch(ListTasksByAdmin(user.id));
                setIsLoading(false);
            }
        }
        catch (error) {
            console.error("Something went wrong:", error);
            setIsLoading(false);
        }
    },[])


    useEffect(()=>{

        try{
            if(!user?.roles.includes("ROLE_ADMIN"))
            {
                dispatch(ListTasksByEmployee(user.id));
                setIsLoading(false);
            }
        }
        catch (error) {
            console.error("Something went wrong:", error);
            setIsLoading(false);
        }

    },[])


    console.log("employee",TasksEmployee)
    console.log("admin",TasksAdmin)

    //modal handling
    const [showDeleteModal, setShowDeleteModal] = useState(false);


    //table handling

    const columns = [
        { id: 'createdBy', label: 'Created By', minWidth: 150 },
        { id: 'assignedTo', label: 'Assigned to', minWidth: 150 },
        { id: 'priority', label: 'Priority', minWidth: 100 },
        { id: 'dueDate', label: 'Due date', minWidth: 100 },
        { id: 'status', label: 'Current Status', minWidth: 150 },
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

    //delete handler

    const handleDeleteTask=(taskId)=>{
        dispatch(DeleteTask(taskId,user))
            .then(()=>{
                setShowDeleteModal(true);
            })
            .catch((error) => {
                console.error("Error deleting task:", error);
            });
    }

    // page refresh handler
    const refreshPage = () => {
        window.location.reload();
        console.log("refresh")
    };


    // Define the rows based on the Leads data
    let rows = [];

    if (user?.roles.includes("ROLE_ADMIN")) {
        rows = TasksAdmin?.map((task) => ({
            id: task.id,
            createdBy: `${task.employee.firstname || "-"} ${task.employee.lastname || "-"}`,
            assignedTo: `${task.assignedto.firstname || "-"} ${task.assignedto.lastname || "-"}`,
            priority: task.priority || "-",
            dueDate: new Date(task.duedate).toLocaleDateString("en-GB") || "-",
            status: task.status || "-",
            actions: (
                <div className="d-flex justify-content-around">
                    <button className="btn btn-info" onClick={() => navigate(`/home/task/taskDetails/${task.id}`)}>Details</button>
                    <button className="btn btn-danger" onClick={() => {
                        handleDeleteTask(task.id);
                        navigate(`/home/task`);
                    }}>Delete</button>
                </div>
            ),
        }));
    } else {
        rows = TasksEmployee?.map((task) => ({
            id: task.id,
            createdBy: `${task.employee.firstname || "-"} ${task.employee.lastname || "-"}`,
            assignedTo: `${task.assignedto.firstname || "-"} ${task.assignedto.lastname || "-"}`,
            priority: task.priority || "-",
            dueDate: new Date(task.duedate).toLocaleDateString("en-GB") || "-",
            status: task.status || "-",
            actions: (
                <div className="d-flex justify-content-around">
                    <button className="btn btn-info" onClick={() => navigate(`/home/task/taskDetails/${task.id}`)}>Details</button>
                    <button className="btn btn-danger" onClick={() => {
                        handleDeleteTask(task.id);
                        navigate(`/home/task`);
                    }}>Delete</button>
                </div>
            ),
        }));
    }


    //display conditions

    if (isLoading) {
        // Handle the case where Leads is not an array yet
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }


    else if ((user?.roles.includes("ROLE_ADMIN") && !TasksAdmin.length) || (!user?.roles.includes("ROLE_ADMIN") && !TasksEmployee.length)) {
        // Handle the case where Leads is an empty array
        return (
            <div>
                <h1>There are currently no tasks available</h1>
            </div>
        );
    }


    else {
        return (

            <div className="AddLeadPage">
                {/* Display the DeleteLeadSuccessModal component */}
                <DeleteTaskSuccessModal show={showDeleteModal} onClose={() => {
                    setShowDeleteModal(false);
                    refreshPage(); // Refresh the page when the modal is closed
                }}
                />

                <Paper style={{ width: "100%", overflow: "hidden" }}>

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
                        count={user?.roles.includes("ROLE_ADMIN") ? TasksAdmin.length : TasksEmployee.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />

                </Paper>
            </div>
        );
    }


}
export default DisplayTasks;