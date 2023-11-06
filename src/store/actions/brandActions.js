import axios from "axios"
import { brandActionType } from "constants/allActions"
import { toast } from "react-toastify"
import { isLoading } from "./loadingActions"

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
            console.log("error is -> ", error)
        }
    }
}

export const fetchAllBrands = () => {
    return async (dispatch) => {
        dispatch(isLoading(true))
        try {
            debugger
            const { data } = await axios.get('http://localhost:3003/admin/all-brands', { headers: { "env": "test", "Authorization": token } })
            if (data.length > 0) {
                dispatch({ type: brandActionType.FETCH_ALL_BRANDS, payload: data })
                dispatch(isLoading(false))
            }
        } catch (error) {
            console.log("error is -> ", error)
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