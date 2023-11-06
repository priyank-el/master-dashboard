
import { Box, Button, CircularProgress, Grid, Icon, Modal, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Span } from "app/components/Typography";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteCategory, fetchAllCategory, updateCategory } from "store/actions/categoryActions";

export default function StepperForm() {

  const dispatch = useDispatch()
  const { loading, category } = useSelector(state => state)

  useEffect(() => {
    dispatch(fetchAllCategory())
  }, [])

  const [open, setOpen] = useState(false);
  const [updatedCategory, setCategory] = useState('')
  const [status, setStatus] = useState('')
  const [categoryObject, setCategoryObject] = useState({})

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: 300,
    bgcolor: 'background.paper',
    borderRadius: '12px',
    border: '1px solid #fff',
    boxShadow: 24,
    p: 4,
  }

  // console.log("category", categoryObject);

  const handleChange = (e) => {
    const category_name = e.target.value
    setCategory(category_name)
    // console.log(category_name);
  }

  const handleEdit = (category) => {
    setCategory(category.categoryName)
    setCategoryObject(category)
    handleOpen(true)
  }

  const handleDelete = (category) => {
    console.log(category._id);
    dispatch(deleteCategory(category._id))
  }

  const updateHandler = (e) => {
    e.preventDefault()
    const objectData = {
      id: categoryObject._id,
      categoryName: updatedCategory
    }
    console.log("data is ->", objectData);
    dispatch(updateCategory(objectData))
    handleClose()
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <>
      <Box>
        {
          Array.isArray(category.payload)
            ?
            <Table >
              <TableHead>
                <TableRow>
                  <TableCell align="center">sr. no</TableCell>
                  <TableCell align="center">Category Name</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              {
                category.payload.map((singleCategory, index) => {
                  return (
                    <TableBody>
                      <TableCell align="center" key={index}>{index + 1}</TableCell>
                      <TableCell align="center">{singleCategory.categoryName}</TableCell>
                      <TableCell align="center">{singleCategory.status}</TableCell>
                      <TableCell align="center">
                        <Link onClick={() => handleEdit(singleCategory)}><Icon className="mx-2 text-secondary">edit</Icon></Link>
                        <Link onClick={() => handleDelete(singleCategory)}><Icon className="mx-2 text-danger">delete</Icon></Link>
                      </TableCell>
                    </TableBody>
                  )
                })

              }
            </Table>
            :
            <h1 className="text-center">No categories found..</h1>
        }

      </Box>
      {/*  MODEL :- */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update category
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div>
              <form >
                <Grid container spacing={6}>
                  <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>

                    <TextField
                      type="text"
                      name="category_name"
                      label="Category Name"
                      value={updatedCategory}
                      className="mb-5"
                      onChange={handleChange}
                    />
                  </Grid>

                </Grid>

                <Button onClick={updateHandler} color="primary" variant="contained" type="button">
                  <Span sx={{ pl: 1, textTransform: "capitalize" }}>update</Span>
                </Button>
              </form>
            </div>
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
