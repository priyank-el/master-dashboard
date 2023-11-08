import { Box, Stack, styled } from "@mui/material";
import { SimpleCard } from "app/components";
import ProductAddForm from "../forms/ProductAddForm";
import ProductListForm from "../forms/ProductListForm";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));


const ProductAdd = () => {
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
          <ProductListForm />
        </SimpleCard>
        {/* </SimpleCard> */}
      </Stack>
    </Container>
  );
};

export default ProductAdd;
