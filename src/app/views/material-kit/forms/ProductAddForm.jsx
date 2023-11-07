import { PhotoCamera } from "@mui/icons-material";
import {
    Box,
    Button,
    CircularProgress,
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

const ProductAddForm = () => {

    const dispatch = useDispatch()
    const { category, loading } = useSelector(state => state)

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
    const [imageFile, setImageFile] = useState('')
    const formdata = new FormData()

    const productNameChangeHandler = (e) => setobjectData({ ...objectData, product_name: e.target.value })
    const productDescriptionChangeHandler = (e) => setobjectData({ ...objectData, product_description: e.target.value })

    const onImageChangeHandler = (e) => {
        setImageFile(e.target.files[0])
    }

    const categoryChangehandler = (event) => {
        console.log("category is -> ", event.target.value)
        setobjectData({ ...objectData, category_Id: event.target.value })
        fetchBrandByCategory(event.target.value)
    }

    const brandChangeHandler = (event) => {
        setobjectData({ ...objectData, brand_Id: event.target.value })
    }

    const fetchBrandByCategory = async (category) => {
        const data = await dispatch(fetchBrandsByCategoryName(category))
        console.log("data is -> ", data.data);
        setBrands(data.data)
    }
    // console.log("Brand is -> ", brands);

    const onFinish = async () => {
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

    if (loading) {
        return (
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        )
    }

    return (
        <form>
            <Grid container spacing={6}>
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>

                    <TextField
                        style={{ width: "100%", marginBottom: "16px" }}
                        type="text"
                        label="Product Name"
                        name="product_name"
                        id="standard-basic"
                        value={objectData.product_name}
                        onChange={productNameChangeHandler}
                    />

                    <FormControl fullWidth className='mb-3'>
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>

                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name='category_Id'
                            value={objectData.category_Id}
                            label="Category"
                            onChange={categoryChangehandler}
                        >
                            {
                                category?.payload?.map((singleCategory) => (
                                    <MenuItem key={singleCategory._id} value={singleCategory._id} >{singleCategory.categoryName}</MenuItem>
                                ))
                            }
                        </Select>

                    </FormControl>
                    <FormControl fullWidth className='mb-5'>
                        <InputLabel id="demo-simple-select-label">Brand</InputLabel>

                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name='brand_Id'
                            value={objectData.brand_Id}
                            label="Brand"
                            onChange={brandChangeHandler}
                        >
                            {
                                brands.map((singleBrand) => (
                                    <MenuItem key={singleBrand._id} value={singleBrand._id} >{singleBrand.brandName}</MenuItem>
                                ))
                            }
                        </Select>

                    </FormControl>

                </Grid>

                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                    <TextField
                        style={{ width: "100%", marginBottom: "16px" }}
                        type="text"
                        label="Product Description"
                        name="product_description"
                        id="standard-basic"
                        value={objectData.product_description}
                        onChange={productDescriptionChangeHandler}
                    />
                    <label htmlFor="icon-button-file">
                        <input onChange={onImageChangeHandler} className="input" id="icon-button-file" type="file" />
                    </label>
                </Grid>

            </Grid>

            <Button onClick={onFinish} color="primary" variant="contained" type="button">
                <Icon>send</Icon>
                <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
            </Button>
        </form>
    );
};

export default ProductAddForm;
