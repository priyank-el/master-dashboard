
import { Box, CircularProgress, Icon, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteBrand } from "store/actions/brandActions";

export default function BrandStepperForm() {

    const { brand, loading } = useSelector(state => state)
    const dispatch = useDispatch()

    // console.log("brand is ->", brand.payload);

    const handleDelete = (brand) => {
        dispatch(deleteBrand(brand._id))
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
                    brand?.payload?.length > 0
                        ?
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">sr. no</TableCell>
                                    <TableCell align="center">Brand Name</TableCell>
                                    <TableCell align="center">Category Name</TableCell>
                                    <TableCell align="center">Status</TableCell>
                                    <TableCell align="center">Actions</TableCell>
                                </TableRow>
                            </TableHead>

                            {
                                brand.payload.map((singleBrand, index) => (
                                    <TableBody>
                                        <TableCell align="center" key={index}>{index + 1}</TableCell>
                                        <TableCell align="center">{singleBrand.brandName}</TableCell>
                                        <TableCell align="center">{singleBrand.category.categoryName}</TableCell>
                                        <TableCell align="center">{singleBrand.status}</TableCell>
                                        <TableCell align="center">
                                            <Link><Icon className="mx-2 text-secondary">edit</Icon></Link>
                                            <Link onClick={() => handleDelete(singleBrand)}><Icon className="mx-2 text-danger">delete</Icon></Link>
                                        </TableCell>
                                    </TableBody>
                                ))
                            }
                        </Table>
                        :
                        <h1>No brands are available</h1>
                }
            </Box>
            {/*  MODEL :- */}
            {/* <Modal
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
            </Modal> */}
        </>
    );
}
