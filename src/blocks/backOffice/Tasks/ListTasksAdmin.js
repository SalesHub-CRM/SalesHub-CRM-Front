import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {DeleteTask, ListTasksByAdmin} from "../../../redux/actions/TasksActions";
import {ListGroupsByAdmin} from "../../../redux/actions/GroupsActions";
import DeleteLeadAdminSuccess from "../modals/leadAdmin/DeleteLeadAdminSuccess";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import {useForm} from "react-hook-form";
import DeleteTaskAdminSuccessModal from "../modals/taskAdmin/DeleteTaskAdminSuccessModal";


const ListTasksAdmin = () => {
    const {register, handleSubmit, formState:{errors}}= useForm();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const groups = useSelector(state=>state.Group.ListGroups);
    const user =JSON.parse(localStorage.getItem('user'));

    useEffect(()=>{
        if(user)
        {
            dispatch(ListGroupsByAdmin(user.id))
        }

    },[]);


    const [selectedGroupId, setSelectedGroupId] = useState(null);
    const [selectedGroupTasks, setSelectedGroupTasks] = useState([]);

    const [selectedGroupTasksLength, setSelectedGroupTasksLength] = useState(0);

    const handleGroupChange = (e) => {
        const groupId = e.target.value;
        setSelectedGroupId(groupId);
        const selectedGroup = groups.find(group => group.id === parseInt(groupId));
        if (selectedGroup) {
            setSelectedGroupTasks(selectedGroup.tasks);
            setSelectedGroupTasksLength(selectedGroup.tasks.length);
        } else {
            setSelectedGroupTasks([]);
            setSelectedGroupTasksLength(0);
        }


        if (selectedGroup) {
            setSelectedGroupTasks(selectedGroup.tasks);
        } else {
            setSelectedGroupTasksLength([]);
        }
    };

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const columns = [
        { id: 'subject', label: 'Subject', minWidth: 150 },
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

    const handleDeleteTask = (taskId) => {

        dispatch(DeleteTask(taskId,user))
            .then(() => {
                setShowDeleteModal(true);
            })
            .catch((error) => {
                console.error("Error deleting lead:", error);
            });
    };

    const refreshPage = () => {
        window.location.reload();
        console.log("refresh")
    };

    const rows = selectedGroupTasks?.map((task) => ({
        id: task.id,
        subject: task.subject || "-",
        priority: task.priority || "-",
        dueDate: new Date(task.duedate).toLocaleDateString("en-GB") || "-",
        status: task.status || "-",
        actions: (
            <div className="d-flex justify-content-around">
                <button className="btn btn-info" onClick={() => navigate(`/Dashboard/taskDetailsAdmin/${task.id}`)}>Details</button>
                <button className="btn btn-danger" onClick={() => {
                    handleDeleteTask(task.id);
                    navigate(`/Dashboard/listTasks`);
                }}>Delete</button>
            </div>
        ),
    }));


    if (!Array.isArray(groups)) {
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
        return (
            <div className="DashboardHome">
                <div className="container mt-5">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-xl-10">
                            <div>
                                <h1>You need to have an active group to manage tasks</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


    else{
        return (
            <div className="DashboardHome">
                <div className="container mt-5">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-xl-10">


                            <DeleteTaskAdminSuccessModal show={showDeleteModal} onClose={() => {
                                setShowDeleteModal(false);
                                refreshPage();
                            }}/>


                            <div>
                                <h1>Please choose which group you want to consult</h1>
                            </div>


                            <div className="formUnit d-flex justify-content-center">
                                <div className="form-outline col-5 mb-5">
                                    <label className="form-label" htmlFor="form2Example11">Please choose the group :</label>
                                    <select
                                        className="form-select"
                                        {...register("id")}
                                        onChange={handleGroupChange}
                                        value={selectedGroupId || ""}
                                    >
                                        <option value="" disabled>Select a group</option>
                                        {groups.map(group => (
                                            <option key={group.id} value={group.id}>{group.name}</option>
                                        ))}
                                    </select>
                                </div>

                            </div>

                            {/* Display employees of the selected group or message */}
                            {selectedGroupTasks.length > 0 ? (
                                <div>
                                    <h2>Tasks in Selected Group</h2>


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
                                            count={selectedGroupTasksLength}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                        />

                                    </Paper>


                                </div>
                            ) : (
                                <h3>This group has no tasks.</h3>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        )
    }


}

export default ListTasksAdmin;