import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import React, {useEffect, useState} from "react";
import {DeleteGroup, ListGroupsByAdmin, UpdateGroup} from "../../../redux/actions/GroupsActions";
import {useForm} from "react-hook-form";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";


const ListEmployees = () => {

    const {register, handleSubmit, formState:{errors}}= useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const groups = useSelector(state=>state.Group.ListGroups);
    const user =JSON.parse(localStorage.getItem('user'));

    //states to control the display of employees by group
    const [selectedGroupId, setSelectedGroupId] = useState(null);
    const [selectedGroupEmployees, setSelectedGroupEmployees] = useState([]);


    useEffect(()=>{
        if(user)
        {
            dispatch(ListGroupsByAdmin(user.id))
        }
        console.log("groups",groups)
    },[]);

    const [selectedGroupEmployeesLength, setSelectedGroupEmployeesLength] = useState(0);


    const handleGroupChange = (e) => {
        const groupId = e.target.value;
        setSelectedGroupId(groupId);
        // Filter employees for the selected group
        const selectedGroup = groups.find(group => group.id === parseInt(groupId));

        if (selectedGroup) {
            setSelectedGroupEmployees(selectedGroup.employees);
            setSelectedGroupEmployeesLength(selectedGroup.employees.length);
        } else {
            setSelectedGroupEmployees([]);
            setSelectedGroupEmployeesLength(0);
        }
    };



    //employee array config

    //set up for the table variables
    const columns = [
        { id: 'Name', label: 'Name', minWidth: 150 },
        { id: 'Phone', label: 'Phone', minWidth: 150 },
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


    // Define the rows based on the Groups data
    const rows = selectedGroupEmployees.map((employee ) => ({
            id: employee.id,
            Name: `${employee.firstname} ${employee.lastname}` || "-",
            Phone: employee.phone || "-",
            createdAt: new Date(employee.createdat).toLocaleDateString("en-GB") || "-",
            updatedAt: new Date(employee.updatedat).toLocaleDateString("en-GB") || "-",
            actions: (

                <div className="d-flex justify-content-around">
                    <button className="btn btn-info" onClick={() => navigate(`/Dashboard/employeeDetails/${employee.id}`)}>Details</button>
                </div>
            ),
        }));



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
                                <h1>You need to have an active group to manage employees</h1>
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
                             {selectedGroupEmployees.length > 0 ? (
                                 <div>
                                     <h2>Employees in Selected Group</h2>


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
                                             count={selectedGroupEmployeesLength}
                                             rowsPerPage={rowsPerPage}
                                             page={page}
                                             onPageChange={handleChangePage}
                                             onRowsPerPageChange={handleChangeRowsPerPage}
                                         />

                                     </Paper>


                                 </div>
                             ) : (
                                 <h3>This group has no employees.</h3>
                             )}

                         </div>
                     </div>
                 </div>
             </div>
         )
    }


}

export default ListEmployees;