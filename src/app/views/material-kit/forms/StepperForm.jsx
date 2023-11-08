
import styled from "@emotion/styled";
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Icon, IconButton, Modal, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TextField, Typography } from "@mui/material";
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

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  };

  const [open, setOpen] = useState(false);
  const [updatedCategory, setCategory] = useState('')
  const [error, setError] = useState({})
  // const [status, setStatus] = useState('')
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
    let errorMessage = {}
    if (e.target.value.trim().length === 0) {
      errorMessage.category = 'category is required'
    }
    // console.log("errorMessage is ->", errorMessage);
    setError(errorMessage)
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
    // console.log("data is ->", objectData);
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

  const StyledTable = styled(Table)(() => ({
    whiteSpace: "pre",
    "& thead": {
      "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
    },
    "& tbody": {
      "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
    },
  }));

  return (
    <>

      <Box width="100%" overflow="auto">
        <StyledTable>
          <TableHead>
            <TableRow>
              <TableCell align="center">sr. no</TableCell>
              <TableCell align="center">Category Name</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {

              category?.payload?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((singleCategory, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{singleCategory.categoryName}</TableCell>
                    <TableCell align="center">{singleCategory.status}</TableCell>
                    <TableCell align="center">
                      <Link onClick={() => handleEdit(singleCategory)}><Icon className="mx-2 text-secondary">edit</Icon></Link>
                      <Link onClick={() => handleDelete(singleCategory)}><Icon className="mx-2 text-danger">delete</Icon></Link>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </StyledTable>

        <TablePagination
          sx={{ px: 2 }}
          page={page}
          component="div"
          rowsPerPage={rowsPerPage}
          count={category?.payload?.length}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10]}
          onRowsPerPageChange={handleChangeRowsPerPage}
          nextIconButtonProps={{ "aria-label": "Next Page" }}
          backIconButtonProps={{ "aria-label": "Previous Page" }}
        />
      </Box>

      {/*  MODEL :- */}
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Update Category</DialogTitle>
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
                  value={updatedCategory}
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

          <Button onClick={updateHandler} color="primary" variant="contained" type="button" disabled={Object.keys(error).length > 0}>
            <Span sx={{ pl: 1, textTransform: "capitalize" }}>Upload</Span>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
