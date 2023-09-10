import React,{useEffect} from "react";
import {useDispatch,useSelector} from "react-redux";
import {ListLeads} from "../../../redux/actions/LeadsActions";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const DisplayLeads = () => {

    const dispatch = useDispatch();
    const Leads = useSelector(state => state.Lead.ListLeads);
    //const loading = useSelector((state) => state.Lead.loading);
    useEffect(()=>{
        dispatch(ListLeads())
    },[])

    //set up for the table variables


    const columns = [
        { id: 'fullName', label: 'Name', minWidth: 150 },
        { id: 'title', label: 'Title', minWidth: 100 },
        { id: 'phone', label: 'Phone', minWidth: 100 },
        { id: 'company', label: 'Company', minWidth: 150 },
        { id: 'city', label: 'City', minWidth: 150},
        { id: 'createdBy', label: 'Created By', minWidth: 150 },
        { id: 'actions', label: 'Actions', minWidth: 170, align: 'center' },
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


    // Define the rows based on the Leads data
    const rows = Array.isArray(Leads)
        ? Leads.map((lead) => ({
            id: lead.id,
            fullName: `${lead.firstname || "-"} ${lead.lastname || "-"}`,
            title: lead.title || "-",
            phone: lead.phone || "-",
            company: lead.company || "-",
            city: lead.city || "-",
            createdBy: `${lead.user.firstname || "-"} ${lead.user.lastname || "-"}`,
            actions: (
                <div>
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            ),
        }))
        : [];


    //display conditions (depending on whether Leads is empty or not)

    if (!Array.isArray(Leads)) {
        // Handle the case where Leads is not an array yet
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }

    else if (Leads.length === 0) {
        // Handle the case where Leads is an empty array
        return (
            <div>
                <h1>There are currently no leads available</h1>
            </div>
        );
    }


  else {
        return (

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
                    count={Leads.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        );
     }
}
export default DisplayLeads;