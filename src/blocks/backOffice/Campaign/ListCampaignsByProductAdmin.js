import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router";
import React, {useEffect, useState} from "react";
import {DeleteCampaignFromProductPage, ListCampaignsByProductFunction} from "../../../redux/actions/CampaignsActions";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import DeleteCampaignAdminSuccessModal from "../modals/campaignsAdmin/DeleteCampaignAdminSuccessModal";


const ListCampaignsByProductAdmin = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {productId} = useParams();
    const Campaigns = useSelector(state => state.Campaign.ListCampaignsByProduct);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(()=>{
        dispatch(ListCampaignsByProductFunction(productId));
        setIsLoading(false);
    },[]);


    const handleDeleteContact = (campaignId) => {

        dispatch(DeleteCampaignFromProductPage(campaignId,productId))
            .then(() => {
                setShowDeleteModal(true);
            })
            .catch((error) => {
                console.error("Error deleting lead:", error);
            });
    };

    const refreshPage = () => {
        window.location.reload();
    };



    console.log("Campaigns",Campaigns);

    const columns = [
        { id: 'name', label: 'Name', minWidth: 150 },
        { id: 'type', label: 'Type', minWidth: 100 },
        { id: 'status', label: 'Status', minWidth: 100 },
        { id: 'startdate', label: 'Start date', minWidth: 150 },
        { id: 'enddate', label: 'End date', minWidth: 150 },
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

    const formattedStatus=(status)=>{
        if (status === "INPROGRESS"){
            return "In progress";
        }
        else{
            return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
        }
    }


    const formattedType=(type)=>{
        if(type==="BANNERADS"){
            return "Banner ads";
        }
        else if (type === "PUBLICRELATIONS")
        {
            return "Public relations";
        }
        else{
            return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
        }
    }


    const rows = Array.isArray(Campaigns)
        ? Campaigns.map((campaign ) => ({

            id: campaign.id,
            name: campaign.name || "-",
            type: formattedType(campaign.type)|| "-",
            status: formattedStatus(campaign.status) || "-",
            startdate: new Date(campaign.startdate).toLocaleDateString("en-GB") || "-",
            enddate: new Date(campaign.enddate).toLocaleDateString("en-GB") || "-",
            actions: (
                <div className="d-flex justify-content-around">
                    <button className="btn btn-info" onClick={() => navigate(`/Dashboard/CampaignDetailsAdmin/${campaign.id}`)}>Details</button>
                    <button className="btn btn-danger" onClick={() => {
                        handleDeleteContact(campaign.id);
                        navigate(`/Dashboard/listCampaignsByProductAdmin/${productId}`);
                    }}>Delete</button>
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



    else if (!Campaigns.length) {
        return (

            <div className="DashboardHome">
                <div className="container mt-5">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-xl-10">
                            <div>
                                <h1 className="mt-5 text-center" style={{marginBottom:"200px"}}>There are currently no campaigns associated with this product.</h1>
                                <div className="d-flex justify-content-around mt-5 mb-5">
                                    <button className="btn btn-danger" onClick={() => navigate(`/Dashboard/productDetailsAdmin/${productId}`)}>Back to product details</button>
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
                                <h1>Campaigns associated with the current product</h1>
                            </div>

                            <DeleteCampaignAdminSuccessModal productId={productId} show={showDeleteModal} onClose={() => {
                                setShowDeleteModal(false);
                                refreshPage();
                            }}/>

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
                                            count={Campaigns.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                        />

                                    </Paper>

                                </div>
                            </div>

                            <div className="d-flex justify-content-around mt-5 mb-5">
                                <button className="btn btn-danger" onClick={() => navigate(`/Dashboard/productDetailsAdmin/${productId}`)}>Back to product details</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>


        );
    }



}

export default ListCampaignsByProductAdmin;