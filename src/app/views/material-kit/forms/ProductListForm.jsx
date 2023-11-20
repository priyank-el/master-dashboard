import styled from '@emotion/styled'
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Icon, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Grid, TextField, Select } from '@mui/material'
import { Span } from 'app/components/Typography'
import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteProductById, updateProductStatus } from 'store/actions/productActions'

import * as yup from 'yup'
import { useFormik } from "formik"
import { useCallback } from "react";

const schema = yup.object().shape({
    productName: yup.string().required(),
    productDescription: yup.string().required(),
    category_Id: yup.string().required(),
    brand_Id: yup.string().required()
})

function ProductListForm() {

    const { category, products, loading } = useSelector(state => state)
    const dispatch = useDispatch()

    const [page, setPage] = useState(0);
    const [brands, setBrands] = useState([])
    const [open, setOpen] = useState(false)
    const [rowsPerPage, setRowsPerPage] = useState(1);
    const [productData, setProductData] = useState({});
    const [openEvent, setOpenEvent] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState({})

    // INITIALIZING FORMIK HERE:
    const formik = useFormik({
        initialValues: {
            productName: '',
            productDescription: '',
            category_Id: '',
            brand_Id: ''
        },
        validationSchema: schema,
        onSubmit: async (values) => {
            console.log("called..", values);
        }
    })

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

    const handleOpenEvent = (productData) => {
        setOpenEvent(true)
        setSelectedProduct(productData)
    }
    const handleCloseEvent = () => setOpenEvent(false)

    const updateStatusHandler = () => {
        dispatch(updateProductStatus(selectedProduct._id, selectedProduct.status))
        setOpenEvent(false)
    }

    const handleEdit = (productObject) => {
        setProductData(productObject)
        setOpen(true)
    }

    const dialogCloseHandler = () => {
        setOpen(false)
    }

    const onImageChangeHandler = () => {

    }

    return (
        <>
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
                                        <TableCell onClick={() => handleOpenEvent(singleProduct)} align="center">
                                            {
                                                singleProduct.status === 'active'
                                                    ?
                                                    <small style={{ "color": "white", "backgroundColor": "green", "padding": "2px 9px", "borderRadius": "10px" }}>{singleProduct.status}</small>
                                                    :
                                                    <small style={{ "color": "white", "backgroundColor": "red", "padding": "2px 9px", "borderRadius": "10px" }}>{singleProduct.status}</small>
                                            }
                                        </TableCell>
                                        <TableCell align="center">
                                            <Link onClick={() => handleEdit(singleProduct)}><Icon className="mx-2 text-secondary">edit</Icon></Link>
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
            {/* STATUS CHANGE DIALOG BOX */}
            <Dialog open={openEvent} onClose={handleCloseEvent} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Update status</DialogTitle>
                <DialogContent>
                    <div>
                        {/* <div>
              <span style={{ width: '300px' }} className="mb-5 text-secondary">current status is :- {selectedCategory.status}</span>
            </div> */}
                        <span style={{ width: '300px' }} className="mb-5">Are you sure you want to change status</span>
                    </div>
                </DialogContent>

                <DialogActions>
                    <Button variant="outlined" onClick={handleCloseEvent}>
                        No
                    </Button>

                    <Button onClick={updateStatusHandler} color="primary" variant="contained" type="button" >
                        <Span sx={{ pl: 1, textTransform: "capitalize" }}>Yes</Span>
                    </Button>
                </DialogActions>
            </Dialog>

            { /* UPDATE PRODUCT DIALOG BOX */}
            <Dialog open={open} onClose={dialogCloseHandler} aria-labelledby="form-dialog-title" >
                <form onSubmit={formik.submitForm}>
                    <DialogTitle id="form-dialog-title">Add Product</DialogTitle>
                    <DialogContent style={{ overflow: "hidden" }}>

                        <Grid container spacing={6}>
                            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>

                                <TextField
                                    style={{ width: "100%" }}
                                    type="text"
                                    label="Product Name"
                                    name="productName"
                                    id="standard-basic"
                                    value={productData.productName}
                                // onChange={(e) => setInputValue("productName", e.target.value)}
                                />
                                {/* <span className="mb-3 text-danger">{formik.errors.productName}</span> */}

                                <FormControl fullWidth className='mb-1 mt-2'>
                                    <InputLabel id="demo-simple-select-label">Category</InputLabel>

                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name='category_Id'
                                        label="Category"
                                        value={productData.category_Id}
                                    // onChange={(e) => {
                                    //     setInputValue("category_Id", e.target.value)
                                    //     fetchBrandByName(e.target.value)
                                    // }}
                                    >
                                        {
                                            category?.payload?.map((singleCategory) => (
                                                <MenuItem key={singleCategory._id} value={singleCategory._id} >{singleCategory.categoryName}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                    {/* <span className="mb-2 text-danger">{formik.errors.category_Id}</span> */}
                                </FormControl>
                                <FormControl fullWidth className='mb-5'>
                                    <InputLabel id="demo-simple-select-label">Brand</InputLabel>

                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name='brand_Id'
                                        label="Brand"
                                        value={productData.brand_Id}
                                    // onChange={(e) => setInputValue("brand_Id", e.target.value)}
                                    >
                                        {/* {
                                            brands.map((singleBrand) => (
                                                <MenuItem key={singleBrand._id} value={singleBrand._id} >{singleBrand.brandName}</MenuItem>
                                            ))
                                        } */}
                                    </Select>
                                    {/* <span className="mb-2 text-danger">{formik.errors.brand_Id}</span> */}

                                </FormControl>

                            </Grid>

                            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                                <TextField
                                    style={{ width: "100%" }}
                                    type="text"
                                    label="Product Description"
                                    name="productDescription"
                                    id="standard-basic"
                                    value={productData.productDescription}
                                // onChange={(e) => setInputValue("productDescription", e.target.value)}
                                />
                                {/* <span className="mb-2 text-danger">{formik.errors.productDescription}</span> */}
                                <label className="mt-3" htmlFor="icon-button-file">
                                    <input onChange={onImageChangeHandler} className="input" id="icon-button-file" type="file" />
                                </label>
                            </Grid>

                        </Grid>

                    </DialogContent>

                    <DialogActions>
                        <Button variant="outlined" onClick={dialogCloseHandler}>
                            Cancel
                        </Button>

                        <Button color="primary" variant="contained" type="submit" >
                            add
                        </Button>
                    </DialogActions>
                </form>
            </Dialog >
        </>
    )
}

export default ProductListForm