import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router";
import React, {useEffect, useState} from "react";
import {DeleteContact, ListContactsByClient} from "../../../redux/actions/ContactsActions";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import DeleteContactAdminSuccessModal from "../modals/contactAdmin/DeleteContactAdminSuccessModal";


const DisplayContactsAdmin = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const {clientId} = useParams();
    const Contacts = useSelector(state => state.Contact.ListContactsByClient);


    useEffect(()=>{
        dispatch(ListContactsByClient(clientId));
        setIsLoading(false);
    },[]);

    console.log("contacts",Contacts);
    console.log("id",clientId);


    const columns = [
        { id: 'fullName', label: 'Name', minWidth: 150 },
        { id: 'phone', label: 'Phone', minWidth: 100 },
        { id: 'email', label: 'Email', minWidth: 150 },
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


    const handleDeleteContact = (contactId) => {

        dispatch(DeleteContact(contactId,clientId))
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


    const rows = Contacts?.map((contact ) => ({
        id: contact.id,
        fullName: `${contact.firstname || "-"} ${contact.lastname || "-"}`,
        phone: contact.phone || "-",
        email: contact.email || "-",
        city: contact.city || "-",
        actions: (
            <div className="d-flex justify-content-around">
                <button className="btn btn-info" onClick={() =>
                    navigate(`/Dashboard/ContactDetailsAdmin/${clientId}/${contact.id}`)}>Details
                </button>

                <button className="btn btn-danger" onClick={() => {
                    handleDeleteContact(contact.id);
                    navigate(`/Dashboard/listContacts/${clientId}`);
                }}>Delete</button>
            </div>
        ),
    }));


    if (isLoading) {
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

    else if (!Contacts.length) {
        return (

            <div className="DashboardHome">
                <div className="container mt-5">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-xl-10">
                            <div>
                                <h1>There are currently no contacts available</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }


    else {
        return (

            <div className="DashboardHome">
                <div className="container mt-5">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-xl-10">

                            <div className="mb-5 mt-5 text-center">
                                <h1>Contacts associated with the current client</h1>
                            </div>

                            <DeleteContactAdminSuccessModal show={showDeleteModal} onClose={() => {
                                setShowDeleteModal(false);
                                refreshPage();
                            }} clientId={clientId}/>

                            <div className="card rounded-3 text-black mb-5">
                                <div className="row g-0">



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
                                                count={Contacts.length}
                                                rowsPerPage={rowsPerPage}
                                                page={page}
                                                onPageChange={handleChangePage}
                                                onRowsPerPageChange={handleChangeRowsPerPage}
                                            />

                                        </Paper>

                                </div>
                            </div>

                            <div className="d-flex justify-content-around mt-5 mb-5">
                                <button className="btn btn-danger" onClick={() => navigate(`/Dashboard/ClientDetails/${clientId}`)}>Back to client details</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>


        );
    }

}

export default DisplayContactsAdmin;