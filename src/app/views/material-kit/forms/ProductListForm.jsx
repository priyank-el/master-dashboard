import styled from '@emotion/styled'
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Icon, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Grid, TextField, Select } from '@mui/material'
import { Span } from 'app/components/Typography'
import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteProductById, updateProduct, updateProductStatus, uploadProductImage } from 'store/actions/productActions'

import * as yup from 'yup'
import { useFormik } from "formik"
import { useCallback } from "react";
import { useEffect } from 'react'
import { fetchBrandsByCategoryName } from 'store/actions/brandActions'

const schema = yup.object().shape({
    productName: yup.string().required(),
    productDescription: yup.string().required(),
    price: yup.string().required(),
    category_Id: yup.string().required(),
    brand_Id: yup.string().required(),
    numberOfProducts: yup.string().required(),
    price: yup.string().required()
})

function ProductListForm() {

    const { category, products, loading } = useSelector(state => state)
    const dispatch = useDispatch()

    const [page, setPage] = useState(0);
    const [brands, setBrands] = useState([])
    const [initialValues, setInitialValues] = useState({})
    const [open, setOpen] = useState(false)
    const [rowsPerPage, setRowsPerPage] = useState(1);
    const [productData, setProductData] = useState({});
    const [openEvent, setOpenEvent] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState({})

    const [imageFile, setImageFile] = useState('')
    const formdata = new FormData()

    useEffect(() => {
        setInitialValues(productData)
        setFieldValue("productName", productData.productName);
        setFieldValue("productDescription", productData.productDescription);
        setFieldValue("category_Id", productData?.category?._id);
        setFieldValue("brand_Id", productData?.brand?._id);
        setFieldValue("price", productData.price);
        setFieldValue("numberOfProducts", productData.numberOfProducts);
    }, [productData])

    // IMAGE CHANGE HANDLER:-   
    const onImageChangeHandler = (e) => {
        setImageFile(e.target.files[0])
    }

    // INITIALIZING FORMIK HERE:
    const formik = useFormik({
        initialValues: {
            productName: initialValues.productName || "",
            productDescription: initialValues.productDescription || "",
            price: initialValues.price || "",
            category_Id: initialValues?.category?._id || "",
            brand_Id: initialValues?.brand?._id || "",
            numberOfProducts: initialValues.numberOfProducts || "",
            price: initialValues.price || ""
        },
        validationSchema: schema,
        onSubmit: async (values) => {

            // console.log('values ->', values);
            onFinish(values)
        }
    })

    // HANDLING VALUES:
    const setInputValue = useCallback(
        (key, value) =>
            formik.setValues({
                ...formik.values,
                [key]: value,
            }),
        [formik]
    );

    const onFinish = async ({ productName, productDescription, category_Id, brand_Id, numberOfProducts, price }) => {
        // console.log('product data ->', productName);

        let image = null
        console.log("image file is -> ", imageFile)
        if (imageFile) {
            formdata.append('image', imageFile)
            const data = await dispatch(uploadProductImage(formdata))
            image = data.data.file_name
        }
        console.log("image name is ->", image);
        if (image) {
            dispatch(updateProduct(productData?._id, { product_name: productName, product_description: productDescription, category_Id, brand_Id, price, numberOfProducts }, image))
            setOpen(false)
        }
    }

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
            <Box justifyContent={"center"} sx={{ display: 'flex' }}>
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
    const { setFieldValue, setFieldError } = formik;

    const handleEdit = async (productObject) => {
        console.log({ productObject });
        formik.setFieldError('productName', "")
        formik.setFieldError('productDescription', "")
        formik.setFieldError('price', "")
        formik.setFieldError('numberOfProducts', "")
        setProductData(productObject)
        try {
            const allBrands = await dispatch(fetchBrandsByCategoryName(productObject?.category?._id))
            console.log("all brands -> ", allBrands);
            if (allBrands) {
                setBrands(allBrands.data)
            }
        } catch (error) {
            console.log(error);
        }
        setOpen(true)
    }

    const dialogCloseHandler = () => {
        setOpen(false)
        formik.setFieldError('productName', "")
        formik.setFieldError('productDescription', "")
        formik.setFieldError('numberOfProducts', "")
        formik.setFieldError('price', "")
    }

    console.log("products => ", products);

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
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center">Discount</TableCell>
                            <TableCell align="center">Product Image</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            Array.isArray(products.payload) && products?.payload?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((singleProduct, index) => (
                                    <TableRow key={index}>
                                        <TableCell align="center" key={index}>{index + 1}</TableCell>
                                        <TableCell align="center">{singleProduct.productName}</TableCell>
                                        <TableCell align="center">{singleProduct.category.categoryName}</TableCell>
                                        <TableCell align="center">{singleProduct.brand.brandName}</TableCell>
                                        <TableCell align="center">{singleProduct.price}$</TableCell>
                                        <TableCell align="center">{singleProduct.discount}$</TableCell>
                                        <TableCell align="center">
                                            <img src={`http://localhost:3003/uploads/product/${singleProduct.image[0]}`} style={{ borderRadius: '10px' }} height={'60px'} width={'60px'} alt="image comes here" />
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
                <form onSubmit={formik.handleSubmit}>
                    <DialogTitle id="form-dialog-title">Update Product</DialogTitle>
                    <DialogContent style={{ overflow: "hidden" }}>

                        <Grid container spacing={6}>
                            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>

                                <TextField
                                    style={{ width: "100%" }}
                                    type="text"
                                    label="Product Name"
                                    name="productName"
                                    id="standard-basic"
                                    value={formik.values.productName}
                                    onChange={(e) => setInputValue("productName", e.target.value)}
                                />
                                <span className="mb-3 text-danger">{formik.errors.productName || ""}</span>

                                <FormControl fullWidth className='mb-1 mt-2'>
                                    <InputLabel id="demo-simple-select-label">Category</InputLabel>

                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name='category_Id'
                                        label="Category"
                                        value={formik.values.category_Id}
                                        onChange={(e) => {
                                            setInputValue("category_Id", e.target.value)
                                        }}
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
                                        value={formik.values.brand_Id}
                                        onChange={(e) => setInputValue("brand_Id", e.target.value)}
                                    >
                                        {
                                            brands?.map((singleBrand) => (
                                                <MenuItem key={singleBrand._id} value={singleBrand._id} >{singleBrand.brandName}</MenuItem>
                                            ))
                                        }
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
                                    value={formik.values.productDescription}
                                    onChange={(e) => setInputValue("productDescription", e.target.value)}
                                />
                                <span className="mb-2 text-danger">{formik.errors.productDescription || ""}</span>
                                <TextField
                                    style={{ width: "100%" }}
                                    type="text"
                                    label="Price"
                                    name="price"
                                    id="standard-basic"
                                    className='mt-2'
                                    value={formik.values.price}
                                    onChange={(e) => setInputValue("productDescription", e.target.value)}
                                />
                                <span className="mb-2 text-danger">{formik.errors.price || ""}</span>
                                <input
                                    style={{ width: "88%", border: "1px solid rgba(0,0,0,0.3)" }}
                                    className='MuiInputBase-input MuiOutlinedInput-input css-10vjoz-MuiInputBase-input-MuiOutlinedInput-input rounded mt-1'
                                    type="number"
                                    min={1}
                                    max={100}
                                    label="Number Of Products"
                                    name="numberOfProducts"
                                    id="standard-basic"
                                    placeholder="Number Of Products"
                                    value={formik.values.numberOfProducts}
                                    onChange={(e) => setInputValue("numberOfProducts", e.target.value)}
                                />
                                <span className="mb-2 text-danger">{formik.errors.numberOfProducts}</span>
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
                            update
                        </Button>
                    </DialogActions>
                </form>
            </Dialog >
        </>
    )
}

export default ProductListForm