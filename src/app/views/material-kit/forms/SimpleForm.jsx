
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Icon,
  Input,
  TextField
} from "@mui/material";
import { Span } from "app/components/Typography"
import { useFormik } from "formik";
import { useCallback } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCategory } from "store/actions/categoryActions";

import * as yup from 'yup'

const schema = yup.object().shape({
  category: yup.string().required()
})

const SimpleForm = () => {

  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()

  // DIALOG OPEN HANDLER:-
  const dialogOpenHandler = () => {
    setOpen(true)
    formik.values.category = ''
  }

  // DIALOG OPEN HANDLER:-
  const dialogCloseHandler = () => {
    setOpen(false)
    formik.errors.category = ''
  }

  // INITIALIZING FORMIK HERE:
  const formik = useFormik({
    initialValues: {
      category: ""
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

  const onFinish = (category) => {
    setOpen(false)
    dispatch(createCategory({ categoryName: category.category }))
  }

  return (

    <>
      <Box>
        <Button onClick={dialogOpenHandler} color="primary" variant="contained" type="submit">
          <Icon>add</Icon>
          <Span sx={{ pl: 1, textTransform: "capitalize" }}>Add </Span>
        </Button>
      </Box>

      <Dialog open={open} onClose={dialogCloseHandler} aria-labelledby="form-dialog-title">
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle id="form-dialog-title">Add Category</DialogTitle>
          <DialogContent>
            <Grid container spacing={6}>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>

                <TextField
                  type="text"
                  style={{ width: "500px" }}
                  name="category"
                  label="Category Name"
                  className="mb-1"
                  value={formik.values.category}
                  onChange={(e) => setInputValue("category", e.target.value)}
                />
                <small className="text-danger">{formik.errors.category}</small>
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
    </>
  )
}

export default SimpleForm;
