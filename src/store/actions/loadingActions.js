import { IS_LOADING } from "constants/allActions"

export const isLoading = (loading) => {
    return {
        type: IS_LOADING,
        payload: loading
    }
}