import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import React, {useEffect, useState} from "react";
import {DeleteProduct, ListProductsByOwnerId} from "../../../redux/actions/ProductsActions";
import {DeleteLead} from "../../../redux/actions/LeadsActions";
import DeleteLeadAdminSuccess from "../modals/leadAdmin/DeleteLeadAdminSuccess";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import DeleteProductAdminSuccessModal from "../modals/product/DeleteProductAdminSuccessModal";


const ListProductsAdmin = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const user =JSON.parse(localStorage.getItem('user'));
    const Products = useSelector(state => state.Product.ListProductsByAdmin)

    useEffect(()=>{
        if(user){
            dispatch(ListProductsByOwnerId(user.id))
        }
    },[])


    console.log(Products)

    const columns = [
        { id: 'name', label: 'Name', minWidth: 150 },
        { id: 'price', label: 'Price', minWidth: 100 },
        { id: 'prodstart', label: 'Production Start', minWidth: 100 },
        { id: 'prodend', label: 'Production End', minWidth: 150 },
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

    const handleDeleteProduct = (productId) => {

        dispatch(DeleteProduct(productId,user.id))
            .then(() => {
                setShowDeleteModal(true);
            })
            .catch((error) => {
                console.error("Error deleting product:", error);
            });
    };

    const refreshPage = () => {
        window.location.reload();
        console.log("refresh")
    };

    const rows = Array.isArray(Products)
        ? Products.map((product ) => ({
        id: product.id,
        name: product.name || "-",
        price: `${product.price  + " DT"}`|| "-",
        prodstart: new Date(product.productionstart).toLocaleDateString("en-GB") || "-",
        prodend: new Date(product.productionend).toLocaleDateString("en-GB") || "-",
        actions: (
            <div className="d-flex justify-content-around">
                <button className="btn btn-info" onClick={() => navigate(`/Dashboard/productDetailsAdmin/${product.id}`)}>Details</button>
                <button className="btn btn-danger" onClick={() => {
                    handleDeleteProduct(product.id);
                    navigate(`/Dashboard/listProductsAdmin`);
                }}>Delete</button>
            </div>
        ),
    })):[];

    if (!Array.isArray(Products)) {
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


    else if (Products.length === 0) {
        return (
            <div className="DashboardHome">
                <div className="container mt-5">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-xl-10">
                            <div>
                                <h1>You currently don't own any products</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


    else{
        return (
            <div className="DashboardHome">
                <div className="container mt-5">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-xl-10">

                            <div className="homepage-titles creatAccountTitle">
                                <h4 className="mt-5 mb-5 pb-1 text-center" style={{color:"red"}}>WARNING : Deleting a product will result in the deletion
                                    of all associated data (opportunities and campaigns). please proceed with caution.</h4>
                            </div>


                            <DeleteProductAdminSuccessModal show={showDeleteModal} onClose={() => {
                                setShowDeleteModal(false);
                                refreshPage();
                            }}/>

                                <div>
                                    <h2>My current products :</h2>


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
                                            count={Products.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                        />

                                    </Paper>

                                </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default ListProductsAdmin;