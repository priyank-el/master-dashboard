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
import BrandStepperForm from '../forms/BrandStepperForm';

import * as yup from 'yup'
import { useFormik } from 'formik';
import { useCallback } from 'react';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

const schema = yup.object().shape({
  category_Id: yup.string().required(),
  brand_name: yup.string().required()
})

const AppButton = () => {

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch()
  const { category, loading } = useSelector((state) => state)

  // DIALOG OPEN HANDLER:-
  const dialogOpenHandler = () => {
    setOpen(true)
    formik.values.category_Id = ''
    formik.values.brand_name = ''
  }

  // DIALOG CLOSE HANDLER:-
  const dialogCloseHandler = () => {
    setOpen(false)
    formik.errors.brand_name = ''
    formik.errors.category_Id = ''
  }

  // INITIALIZING FORMIK HERE:
  const formik = useFormik({
    initialValues: {
      category_Id: "",
      brand_name: ""
    },
    validationSchema: schema,
    onSubmit: async (values) => {
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
  )

  const onFinish = ({ category_Id, brand_name }) => {
    setOpen(false)
    console.log(category_Id, brand_name)
    dispatch(createBrand({ category_id: category_Id, brandName: brand_name }))
  }

  useEffect(() => {
    dispatch(fetchAllCategory())
  }, [])

  useEffect(() => {
    dispatch(fetchAllBrands())
  }, [])

  if (loading) {
    return (<Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>)
  }

  return (
    <Container>

      <Stack spacing={3}>
        <Box display={'flex'} justifyContent={'end'}>
          <Button onClick={dialogOpenHandler} color="primary" variant="contained" type="submit">
            <Icon>add</Icon>
            <Span sx={{ pl: 1, textTransform: "capitalize" }}>add Brand</Span>
          </Button>
        </Box>
        <Dialog open={open} onClose={dialogCloseHandler} aria-labelledby="form-dialog-title">
          <form onSubmit={formik.handleSubmit}>
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
                      value={formik.values.category_Id}
                      onChange={(e) => setInputValue("category_Id", e.target.value)}
                    >
                      {
                        category?.payload?.map((singleCategory, index) => (
                          <MenuItem key={singleCategory._id} value={singleCategory._id} >{singleCategory.categoryName}</MenuItem>
                        ))
                      }
                    </Select>
                    <span style={{ marginBottom: "100px" }} className='mb-3 text-danger'>{formik.errors.category_Id}</span>
                  </FormControl>
                  <TextField
                    type="text"
                    style={{ width: "500px" }}
                    name="brand_name"
                    label="Brand Name"
                    className="mb-1"
                    value={formik.values.brand_name}
                    onChange={(e) => setInputValue("brand_name", e.target.value)}
                  />
                  <span className='mb-5 text-danger'>{formik.errors.brand_name}</span>
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
        </Dialog>

        <SimpleCard title="All brands">
          <BrandStepperForm />
        </SimpleCard>
      </Stack>
    </Container>
  );
};

export default AppButton;
