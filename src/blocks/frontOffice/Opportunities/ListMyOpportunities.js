import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import React, {useEffect, useState} from "react";
import {DeleteEmployeeOpportunity,ListOpportunitiesByEmployeeFunction} from "../../../redux/actions/OpportunitiesActions";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import DeleteFromEmployeeSuccessModal from "../modals/opportunity/DeleteFromEmployeeSuccessModal";

const ListMyOpportunities = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user =JSON.parse(localStorage.getItem('user'));
    const Opportunities = useSelector(state => state.Opportunity.ListOpportunitiesByEmployee);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(()=>{
        if(user){
            dispatch(ListOpportunitiesByEmployeeFunction(user.id));
        }
    },[])

    console.log("Opportunities",Opportunities)


    const handleDeleteOpp=(oppId)=>{
        dispatch(DeleteEmployeeOpportunity(oppId,user.id))
            .then(()=>{
                setShowDeleteModal(true);
            })
            .catch((error) => {
                console.error("Error deleting task:", error);
            });
    }

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
                    <button className="btn btn-info" onClick={() => navigate(`/home/opportunity/OppDetails/${opp.id}`)}>Details</button>
                    <button className="btn btn-danger" onClick={() => {
                        handleDeleteOpp(opp.id);
                        navigate(`/home/opportunity`);
                    }}>Delete</button>

                </div>
            ),
        })):[];


    if (!Array.isArray(Opportunities)) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }


    else if (Opportunities.length === 0) {
        return (
            <div>
                <h1 className="text-center">You have no opportunities associated with your account.</h1>
                <h3 style={{color:"#2dcc10"}} className="text-center">Reminder : New opportunities can be added from a client's details or a product's details</h3>

            </div>
        );
    }


    else {
        return (
            <div className="DisplayProductPage">

                <h3 style={{color:"#2dcc10"}} className="text-center">Reminder : New opportunities can be added from a client's details or a product's details</h3>

                <h2 className="mt-5 mb-5 text-center">Current opportunities associated with your account :</h2>

                <DeleteFromEmployeeSuccessModal show={showDeleteModal}
                                              onClose={()=>{
                                                  setShowDeleteModal(false);
                                                  refreshPage();
                                              }
                                              }/>

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
                        count={Opportunities.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />

                </Paper>

            </div>
        )
    }


}
export default ListMyOpportunities;