
import styled from "@emotion/styled";
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, Icon, InputLabel, MenuItem, Modal, Select, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TextField, Typography } from "@mui/material";
import { Span } from "app/components/Typography";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteBrand, updateBrandById } from "store/actions/brandActions";

export default function BrandStepperForm() {

    // const style = {
    //     position: 'absolute',
    //     top: '50%',
    //     left: '50%',
    //     transform: 'translate(-50%, -50%)',
    //     width: 500,
    //     height: 400,
    //     bgcolor: 'background.paper',
    //     border: '1px solid #fff',
    //     borderRadius: '7px',
    //     boxShadow: 24,
    //     p: 4,
    // }

    const { brand, loading } = useSelector(state => state)
    const [open, setOpen] = useState(false)
    const [brandData, setBrandData] = useState({
        id: '',
        category_Id: '',
        brand_name: ''
    })

    useEffect(() => {
        let errorMessage = {}
        if (brandData.brand_name.trim().length === 0) {
            errorMessage.brand = 'brand is required.'
        }
        setError(errorMessage)
    }, [brandData])

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);

    const [error, setError] = useState({})
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
        const value = e.target.value.trim()
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

    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
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

    return (
        <>
            <Box width="100%" overflow="auto">
                <StyledTable>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">sr. no</TableCell>
                            <TableCell align="center">Brand Name</TableCell>
                            <TableCell align="center">Category Name</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {

                            brand?.payload?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((singleBrand, index) => (
                                    <TableRow key={index}>
                                        <TableCell align="center" key={index}>{index + 1}</TableCell>
                                        <TableCell align="center">{singleBrand.brandName}</TableCell>
                                        <TableCell align="center">{singleBrand.category.categoryName}</TableCell>
                                        <TableCell align="center">{singleBrand.status}</TableCell>
                                        <TableCell align="center">
                                            <Link onClick={() => handleEdit(singleBrand)}><Icon className="mx-2 text-secondary">edit</Icon></Link>
                                            <Link onClick={() => handleDelete(singleBrand)}><Icon className="mx-2 text-danger">delete</Icon></Link>
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
                    count={brand?.payload?.length}
                    onPageChange={handleChangePage}
                    rowsPerPageOptions={[1, 5, 10]}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    nextIconButtonProps={{ "aria-label": "Next Page" }}
                    backIconButtonProps={{ "aria-label": "Previous Page" }}
                />
            </Box>

            {/*  MODEL :- */}

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
                                        className="mb-1"
                                        onChange={handleChange}
                                    />
                                    <span className="mb-3 text-danger">{error.brand}</span>
                                </Grid>

                            </Grid>
                        </form>
                    </div>
                </DialogContent>

                <DialogActions>
                    <Button variant="outlined" onClick={handleClose}>
                        Cancel
                    </Button>

                    <Button onClick={updateHandler} color="primary" variant="contained" type="button" disabled={Object.keys(error).length > 0}>
                        <Span sx={{ pl: 1, textTransform: "capitalize" }}>update</Span>
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
