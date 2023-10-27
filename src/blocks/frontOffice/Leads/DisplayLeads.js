import React, {useEffect, useState} from "react";
import {useDispatch,useSelector} from "react-redux";
import {DeleteLead, ListLeads, ListLeadsByAdmin, ListLeadsByEmployee} from "../../../redux/actions/LeadsActions";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import DeleteLeadSuccessModal from "../modals/lead/DeleteLeadSuccessModal";
import {useLocation, useNavigate} from "react-router";
import Leadspage from "../../../components/FontOffice/Leadspage";


const DisplayLeads = () => {

    //dispatcher and effect setup

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true); //this is to create a control variable to prevent the useEffect code from going into an infinite loop
    const LeadsEmployee = useSelector(state => state.Lead.listLeadsByEmployee);
    const LeadsAdmin = useSelector(state => state.Lead.listLeadsByAdmin);
    const user =JSON.parse(localStorage.getItem('user'));

    const navigate = useNavigate();
   // const location = useLocation();

    useEffect(()=>
    {
        try {
            if(user?.roles.includes("ROLE_ADMIN"))
            {
                 dispatch(ListLeadsByAdmin(user.id));
                setIsLoading(false);
            }
        }

        catch (error){
            console.error("Something went wrong:", error);
            setIsLoading(false);
        }
    },[])

    useEffect(()=>
    {
        try {
            if(!user?.roles.includes("ROLE_ADMIN"))
            {
                dispatch(ListLeadsByEmployee(user.id));
                setIsLoading(false);
            }
        }

        catch (error){
            console.error("Something went wrong:", error);
            setIsLoading(false);
        }
    },[])


    console.log("employee",LeadsEmployee)
    console.log("admin", LeadsAdmin)

    //const for modal invocation
    const [showDeleteModal, setShowDeleteModal] = useState(false);


    //set up for the table variables
    const columns = [
        { id: 'fullName', label: 'Name', minWidth: 150 },
        { id: 'title', label: 'Title', minWidth: 100 },
        { id: 'phone', label: 'Phone', minWidth: 100 },
        { id: 'company', label: 'Company', minWidth: 150 },
        { id: 'city', label: 'City', minWidth: 150},
        { id: 'createdBy', label: 'Created By', minWidth: 150 },
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
       // navigate(location.pathname, { state: { refresh: true } });
        window.location.reload();
        console.log("refresh")
    };


    // Define the rows based on the Leads data
    let rows = [];

    if (user?.roles.includes("ROLE_ADMIN")) {
        rows = LeadsAdmin.map((lead) => ({
            id: lead.id,
            fullName: `${lead.firstname || "-"} ${lead.lastname || "-"}`,
            title: lead.title || "-",
            phone: lead.phone || "-",
            company: lead.company || "-",
            city: lead.city || "-",
            createdBy: `${lead.user.firstname || "-"} ${lead.user.lastname || "-"}`,
            actions: (
                <div className="d-flex justify-content-around">
                    <button className="btn btn-info" onClick={() => navigate(`/home/lead/leadDetails/${lead.id}`)}>Details</button>
                    <button className="btn btn-danger" onClick={() => {
                        handleDeleteLead(lead.id);
                        navigate(`/home/lead`);
                    }}>Delete</button>
                </div>
            ),
        }));
    } else {
        rows = LeadsEmployee?.map((lead) => ({
            id: lead.id,
            fullName: `${lead.firstname || "-"} ${lead.lastname || "-"}`,
            title: lead.title || "-",
            phone: lead.phone || "-",
            company: lead.company || "-",
            city: lead.city || "-",
            createdBy: `${lead.user.firstname || "-"} ${lead.user.lastname || "-"}`,
            actions: (
                <div className="d-flex justify-content-around">
                    <button className="btn btn-info" onClick={() => navigate(`/home/lead/leadDetails/${lead.id}`)}>Details</button>
                    <button className="btn btn-danger" onClick={() => {
                        handleDeleteLead(lead.id);
                        navigate(`/home/lead`);
                    }}>Delete</button>
                </div>
            ),
        }));
    }



    //display conditions (depending on whether Leads is empty or not)

    if (isLoading) {
        // Handle the case where Leads is not an array yet
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }

    else if ((user?.roles.includes("ROLE_ADMIN") && !LeadsAdmin.length) || (!user?.roles.includes("ROLE_ADMIN") && !LeadsEmployee.length)) {
        // Handle the case where Leads is an empty array
        return (
            <div>
                <h1>There are currently no leads available</h1>
            </div>
        );
    }


  else {
        return (

      <div className="AddLeadPage">
          {/* Display the DeleteLeadSuccessModal component */}
          <DeleteLeadSuccessModal show={showDeleteModal} onClose={() => {
              setShowDeleteModal(false);
              refreshPage(); // Refresh the page when the modal is closed
          }}
          />
          <h3 className="text-center mb-5">My current leads :</h3>

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
                    count={user?.roles.includes("ROLE_ADMIN") ? LeadsAdmin.length : LeadsEmployee.length}
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
export default DisplayLeads;