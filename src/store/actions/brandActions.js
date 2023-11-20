import axios from "axios"
import { brandActionType } from "constants/allActions"
import { toast } from "react-toastify"
import { isLoading } from "./loadingActions"
import { errorResponsehandler, successResponseHandler } from "app/helpers/responseHandler"

const token = localStorage.getItem('JwtToken')

export const createBrand = (dataObject) => {
    const { category_id, brandName } = dataObject
    return async (dispatch) => {
        try {
            const { data } = await axios.post('http://localhost:3003/admin/add-brand', { category_id, brandName }, { headers: { "env": "test", "Authorization": token } })
            if (data) {
                dispatch({ type: brandActionType.CREATE_BRAND, payload: data })
                toast.success(data.message)
                dispatch(fetchAllBrands())
            }
        } catch (error) {
            toast.error(error.response.data)
            console.log("Error is -> ", error);
        }
    }
}

export const fetchAllBrands = (value) => {
    return async (dispatch) => {
        dispatch(isLoading(true))
        try {
            if (!value) value = ''
            debugger
            const { data } = await axios.get(`http://localhost:3003/admin/all-brands?value=${value}`, { headers: { "env": "test", "Authorization": token } })
            if (data) {
                dispatch({ type: brandActionType.FETCH_ALL_BRANDS, payload: data })
                dispatch(isLoading(false))
            }
        } catch (error) {
            console.log("error is -> ", error)
        }
    }
}

export const updateBrandById = (brandData) => {
    const { id, brand_name, category_Id } = brandData
    return async (dispatch) => {
        try {
            const { data } = await axios.put('http://localhost:3003/admin/update-brand', { _id: id, brandName: brand_name, category_Id }, { headers: { "env": "test", "Authorization": token } })
            if (data) {
                dispatch({ type: brandActionType.UPDATE_BRAND, payload: data })
                toast.success(data.message)
                dispatch(fetchAllBrands())
            }
        } catch (error) {
            console.log("error is -> ", error)
        }
    }
}

export const updateBrandStatus = (brand_Id, status) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.post('http://localhost:3003/admin/update-brand-status', { _id: brand_Id, status }, { headers: { 'env': 'test', 'Authorization': localStorage.getItem('JwtToken') } })
            if (data) {
                dispatch({ type: brandActionType.UPDATE_STATUS, payload: data })
                toast.success(data.message)
                dispatch(fetchAllBrands())
            }
        } catch (error) {
            console.log("Error is -> ", error);
        }
    }
}

export const deleteBrand = (_id) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.post('http://localhost:3003/admin/delete-brand', { id: _id }, { headers: { "env": "test", "Authorization": token } })
            if (data) {
                dispatch({ type: brandActionType.DELETE_BRAND, payload: data })
                toast.success(data.message)
                dispatch(fetchAllBrands())
            }
        } catch (error) {
            console.log("error is -> ", error);
        }
    }
}

export const fetchBrandsByCategoryName = (category_name) => {

    return async (dispatch) => {
        try {
            debugger
            const { data } = await axios.get(`http://localhost:3003/admin/fetch-brand-by-category?category=${category_name}`, { headers: { "env": "test", "Authorization": token } })
            if (data) {
                dispatch({ type: brandActionType.FETCH_BY_CATEGORY, payload: data })
                return successResponseHandler('data fetched', data)
            }
        } catch (error) {
            console.log("error -> ", error);
            return errorResponsehandler(error, error)
        }
    }
}