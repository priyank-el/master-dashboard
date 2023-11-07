import axios from "axios"
import { isLoading } from "./loadingActions"
import { productActionType } from "constants/allActions"
import { successResponseHandler } from "app/helpers/responseHandler"
import { toast } from "react-toastify"

const token = localStorage.getItem('JwtToken')

export const fetchAllProducts = () => {
    return async (dispatch) => {
        dispatch(isLoading(true))
        try {
            const { data } = await axios.get('http://localhost:3003/admin/all-products', { headers: { "env": "test", "Authorization": token } })
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
    const { product_name, product_description, category_Id, brand_Id } = productData
    return async (dispatch) => {
        try {
            debugger
            const { data } = await axios.post('http://localhost:3003/admin/create-product',
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
                dispatch({ type: productActionType.CREATE_PRODUCT, payload: data })
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
            const { data } = await axios.post('http://localhost:3003/admin/web/uploadImage/product', formData, { headers: { "env": "test", "Authorization": token } })
            if (data) {
                dispatch({ type: productActionType.UPLOAD_IMAGE, payload: data })
                return successResponseHandler('image uploaded', data)
            }
        } catch (error) {
            console.log("error is -> ", error);
        }
    }
}