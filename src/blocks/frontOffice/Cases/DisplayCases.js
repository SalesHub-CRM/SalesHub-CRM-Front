import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {DeleteCase, ListCasesByGroup} from "../../../redux/actions/CasesActions";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import {ListClientsByGroup} from "../../../redux/actions/ClientsActions";
import DeleteCaseSuccessModal from "../modals/case/DeleteCaseSuccessModal";

const DisplayCases = () => {

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const dataUser =JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();
    const Cases = useSelector(state => state.Case.ListCasesByGroup)
    const GroupClients = useSelector(state => state.Client.ListClientsByGroup)
    const [showDeleteModal, setShowDeleteModal] = useState(false);


    useEffect(()=>{
        try {
            if(!dataUser?.roles.includes("ROLE_ADMIN"))
            {
                dispatch(ListCasesByGroup(dataUser.groupId));
                setIsLoading(false);
            }

        }
        catch (error){
            console.error("Something went wrong:", error);
            setIsLoading(false);
        }
    },[]);


    useEffect(()=>{
        try {
            if(!dataUser?.roles.includes("ROLE_ADMIN"))
            {
                dispatch(ListClientsByGroup(dataUser.groupId));
                setIsLoading(false);
            }

        }
        catch (error){
            console.error("Something went wrong:", error);
            setIsLoading(false);
        }
    },[]);

    console.log("cases",Cases)
    console.log("GroupClients",GroupClients)


    const formatPriority = (priority) => {
        return priority.charAt(0).toUpperCase() + priority.slice(1).toLowerCase();
    };

    const formatType = (type) => {
        if (type === "FEATUREREQUEST") {
            return "Feature request";
        }
        return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
    };


    const columns = [
        { id: 'name', label: 'Client Name', minWidth: 150 },
        { id: 'type', label: 'Type', minWidth: 100 },
        { id: 'priority', label: 'Priority', minWidth: 100 },
        { id: 'createdat', label: 'Added At', minWidth: 100 },
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

    const handleDeleteCase=(caseId)=>{
        dispatch(DeleteCase(caseId,dataUser.groupId))
            .then(()=>{
                setShowDeleteModal(true);
            })
            .catch((error) => {
                console.error("Error deleting task:", error);
            });
    };

    const refreshPage = () => {
        window.location.reload();
        console.log("refresh")
    };


    let rows = [];


    if (!dataUser?.roles.includes("ROLE_ADMIN")) {
        rows = Cases.map((cas) => {
            // Find the client associated with the case
            const client = GroupClients.find((client) => client.cases.some((c) => c.id === cas.id));

            return {
                id: cas.id,
                name: client?.name || "-",
                type: formatType(cas.type) || "-",
                priority: formatPriority(cas.priority) || "-",
                createdat: new Date(cas.createdat).toLocaleDateString("en-GB") || "-",
                actions: (
                    <div className="d-flex justify-content-around">
                        <button className="btn btn-info" onClick={() => navigate(`/home/case/caseDetails/${cas.id}`)}>Details</button>
                        <button className="btn btn-danger" onClick={() => {
                            handleDeleteCase(cas.id);
                            navigate(`/home/case`);
                        }}>Delete</button>
                    </div>


                ),
            };
        });
    }


    if (isLoading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }


    else if ((!dataUser?.roles.includes("ROLE_ADMIN") && (!Cases || !Cases.length))) {
        return (
            <div>
                <h1>There are currently no cases available</h1>
            </div>
        );
    }


    else {
        return (

            <div className="DisplayClientPage">

                <DeleteCaseSuccessModal show={showDeleteModal} onClose={() => {
                    setShowDeleteModal(false);
                    refreshPage();
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
                        count={Cases.length}
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
export default DisplayCases;