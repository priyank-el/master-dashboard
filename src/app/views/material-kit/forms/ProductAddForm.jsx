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
import { useFormik } from "formik"
import { useCallback } from "react";

const schema = yup.object().shape({
    productName: yup.string().required(),
    productDescription: yup.string().required(),
    category_Id: yup.string().required(),
    brand_Id: yup.string().required()
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
        formik.values.productName = ''
        formik.values.productDescription = ''
        formik.values.category_Id = ''
        formik.values.brand_Id = ''
    }

    // DIALOG CLOSE HANDLER:-
    const dialogCloseHandler = () => {
        setOpen(false)
        formik.errors.brand_Id = ''
        formik.errors.category_Id = ''
        formik.errors.productDescription = ''
        formik.errors.productName = ''
    }

    // INITIALIZING FORMIK HERE:
    const formik = useFormik({
        initialValues: {
            productName: "",
            productDescription: "",
            category_Id: "",
            brand_Id: ""
        },
        validationSchema: schema,
        onSubmit: async (values) => {
            console.log("called..");
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

    const onFinish = async ({ productName, productDescription, category_Id, brand_Id }) => {
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
            dispatch(createProduct({ product_name: productName, product_description: productDescription, category_Id, brand_Id }, image))
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
                <form onSubmit={formik.handleSubmit}>
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
                                    value={formik.values.productName}
                                    onChange={(e) => setInputValue("productName", e.target.value)}
                                />
                                <span className="mb-3 text-danger">{formik.errors.productName}</span>

                                <FormControl fullWidth className='mb-1 mt-2'>
                                    <InputLabel id="demo-simple-select-label">Category</InputLabel>

                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name='category_Id'
                                        label="Category"
                                        value={formik.values.category_Id}
                                        onChange={(e) => {
                                            setInputValue("category_Id", e.target.value)
                                            fetchBrandByName(e.target.value)
                                        }}
                                    >
                                        {
                                            category?.payload?.map((singleCategory) => (
                                                <MenuItem key={singleCategory._id} value={singleCategory._id} >{singleCategory.categoryName}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                    <span className="mb-2 text-danger">{formik.errors.category_Id}</span>
                                </FormControl>
                                <FormControl fullWidth className='mb-5'>
                                    <InputLabel id="demo-simple-select-label">Brand</InputLabel>

                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name='brand_Id'
                                        label="Brand"
                                        value={formik.values.brand_Id}
                                        onChange={(e) => setInputValue("brand_Id", e.target.value)}
                                    >
                                        {
                                            brands.map((singleBrand) => (
                                                <MenuItem key={singleBrand._id} value={singleBrand._id} >{singleBrand.brandName}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                    <span className="mb-2 text-danger">{formik.errors.brand_Id}</span>

                                </FormControl>

                            </Grid>

                            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                                <TextField
                                    style={{ width: "100%" }}
                                    type="text"
                                    label="Product Description"
                                    name="productDescription"
                                    id="standard-basic"
                                    value={formik.values.productDescription}
                                    onChange={(e) => setInputValue("productDescription", e.target.value)}
                                />
                                <span className="mb-2 text-danger">{formik.errors.productDescription}</span>
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
            </Dialog >
        </>
    );
};

export default ProductAddForm;
