import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router";
import React, {useEffect, useState} from "react";
import {
    DeleteProductOpportunity,
    ListOpportunitiesByProductFunction
} from "../../../redux/actions/OpportunitiesActions";
import DeleteFromClientSuccessModal from "../modals/opportunity/DeleteFromClientSuccessModal";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import DeleteFromProductSuccessModal from "../modals/opportunity/DeleteFromProductSuccessModal";


const ListOpportunitiesByProduct = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {productId} = useParams();
    const user =JSON.parse(localStorage.getItem('user'));
    const Opportunities = useSelector(state => state.Opportunity.ListOpportunitiesByProduct);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(()=>{
        if(user)
        {
            dispatch(ListOpportunitiesByProductFunction(productId));
        }
    },[]);

    console.log("Opportunities",Opportunities)

    const handleDeleteOpp=(oppId)=>{
        dispatch(DeleteProductOpportunity(oppId,productId))
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
                    {user.id === opp.employee.id &&(
                        <button className="btn btn-danger" onClick={() => {
                            handleDeleteOpp(opp.id);
                            navigate(`/home/opportunity/OppByProduct/${productId}`);
                        }}>Delete</button>
                    )}

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
                <h1 className="text-center">There are currently no opportunities associated with this product</h1>

                <div className="d-flex justify-content-around mt-5 mb-5">
                    <button className="btn btn-danger" onClick={() => navigate(`/home/product/productDetails/${productId}`)}>Back to product details</button>
                </div>
            </div>
        );
    }


    else {
        return (
            <div className="DisplayProductPage">
                <h2 className="mt-5 mb-5 text-center">Current opportunities associated with this client :</h2>

                <DeleteFromProductSuccessModal show={showDeleteModal} productId={productId}
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

                <div className="d-flex justify-content-around mt-5 mb-5">
                    <button className="btn btn-danger" onClick={() => navigate(`/home/product/productDetails/${productId}`)}>Back to product details</button>
                </div>

            </div>
        )
    }


}

export default ListOpportunitiesByProduct;