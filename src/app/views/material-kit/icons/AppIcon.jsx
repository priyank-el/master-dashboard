import { Box, Stack, styled, TextField } from "@mui/material";
import { SimpleCard } from "app/components";
import ProductAddForm from "../forms/ProductAddForm";
import ProductListForm from "../forms/ProductListForm";
import { Span } from "app/components/Typography";
import { fetchAllProducts } from "store/actions/productActions";
import { useDispatch } from 'react-redux';

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));


const ProductAdd = () => {

  const dispatch = useDispatch()

  return (
    <Container>
      <Stack spacing={3}>
        {/* <SimpleCard title="Products"> */}
        {/* <SimpleCard title="Add Product"> */}
        <Box display={'flex'} justifyContent={'end'}>
          <ProductAddForm />
        </Box>
        {/* </SimpleCard> */}

        <SimpleCard title="All Products">
          <Box display={'flex'} justifyContent={'end'}>
            <Span className='mt-3 px-3'>Search</Span>
            <TextField onChange={(e) => {
              e.preventDefault()
              dispatch(fetchAllProducts(e.target.value))
            }
            } />
          </Box>
          <ProductListForm />
        </SimpleCard>
        {/* </SimpleCard> */}
      </Stack>
    </Container>
  );
};

export default ProductAdd;
