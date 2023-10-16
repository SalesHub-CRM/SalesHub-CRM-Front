import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import React, {useEffect, useState} from "react";
import {ListGroupsByAdmin} from "../../../redux/actions/GroupsActions";
import {DeleteLead} from "../../../redux/actions/LeadsActions";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import DeleteLeadAdminSuccess from "../modals/leadAdmin/DeleteLeadAdminSuccess";


const ListLeadsAdmin = () => {

    const {register, handleSubmit, formState:{errors}}= useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const groups = useSelector(state=>state.Group.ListGroups);
    const user =JSON.parse(localStorage.getItem('user'));

    useEffect(()=>{
        if(user)
        {
            dispatch(ListGroupsByAdmin(user.id))
        }

    },[]);

    console.log("user",user);
    console.log("groups",groups);

    const [selectedGroupId, setSelectedGroupId] = useState(null);
    const [selectedGroupLeads, setSelectedGroupLeads] = useState([]);

    const [selectedGroupLeadsLength, setSelectedGroupLeadsLength] = useState(0);

    const handleGroupChange = (e) => {
        const groupId = e.target.value;
        setSelectedGroupId(groupId);
        const selectedGroup = groups.find(group => group.id === parseInt(groupId));
        if (selectedGroup) {
            setSelectedGroupLeads(selectedGroup.leads);
            setSelectedGroupLeadsLength(selectedGroup.leads.length);
        } else {
            setSelectedGroupLeads([]);
            setSelectedGroupLeadsLength(0);
        }


        if (selectedGroup) {
            setSelectedGroupLeads(selectedGroup.leads);
        } else {
            setSelectedGroupLeadsLength([]);
        }
    };


    const [showDeleteModal, setShowDeleteModal] = useState(false);

    //set up for the table variables
    const columns = [
        { id: 'fullName', label: 'Name', minWidth: 150 },
        { id: 'title', label: 'Title', minWidth: 100 },
        { id: 'phone', label: 'Phone', minWidth: 100 },
        { id: 'company', label: 'Company', minWidth: 150 },
        { id: 'city', label: 'City', minWidth: 150},
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

    const handleDeleteLead = (leadId) => {

        dispatch(DeleteLead(leadId,user))
            .then(() => {
                setShowDeleteModal(true);
            })
            .catch((error) => {
                console.error("Error deleting lead:", error);
            });
    };

    // page refresh handler
    const refreshPage = () => {
        window.location.reload();
        console.log("refresh")
    };

    const rows = selectedGroupLeads.map((lead ) => ({
        id: lead.id,
        fullName: `${lead.firstname || "-"} ${lead.lastname || "-"}`,
        title: lead.title || "-",
        phone: lead.phone || "-",
        company: lead.company || "-",
        city: lead.city || "-",
        actions: (
            <div className="d-flex justify-content-around">
                <button className="btn btn-info" onClick={() => navigate(`/Dashboard/leadDetailsAdmin/${lead.id}`)}>Details</button>
                <button className="btn btn-danger" onClick={() => {
                    handleDeleteLead(lead.id);
                    navigate(`/Dashboard/listLeads`);
                }}>Delete</button>
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
                                <h1>You need to have an active group to manage leads</h1>
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

                            <DeleteLeadAdminSuccess show={showDeleteModal} onClose={() => {
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
                            {selectedGroupLeads.length > 0 ? (
                                <div>
                                    <h2>Leads in Selected Group</h2>


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
                                            count={selectedGroupLeadsLength}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                        />

                                    </Paper>


                                </div>
                            ) : (
                                <h3>This group has no leads.</h3>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default ListLeadsAdmin;