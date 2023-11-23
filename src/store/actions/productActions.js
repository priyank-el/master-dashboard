import axios from "axios"
import { isLoading } from "./loadingActions"
import { productActionType } from "constants/allActions"
import { successResponseHandler } from "app/helpers/responseHandler"
import { toast } from "react-toastify"

const token = localStorage.getItem('JwtToken')

export const fetchAllProducts = (value) => {
    return async (dispatch) => {
        dispatch(isLoading(true))
        try {
            if (!value) value = ''
            value = value.trim()
            const { data } = await axios.get(`http://localhost:3003/admin/all-products?value=${value}`, { headers: { "env": "test", "Authorization": token } })
            console.log("product data is -> ", data);
            if (data) {
                dispatch({ type: productActionType.FETCH_ALL_PRODUCTS, payload: data })
                dispatch(isLoading(false))
            }
        } catch (error) {
            console.log("error is -> ", error);
        }
    }
}

export const createProduct = (productData, productImage) => {
    const { product_name, product_description, category_Id, brand_Id, price } = productData
    return async (dispatch) => {
        try {
            debugger
            const { data } = await axios.post('http://localhost:3003/admin/create-product',
                {
                    productName: product_name,
                    productDescription: product_description,
                    productCategory: category_Id,
                    productBrand: brand_Id,
                    image: productImage,
                    price
                },
                { headers: { "env": "test", "Authorization": token } }
            )

            if (data) {
                dispatch({ type: productActionType.CREATE_PRODUCT, payload: data })
                toast.success(data.message)
                dispatch(fetchAllProducts())
            }
        } catch (error) {
            console.log("Error is -> ", error);
        }
    }
}
export const updateProduct = (id, productData, productImage) => {
    const { product_name, product_description, category_Id, brand_Id } = productData
    return async (dispatch) => {
        try {
            debugger
            const { data } = await axios.put(`http://localhost:3003/admin/update-product?id=${id}`,
                {
                    productName: product_name,
                    productDescription: product_description,
                    productCategory: category_Id,
                    productBrand: brand_Id,
                    image: productImage
                },
                { headers: { "env": "test", "Authorization": token } }
            )

            if (data) {
                dispatch({ type: productActionType.UPDATE_PRODUCT, payload: data })
                toast.success(data.message)
                dispatch(fetchAllProducts())
            }
        } catch (error) {
            console.log("Error is -> ", error);
        }
    }
}

export const updateProductStatus = (product_Id, status) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.post('http://localhost:3003/admin/update-product-status', { _id: product_Id, status }, { headers: { 'env': 'test', 'Authorization': localStorage.getItem('JwtToken') } })
            if (data) {
                dispatch({ type: productActionType.UPDATE_STATUS, payload: data })
                toast.success(data.message)
                dispatch(fetchAllProducts())
            }
        } catch (error) {
            console.log("Error is -> ", error);
        }
    }
}

export const deleteProductById = (_id) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.post('http://localhost:3003/admin/delete-product', { _id }, { headers: { "env": "test", "Authorization": token } })
            if (data) {
                dispatch({ type: productActionType.DELETE_PRODUCT, payload: data })
                toast.success(data.message)
                dispatch(fetchAllProducts())
            }
        } catch (error) {
            console.log("Error is -> ", error);
        }
    }
}

export const uploadProductImage = (formData) => {
    return async (dispatch) => {
        try {
            debugger
            const { data } = await axios.post('http://localhost:3003/admin/web/uploadImage/product', formData, { headers: { "env": "test", "Authorization": token, "Content-Type": "multipart/form-data" } })
            if (data) {
                dispatch({ type: productActionType.UPLOAD_IMAGE, payload: data })
                return successResponseHandler('image uploaded', data)
            }
        } catch (error) {
            console.log("error is -> ", error);
        }
    }
}