import styled from '@emotion/styled'
import { Box, CircularProgress, Icon, Table, TableBody, TableCell, TableHead, TablePagination, TableRow } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteProductById } from 'store/actions/productActions'

function ProductListForm() {

    const { products, loading } = useSelector(state => state)
    const dispatch = useDispatch()

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(1);

    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    };


    const handleDelete = (_id) => {
        dispatch(deleteProductById(_id))
    }
    // console.log("products are -> ", products);

    const StyledTable = styled(Table)(() => ({
        whiteSpace: "pre",
        "& thead": {
            "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
        },
        "& tbody": {
            "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
        },
    }));

    if (loading) {
        return (
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        )
    }

    return (
        <Box width="100%" overflow="auto">
            <StyledTable>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">sr. no</TableCell>
                        <TableCell align="center">Product Name</TableCell>
                        <TableCell align="center">Product Category</TableCell>
                        <TableCell align="center">Product Brand</TableCell>
                        <TableCell align="center">Product Image</TableCell>
                        <TableCell align="center">Status</TableCell>
                        <TableCell align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        products?.payload?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((singleProduct, index) => (
                                <TableRow key={index}>
                                    <TableCell align="center" key={index}>{index + 1}</TableCell>
                                    <TableCell align="center">{singleProduct.productName}</TableCell>
                                    <TableCell align="center">{singleProduct.categoryName}</TableCell>
                                    <TableCell align="center">{singleProduct.brandName}</TableCell>
                                    <TableCell align="center">
                                        <img src={`http://localhost:3003/uploads/product/${singleProduct.image}`} style={{ borderRadius: '10px' }} height={'60px'} width={'60px'} alt="image comes here" />
                                    </TableCell>
                                    <TableCell align="center">{singleProduct.status}</TableCell>
                                    <TableCell align="center">
                                        {/* <Link onClick={() => handleEdit()}><Icon className="mx-2 text-secondary">edit</Icon></Link> */}
                                        <Link onClick={() => handleDelete(singleProduct._id)}><Icon className="mx-2 text-danger">delete</Icon></Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                </TableBody>
            </StyledTable>

            <TablePagination
                sx={{ px: 2 }}
                page={page}
                component="div"
                rowsPerPage={rowsPerPage}
                count={products?.payload?.length}
                onPageChange={handleChangePage}
                rowsPerPageOptions={[1, 5, 10]}
                onRowsPerPageChange={handleChangeRowsPerPage}
                nextIconButtonProps={{ "aria-label": "Next Page" }}
                backIconButtonProps={{ "aria-label": "Previous Page" }}
            />
        </Box>
    )
}

export default ProductListForm