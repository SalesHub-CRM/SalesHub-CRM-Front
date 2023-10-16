import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {ListClientsByEmployee} from "../../../redux/actions/ClientsActions";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import {useNavigate} from "react-router";
import {Link} from "react-router-dom";

const DisplayClients = () => {


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const dataUser = JSON.parse(localStorage.getItem('user'));
    const Clients = useSelector(state => state.Client.ListClientsByEmployee)

    useEffect(()=>{
        try {
            if(!dataUser?.roles.includes("ROLE_ADMIN"))
            {
                dispatch(ListClientsByEmployee(dataUser.id));
                setIsLoading(false);
            }
        }
        catch (error){
            console.error("Something went wrong:", error);
            setIsLoading(false);
        }
    },[])

    console.log(Clients)


    const columns = [
        { id: 'name', label: 'Name', minWidth: 150 },
        { id: 'type', label: 'Type', minWidth: 100 },
        { id: 'industry', label: 'Industry', minWidth: 100 },
        { id: 'phone', label: 'Phone', minWidth: 100 },
        { id: 'email', label: 'Email', minWidth: 150 },
        { id: 'fax', label: 'Fax', minWidth: 150},
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

    let rows = [];

    if (!dataUser?.roles.includes("ROLE_ADMIN")) {
        rows = Clients.map((client) => ({
            id: client.id,
            name: client.name || "-",
            type: client.type || "-",
            industry: client.industry || "-",
            phone: client.phone || "-",
            email: client.email || "-",
            fax: client.fax || "-",
            createdBy: `${client.user.firstname || "-"} ${client.user.lastname || "-"}`,
            actions: (
                <div className="d-flex justify-content-around">
                    <button className="btn btn-info" onClick={() => navigate(`/home/client/clientDetails/${client.id}`)}>Details</button>

                </div>
            ),
        }));
    }


    //return in the case the user is an owner

    if(dataUser?.roles.includes("ROLE_ADMIN"))
    {
        return (
            <div className="container mt-5 mb-5 text-center">
                <h1 className="mt-5 mb-5">This View is reserved for employees.</h1>
                <h2 className="mt-5 mb-5">Please refer to your dashboard for a more in depth display</h2>
                <h3 className="mt-5 mb-5">Or you can click <Link to="/Dashboard/listClients">here</Link></h3>
            </div>
        );
    }


    //return in the case the user is an employee

    else
    {

        if (isLoading) {
            return (
                <div>
                    <h1>Loading...</h1>
                </div>
            );
        }

        else if ((!dataUser?.roles.includes("ROLE_ADMIN") && !Clients.length)) {
            return (
                <div>
                    <h1>There are currently no leads available</h1>
                </div>
            );
        }


        else {
            return (

                <div className="DisplayClientPage">

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
                            count={Clients.length}
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


}
export default DisplayClients;