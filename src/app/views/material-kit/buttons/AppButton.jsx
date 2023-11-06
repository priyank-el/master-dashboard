import { Box, Button, CircularProgress, FormControl, Grid, Icon, InputLabel, Menu, MenuItem, Modal, Select, Stack, TextField, Typography } from '@mui/material';
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
// import SimpleForm from './SimpleForm';
// import StepperForm from './StepperForm';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

const AppButton = () => {

  const [open, setOpen] = useState(false);
  const [objectData, setObjectData] = useState({
    category_Id: '',
    brand_name: ''
  });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const value = e.target.value
    const name = e.target.name
    setObjectData({
      ...objectData,
      [name]: value,
    })
  }

  const dispatch = useDispatch()
  const { category, loading } = useSelector((state) => state)

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

  const onFinish = () => {
    const dataObject = {
      category_id: objectData.category_Id,
      brandName: objectData.brand_name
    }
    dispatch(createBrand(dataObject))
    handleClose()
    setObjectData({
      brand_name: '',
      category_Id: ''
    })
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

  // console.log("array is -> ", category.payload);

  return (
    <Container>

      <Stack spacing={3}>
        <Box>
          <Button onClick={handleOpen} color="primary" variant="contained" type="submit">
            <Icon>add</Icon>
            <Span sx={{ pl: 1, textTransform: "capitalize" }}>add Brand</Span>
          </Button>
        </Box>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add brand
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <div>
                <form >
                  <Grid container spacing={6}>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                      <Box>
                        <FormControl fullWidth className='mb-5'>
                          <InputLabel id="demo-simple-select-label">category</InputLabel>

                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name='category_Id'
                            value={objectData.category_Id}
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
                          value={objectData.brand_name}
                          className="mb-5"
                          onChange={handleChange}
                        />
                      </Box>
                    </Grid>

                  </Grid>

                  <Button onClick={onFinish} color="primary" variant="contained" type="button">
                    <Span sx={{ pl: 1, textTransform: "capitalize" }}>Add</Span>
                  </Button>
                </form>
              </div>
            </Typography>
          </Box>
        </Modal>

        <SimpleCard title="All brands">
          <BrandStepperForm />
          {/* <StepperForm /> */}
        </SimpleCard>


      </Stack>
    </Container>
  );
};

export default AppButton;
