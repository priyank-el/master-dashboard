
import {
  Button,
  Grid,
  Icon,
  TextField
} from "@mui/material";
import { Span } from "app/components/Typography"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCategory } from '../../../../store/actions/categoryActions'
import { toast } from "react-toastify";

const SimpleForm = () => {

  const [category, setCategory] = useState('')
  const dispatch = useDispatch()

  const handleChange = (e) => {
    const category_name = e.target.value
    setCategory(category_name)
  }

  const onFinish = (e) => {
    e.preventDefault()
    createCategoryData()
  }

  const createCategoryData = async () => {
    const dataObject = {
      categoryName: category
    }
    const data = await dispatch(createCategory(dataObject))
    if (data.success === true) {
      toast.success('category created.')
    } else {
      console.log(data);
    }
  }

  return (
    <div>
      <form >
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>

            <TextField
              type="text"
              name="category_name"
              label="Category Name"
              className="mb-5"
              onChange={handleChange}
            />
          </Grid>

        </Grid>

        <Button onClick={onFinish} color="primary" variant="contained" type="submit">
          <Icon>send</Icon>
          <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
        </Button>
      </form>
    </div>
  );
};

export default SimpleForm;
