import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router";
import React, {useEffect} from "react";
import {ListCampaignsByGroupFunction} from "../../../redux/actions/CampaignsActions";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import {Link} from "react-router-dom";

const ListOurCampaigns = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user =JSON.parse(localStorage.getItem('user'));
    const Campaigns = useSelector(state => state.Campaign.ListCampaignsByGroup);


    useEffect(()=>{
        if (user)
        {
            dispatch(ListCampaignsByGroupFunction(user.groupId))
        }
    },[])



    console.log("Campaigns",Campaigns);

    const columns = [
        { id: 'name', label: 'Name', minWidth: 130 },
        { id: 'product', label: 'Product', minWidth: 130 },
        { id: 'type', label: 'Type', minWidth: 100 },
        { id: 'status', label: 'Status', minWidth: 100 },
        { id: 'startdate', label: 'Start date', minWidth: 130 },
        { id: 'enddate', label: 'End date', minWidth: 130 },
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
            product: (<Link to={`/home/product/productDetails/${campaign.productObject.id}`}>{campaign.productObject.name}</Link>),
            type: formattedType(campaign.type)|| "-",
            status: formattedStatus(campaign.status) || "-",
            startdate: new Date(campaign.startdate).toLocaleDateString("en-GB") || "-",
            enddate: new Date(campaign.enddate).toLocaleDateString("en-GB") || "-",
            actions: (
                <div className="d-flex justify-content-around">
                    <button className="btn btn-info" onClick={() => navigate(`/home/campaign/CampaignDetails/${campaign.id}`)}>Details</button>
                </div>
            ),
        })):[];

    if (!Array.isArray(Campaigns)) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }

    else if (Campaigns.length === 0) {
        return (
            <div>
                <h1 className="text-center">Our group currently has no registered campaigns</h1>
            </div>
        );
    }

    else
    {
        return (
            <div className="DisplayProductPage">
                <h2 className="mt-5 mb-5 text-center">Current campaigns :</h2>

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
                        count={Campaigns.length}
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
export default ListOurCampaigns;