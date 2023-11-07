import { styled } from "@mui/material";
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
      <SimpleCard title="Products">
        <SimpleCard title="Add Product">
          <ProductAddForm />
        </SimpleCard>

        <SimpleCard title="All Products">
          <ProductListForm />
        </SimpleCard>
      </SimpleCard>
    </Container>
  );
};

export default ProductAdd;
