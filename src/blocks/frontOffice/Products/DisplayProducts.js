import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import React, {useEffect, useState} from "react";
import {ListProductsByGroupOwner} from "../../../redux/actions/ProductsActions";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";

const DisplayProducts = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user =JSON.parse(localStorage.getItem('user'));
    const Products = useSelector(state => state.Product.ListProductsByGroupAdmin)

    useEffect(()=>{
        if (user)
        {
            dispatch(ListProductsByGroupOwner(user.groupId))
        }
    },[])

    console.log("products list",Products)

    const columns = [
        { id: 'name', label: 'Name', minWidth: 150 },
        { id: 'price', label: 'Price', minWidth: 100 },
        { id: 'prodstart', label: 'Production Start', minWidth: 100 },
        { id: 'prodend', label: 'Production End', minWidth: 150 },
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

    const rows = Array.isArray(Products)
        ? Products.map((product ) => ({
            id: product.id,
            name: product.name || "-",
            price: `${product.price  + " DT"}`|| "-",
            prodstart: new Date(product.productionstart).toLocaleDateString("en-GB") || "-",
            prodend: new Date(product.productionend).toLocaleDateString("en-GB") || "-",
            actions: (
                <div className="d-flex justify-content-around">
                    <button className="btn btn-info" onClick={() => navigate(`/home/product/productDetails/${product.id}`)}>Details</button>
                </div>
            ),
        })):[];

    if (!Array.isArray(Products)) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }


    else if (Products.length === 0) {
        return (
            <div>
                <h1>There are currently no registered products</h1>
            </div>
        );
    }

    else {
        return (
            <div className="DisplayProductPage">
                <h2>Current registered products :</h2>


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
        )
    }

}
export default DisplayProducts;