import { errorResponsehandler, successResponseHandler } from "app/helpers/responseHandler"
import axios from "axios"
import { categoryActionType } from "constants/allActions"
import { isLoading } from "./loadingActions"
import { toast } from "react-toastify"

export const createCategory = (dataObject) => {
    const { categoryName } = dataObject
    return async (dispatch) => {
        try {
            const { data } = await axios.post('http://localhost:3003/admin/add-category', { name: categoryName }, { headers: { 'env': 'test', 'Authorization': localStorage.getItem('JwtToken') } })
            if (data) {
                dispatch({ type: categoryActionType.CREATE_CATEGORY, payload: data })
                dispatch(fetchAllCategory())
                return successResponseHandler(data.message, data)
            }
        } catch (error) {
            // console.log("error is ->", error);
            toast.error(error.response.data)
            return errorResponsehandler('something went wrong', error)
        }
    }
}

export const fetchAllCategory = () => {
    return async (dispatch) => {
        try {
            dispatch(isLoading(true))
            // debugger
            const { data } = await axios.get('http://localhost:3003/admin/all-categories', { headers: { 'env': 'test', 'Authorization': localStorage.getItem('JwtToken') } })
            // console.log("data -> ", data);
            if (data.length > 0) {
                dispatch({ type: categoryActionType.FETCH_ALL_CATEGORIES, payload: data })
                dispatch(isLoading(false))
                return successResponseHandler('all-categories fetched', data)
            }
        } catch (error) {
            errorResponsehandler(error, error)
        }
    }
}

export const updateCategory = (dataObject) => {
    const { id, categoryName } = dataObject
    return async (dispatch) => {
        try {
            debugger
            const { data } = await axios.put('http://localhost:3003/admin/update-category', { id, name: categoryName }, { headers: { 'env': 'test', 'Authorization': localStorage.getItem('JwtToken') } })
            if (data) {
                dispatch({ type: categoryActionType.UPDATE_CATEGORIES, payload: data })
                toast.success(data.message)
                dispatch(fetchAllCategory())
            }
        } catch (error) {
            console.log("error", error)
        }
    }
}

export const deleteCategory = (_id) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.post('http://localhost:3003/admin/delete-category', { id: _id }, { headers: { 'env': 'test', 'Authorization': localStorage.getItem('JwtToken') } })
            if (data) {
                dispatch({ type: categoryActionType.DELETE_CATEGORY, payload: data })
                toast.success(data.message)
                dispatch(fetchAllCategory())
            }
        } catch (error) {
            console.log(error);
        }
    }
}