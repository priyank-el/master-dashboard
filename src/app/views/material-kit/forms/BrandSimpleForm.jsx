import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, Icon, InputLabel, MenuItem, Modal, Select, Stack, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material';
import { SimpleCard } from 'app/components';
import { Span } from 'app/components/Typography';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBrand, fetchAllBrands } from 'store/actions/brandActions';
import { fetchAllCategory } from 'store/actions/categoryActions';

import * as yup from 'yup'
import { Formik } from 'formik'

// const Container = styled('div')(({ theme }) => ({
//     margin: '30px',
//     [theme.breakpoints.down('sm')]: { margin: '16px' },
//     '& .breadcrumb': {
//         marginBottom: '30px',
//         [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
//     }
// }));

const schema = yup.object().shape({
    category_Id: yup.string().required(),
    brand_name: yup.string().required()
})

const SimpleBrand = () => {

    const [open, setOpen] = useState(false);
    const dispatch = useDispatch()
    const { category, loading } = useSelector((state) => state)

    // DIALOG OPEN HANDLER:-
    const dialogOpenHandler = () => setOpen(true)


    // DIALOG CLOSE HANDLER:-
    const dialogCloseHandler = () => setOpen(false)


    const onFinish = ({ category_Id, brand_name }) => {
        setOpen(false)
        console.log(category_Id, brand_name)
        dispatch(createBrand({ category_id: category_Id, brandName: brand_name }))
    }

    useEffect(() => {
        dispatch(fetchAllCategory())
        dispatch(fetchAllBrands())
    }, [])

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: "center" }}>
            </Box>
        )
    }

    return (
        <>
            <Box display={'flex'} justifyContent={'end'}>
                <Button onClick={dialogOpenHandler} color="primary" variant="contained" type="submit">
                    <Icon>add</Icon>
                    <Span sx={{ pl: 1, textTransform: "capitalize" }}>add Brand</Span>
                </Button>
            </Box>
            <Dialog open={open} onClose={dialogCloseHandler} aria-labelledby="form-dialog-title">

                <Formik
                    initialValues={{ category_Id: '', brand_name: '' }}
                    validationSchema={schema}
                    validate={values => {

                        const errors = {};
                        if (!values.category_Id) errors.category_Id = 'category is required.'
                        if (!values.brand_name) errors.brand_name = 'brand name is required.'

                        return errors;
                    }}
                    onSubmit={(values) => {
                        onFinish(values)
                    }}
                >{({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit
                }) => (
                    <form onSubmit={handleSubmit}>
                        <DialogTitle id="form-dialog-title">Add</DialogTitle>
                        <DialogContent>
                            <Grid container spacing={6}>
                                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>

                                    <FormControl fullWidth className='mb-1'>
                                        <InputLabel id="demo-simple-select-label">category</InputLabel>

                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            style={{ width: "500px" }}
                                            name='category_Id'
                                            label="category"
                                            value={values.category_Id}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                        >
                                            {
                                                category?.payload?.map((singleCategory, index) => (
                                                    <MenuItem key={singleCategory._id} value={singleCategory._id} >{singleCategory.categoryName}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                        <span style={{ marginBottom: "100px" }} className='mb-3 text-danger'>{errors.category_Id && touched.category_Id && errors.category_Id}</span>
                                    </FormControl>
                                    <TextField
                                        type="text"
                                        style={{ width: "500px" }}
                                        name="brand_name"
                                        label="Brand Name"
                                        className="mb-1"
                                        value={values.brand_name}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                    />
                                    <span className='mb-5 text-danger'>{errors.brand_name && touched.brand_name && errors.brand_name}</span>
                                </Grid>

                            </Grid>
                        </DialogContent>

                        <DialogActions>
                            <Button variant="outlined" onClick={dialogCloseHandler}>
                                Cancel
                            </Button>

                            <Button color="primary" variant="contained" type="submit" >
                                <Span sx={{ pl: 1, textTransform: "capitalize" }}>Add</Span>
                            </Button>
                        </DialogActions>
                    </form>
                )}
                </Formik>


            </Dialog>
        </>
    )
}

export default SimpleBrand;
