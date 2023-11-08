
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
  const [error, setError] = useState({})
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()

  const handleChange = (e) => {
    const categoryName = e.target.value
    // console.log("category is ->", e.target.value);
    setCategory(categoryName)

    let errorMessage = {}
    if (e.target.value.trim().length === 0) {
      errorMessage.category = 'category is required'
    }
    // console.log("errorMessage is ->", errorMessage);
    setError(errorMessage)
  }

  const onFinish = (e) => {
    e.preventDefault()
    // createCategoryData()
    setCategory('')
    setError({
      category: 'category is required'
    })
    setOpen(true)
  }

  const createCategoryData = async () => {
    const dataObject = {
      categoryName: category
    }
    const data = await dispatch(createCategory(dataObject))
    setOpen(false)
    if (data.success === true) {
      toast.success('category created.')
    } else {
      console.log(data)
    }
  }

  // console.log("brand is ->", brand.payload);

  const handleClose = () => setOpen(false)

  const addHandler = () => {
    console.log("error is -> ", error);
    if (Object.keys(error).length === 0) {
      // console.log("form submitted");
      createCategoryData()
    }
  }
  // console.log("category is => ", error);
  return (

    <>
      <Button onClick={onFinish} color="primary" variant="contained" type="submit">
        <Icon>add</Icon>
        <Span sx={{ pl: 1, textTransform: "capitalize" }}>Add </Span>
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Category</DialogTitle>
        <DialogContent>
          <div>
            <Grid container spacing={6}>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>

                <TextField
                  type="text"
                  style={{ width: "500px" }}
                  name="category"
                  label="Category Name"
                  className="mb-1"
                  value={category}
                  onChange={handleChange}
                />
                <span className="text-danger mb-5">{error.category}</span>
              </Grid>

            </Grid>
          </div>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>

          <Button onClick={addHandler} color="primary" variant="contained" type="button" disabled={Object.keys(error).length > 0}>
            <Span sx={{ pl: 1, textTransform: "capitalize" }}>Add</Span>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SimpleForm;
