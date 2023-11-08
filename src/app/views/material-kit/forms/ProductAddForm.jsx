import { PhotoCamera } from "@mui/icons-material";
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
import { toast } from "react-toastify";
import { fetchAllBrands, fetchBrandsByCategoryName } from "store/actions/brandActions";
import { fetchAllCategory } from "store/actions/categoryActions";
import { createProduct, fetchAllProducts, uploadProductImage } from "store/actions/productActions";

import { useFormik } from 'formik'
import * as yup from 'yup'
import { useCallback } from "react"

const schema = yup.object().shape({
    productName: yup.string().min(5).required(),
    productDescription: yup.string().required(),
    category_Id: yup.string().required(),
    brand_Id: yup.string().required(),
})

const ProductAddForm = () => {

    const dispatch = useDispatch()
    const { category, loading } = useSelector(state => state)
    const [open, setOpen] = useState(false)

    const handleClose = () => setOpen(false)
    const onOpen = () => {
        setOpen(true)
        setobjectData({
            product_name: "",
            product_description: "",
            category_Id: "",
            brand_Id: ""
        })
    }

    useEffect(() => {
        dispatch(fetchAllCategory())
        dispatch(fetchAllBrands())
        dispatch(fetchAllProducts())
    }, [])

    const [objectData, setobjectData] = useState({
        product_name: "",
        product_description: "",
        category_Id: "",
        brand_Id: ""
    })
    const [brands, setBrands] = useState([])
    const [error, setError] = useState({})
    const [imageFile, setImageFile] = useState('')
    const formdata = new FormData()

    // const productNameChangeHandler = (e) => {
    //     setobjectData(
    //         { ...objectData, product_name: e.target.value }
    //     )
    // }
    // const productDescriptionChangeHandler = (e) => {
    //     setobjectData({ ...objectData, product_description: e.target.value })
    // }

    const onImageChangeHandler = (e) => {
        setImageFile(e.target.files[0])
    }

    // const categoryChangehandler = (event) => {
    //     console.log("category is -> ", event.target.value)
    //     setobjectData({ ...objectData, category_Id: event.target.value })
    //     fetchBrandByCategory(event.target.value)
    // }

    // const brandChangeHandler = (event) => {
    //     setobjectData({ ...objectData, brand_Id: event.target.value })
    // }

    // const fetchBrandByCategory = async (category) => {
    //     const data = await dispatch(fetchBrandsByCategoryName(category))
    //     console.log("data is -> ", data.data);
    //     setBrands(data.data)
    // }
    // console.log("Brand is -> ", brands);

    const onFinish = async () => {
        if (Object.keys(error).length === 0) {
            setOpen(false)
            formdata.append('image', imageFile)
            console.log("objectData is -> ", objectData);
            console.log("image is -> ", imageFile);

            let image;
            if (imageFile) {
                const data = await dispatch(uploadProductImage(formdata))
                image = data.data.file_name
            }
            // console.log("Image is -> ", image);
            if (!image) toast.error('image is required')
            if (image) dispatch(createProduct(objectData, image))
            setobjectData({
                brand_Id: '',
                category_Id: '',
                product_description: '',
                product_name: ''
            })
        }
    }

    if (loading) {
        return (
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        )
    }

    // INITIALIZING FORMIK HERE:
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            productName: "",
            productDescription: "",
            category_Id: "",
            brand_Id: ""
        },
        validationSchema: schema,
        onSubmit: async (values) => {

            console.log("data is ->", values)

        },
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

    return (
        <>
            <Button onClick={onOpen} color="primary" variant="contained" type="submit">
                <Icon>add</Icon>
                <Span sx={{ pl: 1, textTransform: "capitalize" }}>Add </Span>
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
                <form onSubmit={formik.handleSubmit} >
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
                                    onChange={(e) => setInputValue("name", e.target.value)}
                                />
                                {/* <span className="mb-3 text-danger">{error.}</span> */}

                                <FormControl fullWidth className='mb-1 mt-2'>
                                    <InputLabel id="demo-simple-select-label">Category</InputLabel>

                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name='category_Id'
                                        label="Category"
                                        value={formik.values.category_Id}
                                        onChange={(e) => setInputValue("category_Id", e.target.value)}
                                    >
                                        {
                                            category?.payload?.map((singleCategory) => (
                                                <MenuItem key={singleCategory._id} value={singleCategory._id} >{singleCategory.categoryName}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                    <span className="mb-2 text-danger">{error.categoryName}</span>
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
                                    <span className="mb-2 text-danger">{error.brandName}</span>

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
                                <span className="mb-2 text-danger">{error.productDescription}</span>
                                <label className="mt-3" htmlFor="icon-button-file">
                                    <input onChange={onImageChangeHandler} className="input" id="icon-button-file" type="file" />
                                </label>
                            </Grid>

                        </Grid>



                    </DialogContent>

                    <DialogActions>
                        <Button variant="outlined" onClick={handleClose}>
                            Cancel
                        </Button>

                        <Button onClick={onFinish} color="primary" variant="contained" type="submit" >
                            add
                        </Button>
                    </DialogActions>
                </form>
            </Dialog >
        </>
    );
};

export default ProductAddForm;
