import { Box, Stack, TextField } from '@mui/material';
import { styled } from '@mui/material';
import { SimpleCard } from 'app/components';
import { Span } from 'app/components/Typography';
import React from 'react';
import { fetchAllBrands } from 'store/actions/brandActions';

import BrandStepperForm from '../forms/BrandStepperForm';

import SimpleBrandForm from '../forms/BrandSimpleForm';
import { useDispatch } from 'react-redux';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

const AppButton = () => {

  const dispatch = useDispatch()

  return (
    <Container>

      <Stack spacing={3}>

        <Box display={'flex'} justifyContent={'end'}>
          <SimpleBrandForm />
        </Box>

        <SimpleCard title="All brands">
          <Box display={'flex'} justifyContent={'end'}>
            <Span className='mt-3 px-3'>Search</Span>
            <TextField onChange={(e) => {
              e.preventDefault()
              dispatch(fetchAllBrands(e.target.value))
            }
            } />
          </Box>
          <BrandStepperForm />
        </SimpleCard>
      </Stack>
    </Container>
  );
};

export default AppButton;
