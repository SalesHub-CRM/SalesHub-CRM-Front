import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router";
import React, {useEffect, useState} from "react";
import {ListOpportunitiesByClientFunction} from "../../../redux/actions/OpportunitiesActions";
import DeleteContactAdminSuccessModal from "../modals/contactAdmin/DeleteContactAdminSuccessModal";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";


const ListOpportunitiesByClientAdmin = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const {clientId} = useParams();
    const user =JSON.parse(localStorage.getItem('user'));
    const Opportunities = useSelector(state => state.Opportunity.ListOpportunitiesByClient);

    useEffect(()=>{
        if(user)
        {
            dispatch(ListOpportunitiesByClientFunction(clientId));
            setIsLoading(false);
        }
    },[]);

    console.log("Opportunities",Opportunities)

    const refreshPage = () => {
        window.location.reload();
    };


    const columns = [
        { id: 'name', label: 'Name', minWidth: 150 },
        { id: 'amount', label: 'Amount', minWidth: 100 },
        { id: 'stage', label: 'Stage', minWidth: 100 },
        { id: 'probability', label: 'Probability', minWidth: 150 },
        { id: 'closedate', label: 'Close date', minWidth: 150 },
        { id: 'actions', label: 'Actions', minWidth: 170, headerStyle: { textAlign: 'center' } },
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

    const formattedStage=(stage)=>{
        if(stage ==="CLOSEDWON")
        {
            return "Closed won";
        }
        else if(stage ==="CLOSEDLOST")
        {
            return "Closed lost";
        }
        else
        {
            return stage.charAt(0).toUpperCase() + stage.slice(1).toLowerCase();
        }
    }


    const rows = Array.isArray(Opportunities)
        ? Opportunities.map((opp ) => ({

            id: opp.id,
            name: opp.name || "-",
            amount: `${opp.amount  + " DT"}`|| "-",
            stage: formattedStage(opp.stage)|| "-",
            probability: `${opp.probability  + " %"}` || "-",
            closedate: new Date(opp.closedate).toLocaleDateString("en-GB") || "-",
            actions: (
                <div className="d-flex justify-content-around">
                    <button className="btn btn-info" onClick={() => navigate(`/Dashboard/opportunityDetailsAdmin/${opp.id}`)}>Details</button>
                </div>
            ),
        })):[];


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

    else if (!Opportunities.length) {
        return (

            <div className="DashboardHome">
                <div className="container mt-5">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-xl-10">
                            <div>
                                <h1 className="mt-5 text-center" style={{marginBottom:"200px"}}>There are currently no opportunities associated with this client.</h1>
                                <div className="d-flex justify-content-around mt-5 mb-5">
                                    <button className="btn btn-danger" onClick={() => navigate(`/Dashboard/ClientDetails/${clientId}`)}>Back to client details</button>
                                </div>

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
                                <h1>Opportunities associated with the current client</h1>
                            </div>

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
                                            count={Opportunities.length}
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

export default ListOpportunitiesByClientAdmin;