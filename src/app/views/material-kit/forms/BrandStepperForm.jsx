
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, Icon, InputLabel, MenuItem, Modal, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Span } from "app/components/Typography";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteBrand, updateBrandById } from "store/actions/brandActions";

export default function BrandStepperForm() {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        height: 400,
        bgcolor: 'background.paper',
        border: '1px solid #fff',
        borderRadius: '7px',
        boxShadow: 24,
        p: 4,
    }

    const { brand, loading } = useSelector(state => state)
    const [open, setOpen] = useState(false)
    const [brandData, setBrandData] = useState({
        id: '',
        category_Id: '',
        brand_name: ''
    })
    const dispatch = useDispatch()
    const { category } = useSelector(select => select)

    // console.log("brand is ->", brand.payload);

    const handleClose = () => setOpen(false)

    const handleEdit = (brandObject) => {
        // console.log("brand data is ->", brandObject);
        setBrandData({
            id: brandObject._id,
            brand_name: brandObject.brandName,
            category_Id: brandObject.category._id
        })
        setOpen(true)
    }

    const handleChange = (e) => {
        const value = e.target.value
        const name = e.target.name
        setBrandData({
            ...brandData,
            [name]: value,
        })
    }
    // console.log(brandData);
    const updateHandler = () => {
        dispatch(updateBrandById(brandData))
    }

    const handleDelete = (brand) => {
        dispatch(deleteBrand(brand._id))
    }

    if (loading) {
        return (
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        )
    }

    return (
        <>
            <Box>
                {
                    brand?.payload?.length > 0
                        ?
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">sr. no</TableCell>
                                    <TableCell align="center">Brand Name</TableCell>
                                    <TableCell align="center">Category Name</TableCell>
                                    <TableCell align="center">Status</TableCell>
                                    <TableCell align="center">Actions</TableCell>
                                </TableRow>
                            </TableHead>

                            {
                                brand.payload.map((singleBrand, index) => (
                                    <TableBody>
                                        <TableCell align="center" key={index}>{index + 1}</TableCell>
                                        <TableCell align="center">{singleBrand.brandName}</TableCell>
                                        <TableCell align="center">{singleBrand.category.categoryName}</TableCell>
                                        <TableCell align="center">{singleBrand.status}</TableCell>
                                        <TableCell align="center">
                                            <Link onClick={() => handleEdit(singleBrand)}><Icon className="mx-2 text-secondary">edit</Icon></Link>
                                            <Link onClick={() => handleDelete(singleBrand)}><Icon className="mx-2 text-danger">delete</Icon></Link>
                                        </TableCell>
                                    </TableBody>
                                ))
                            }
                        </Table>
                        :
                        <h1>No brands are available</h1>
                }
            </Box>
            {/*  MODEL :- */}
            {/* <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Update category
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <div>
                            <form >
                                <Grid container spacing={6}>
                                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>

                                        <FormControl fullWidth className='mb-5'>
                                            <InputLabel id="demo-simple-select-label">category</InputLabel>

                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                name='category_Id'
                                                value={brandData.category_Id}
                                                label="Age"
                                                onChange={handleChange}
                                            >
                                                {
                                                    category?.payload?.map((singleCategory, index) => (
                                                        <MenuItem key={singleCategory._id} value={singleCategory._id} >{singleCategory.categoryName}</MenuItem>
                                                    ))
                                                }
                                            </Select>

                                        </FormControl>
                                        <TextField
                                            type="text"
                                            name="brand_name"
                                            label="Brand Name"
                                            value={brandData.brand_name}
                                            className="mb-5"
                                            onChange={handleChange}
                                        />

                                    </Grid>

                                </Grid>

                                <Button onClick={updateHandler} color="primary" variant="contained" type="button">
                                    <Span sx={{ pl: 1, textTransform: "capitalize" }}>update</Span>
                                </Button>
                            </form>
                        </div>
                    </Typography>
                </Box>
            </Modal> */}
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Update Brand</DialogTitle>

                <DialogContent>
                    <div>
                        <form >
                            <Grid container spacing={6}>
                                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>

                                    <FormControl fullWidth className='mb-5'>
                                        <InputLabel id="demo-simple-select-label">category</InputLabel>

                                        <Select
                                            style={{ width: '500px' }}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            name='category_Id'
                                            value={brandData.category_Id}
                                            label="Age"
                                            onChange={handleChange}
                                        >
                                            {
                                                category?.payload?.map((singleCategory, index) => (
                                                    <MenuItem key={singleCategory._id} value={singleCategory._id} >{singleCategory.categoryName}</MenuItem>
                                                ))
                                            }
                                        </Select>

                                    </FormControl>
                                    <TextField
                                        style={{ width: '500px' }}
                                        type="text"
                                        name="brand_name"
                                        label="Brand Name"
                                        value={brandData.brand_name}
                                        className="mb-5"
                                        onChange={handleChange}
                                    />

                                </Grid>

                            </Grid>


                        </form>
                    </div>
                </DialogContent>

                <DialogActions>
                    <Button variant="outlined" color="secondary" onClick={handleClose}>
                        Cancel
                    </Button>

                    <Button onClick={updateHandler} color="primary" variant="contained" type="button">
                        <Span sx={{ pl: 1, textTransform: "capitalize" }}>update</Span>
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
