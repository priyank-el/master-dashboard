import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid,
    Icon,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import { Span } from "app/components/Typography";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBrands, fetchBrandsByCategoryName } from "store/actions/brandActions";
import { fetchAllCategory } from "store/actions/categoryActions";
import { createProduct, fetchAllProducts, uploadProductImage } from "store/actions/productActions";

import * as yup from 'yup'
import { Formik } from "formik"

const schema = yup.object().shape({
    productName: yup.string().required(),
    productDescription: yup.string().required(),
    category_Id: yup.string().required(),
    brand_Id: yup.string().required(),
    price: yup.string().min(1).required(),
    numberOfProducts: yup.string().min(1).required()
})

const ProductAddForm = () => {

    useEffect(() => {
        dispatch(fetchAllCategory())
        dispatch(fetchAllBrands())
        dispatch(fetchAllProducts())
    }, [])

    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const { category, loading } = useSelector(state => state)

    const [brands, setBrands] = useState([])
    const [imageFile, setImageFile] = useState('')
    const formdata = new FormData()

    // IMAGE CHANGE HANDLER:-   
    const onImageChangeHandler = (e) => {
        setImageFile(e.target.files[0])
    }

    // DIALOG OPEN HANDLER:-
    const dialogOpenHandler = () => {
        setOpen(true)
        // values.productName = ''
        // formik.values.productDescription = ''
        // formik.values.category_Id = ''
        // formik.values.brand_Id = ''
        // formik.values.price = ''
        // formik.values.numberOfProducts = ''
    }

    // DIALOG CLOSE HANDLER:-
    const dialogCloseHandler = () => {
        setOpen(false)
        // formik.errors.brand_Id = ''
        // formik.errors.category_Id = ''
        // formik.errors.productDescription = ''
        // formik.errors.productName = ''
        // formik.errors.price = ''
        // formik.errors.numberOfProducts = ''
    }

    const onFinish = async ({ productName, productDescription, category_Id, brand_Id, price, numberOfProducts }) => {
        let image = null
        console.log("image file is -> ", imageFile)
        if (imageFile) {
            formdata.append('image', imageFile)
            // console.log("form data is -> ", formdata)
            const data = await dispatch(uploadProductImage(formdata))
            image = data.data.file_name
        }
        console.log("image name is ->", image);
        if (image) {
            dispatch(createProduct({ product_name: productName, product_description: productDescription, category_Id, brand_Id, price, numberOfProducts }, image))
            setOpen(false)
        }
    }

    const fetchBrandByName = async (categoryName) => {
        const data = await dispatch(fetchBrandsByCategoryName(categoryName))
        console.log("category id is => ", data);
        setBrands(data.data)
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
            <Button onClick={dialogOpenHandler} color="primary" variant="contained" type="submit">
                <Icon>add</Icon>
                <Span sx={{ pl: 1, textTransform: "capitalize" }}>Add </Span>
            </Button>
            <Dialog open={open} onClose={dialogCloseHandler} aria-labelledby="form-dialog-title" >

                <Formik
                    initialValues={{
                        productName: "",
                        productDescription: "",
                        category_Id: "",
                        brand_Id: "",
                        price: "",
                        numberOfProducts: ""
                    }}
                    validationSchema={schema}
                    validate={values => {

                        const errors = {};
                        if (!values.productName) errors.productName = 'product name is required.'
                        if (!values.productDescription) errors.productDescription = 'product description is required.'
                        if (!values.category_Id) errors.category_Id = 'product category is required.'
                        if (!values.brand_Id) errors.brand_Id = 'product brand is required.'
                        if (!values.price) errors.price = 'price is required.'
                        if (!values.numberOfProducts) errors.numberOfProducts = 'product quantity is required.'

                        return errors;
                    }}
                    onSubmit={(values) => {
                        onFinish(values)
                    }}
                >{({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit
                }) => (
                    <form onSubmit={handleSubmit}>
                        <DialogTitle id="form-dialog-title">Add Product</DialogTitle>
                        <DialogContent style={{ overflow: "hidden" }}>

                            <Grid container spacing={6}>
                                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>

                                    <TextField
                                        style={{ width: "100%" }}
                                        type="text"
                                        label="Product Name"
                                        name="productName"
                                        id="standard-basic"
                                        value={values.productName}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                    />
                                    <span className="mb-3 text-danger">{errors.productName && touched.productName && errors.productName}</span>

                                    <FormControl fullWidth className='mb-1 mt-2'>
                                        <InputLabel id="demo-simple-select-label" value>Category</InputLabel>

                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            name='category_Id'
                                            label="Category"
                                            value={values.category_Id}
                                            onBlur={handleBlur}
                                            onChange={(e) => {
                                                handleChange(e)
                                                fetchBrandByName(e.target.value)
                                            }}
                                        >
                                            {
                                                category?.payload?.map((singleCategory) => (
                                                    <MenuItem key={singleCategory._id} value={singleCategory._id}>{singleCategory.categoryName}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                        <span className="mb-2 text-danger">{errors.category_Id && touched.category_Id && errors.category_Id}</span>
                                    </FormControl>
                                    <FormControl fullWidth className='mb-5'>
                                        <InputLabel id="demo-simple-select-label">Brand</InputLabel>

                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            name='brand_Id'
                                            label="Brand"
                                            value={values.brand_Id}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                        >
                                            {
                                                brands.map((singleBrand) => (
                                                    <MenuItem key={singleBrand._id} value={singleBrand._id} >{singleBrand.brandName}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                        <span className="mb-2 text-danger">{errors.brand_Id && touched.brand_Id && errors.brand_Id}</span>

                                    </FormControl>

                                </Grid>

                                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                                    <TextField
                                        style={{ width: "100%" }}
                                        type="text"
                                        label="Product Description"
                                        name="productDescription"
                                        id="standard-basic"
                                        value={values.productDescription}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                    />
                                    <span className="mb-2 text-danger">{errors.productDescription && touched.productDescription && errors.productDescription}</span>
                                    <TextField
                                        style={{ width: "100%" }}
                                        className='mb-1 mt-2 '
                                        type="text"
                                        label="Price"
                                        name="price"
                                        id="standard-basic"
                                        value={values.price}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                    />
                                    <span className="mb-2 text-danger">{errors.price && touched.price && errors.price}</span>
                                    <input
                                        style={{ width: "88%", border: "1px solid rgba(0,0,0,0.3)" }}
                                        className='MuiInputBase-input MuiOutlinedInput-input css-10vjoz-MuiInputBase-input-MuiOutlinedInput-input rounded mt-1'
                                        type="number"
                                        min={1}
                                        max={100}
                                        label="Number Of Products"
                                        name="numberOfProducts"
                                        id="standard-basic"
                                        placeholder="Number Of Products"
                                        value={values.numberOfProducts}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                    />
                                    <span className="mb-2 text-danger">{errors.numberOfProducts && touched.numberOfProducts && errors.numberOfProducts}</span>
                                    <label className="mt-3" htmlFor="icon-button-file">
                                        <input onChange={onImageChangeHandler} className="input" id="icon-button-file" type="file" />
                                    </label>
                                </Grid>
                            </Grid>

                        </DialogContent>

                        <DialogActions>
                            <Button variant="outlined" onClick={dialogCloseHandler}>
                                Cancel
                            </Button>

                            <Button color="primary" variant="contained" type="submit" >
                                add
                            </Button>
                        </DialogActions>
                    </form>
                )}
                </Formik>


            </Dialog >
        </>
    );
};

export default ProductAddForm;
