import { Box, Stack, TextField } from '@mui/material';
import { styled } from '@mui/material';
import { SimpleCard } from 'app/components';
import SimpleForm from './SimpleForm';
import StepperForm from './StepperForm';
import { Span } from 'app/components/Typography';
import { fetchAllCategory } from 'store/actions/categoryActions';
import { useDispatch } from 'react-redux';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

const AppForm = () => {

  const dispatch = useDispatch()

  return (
    <Container>
      {/* <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: 'Material', path: '/material' }, { name: 'Form' }]} />
      </Box> */}

      <Stack spacing={3}>

        {/* <SimpleCard title="ad category"> */}
        <Box display={'flex'} justifyContent={'end'}>
          <SimpleForm />
        </Box>
        {/* </SimpleCard> */}

        <SimpleCard title="All categoies">
          <Box display={'flex'} justifyContent={'end'}>
            <Span className='mt-3 px-3'>Search</Span>
            <TextField onChange={(e) => {
              e.preventDefault()
              dispatch(fetchAllCategory(e.target.value))
            }
            } />
          </Box>
          <StepperForm />
        </SimpleCard>

        {/* <SimpleCard title="stepper form">
          <StepperForm />
        </SimpleCard> */}
      </Stack>
    </Container>
  );
};

export default AppForm;
